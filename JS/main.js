// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.onclick = () => {
    // Alterna a classe 'open' para animar as linhas do ícone
    hamburger.classList.toggle('open');
    // Alterna a classe 'active' para mostrar o menu lateral
    navMenu.classList.toggle('active');
};

// Fecha o menu e reseta o ícone ao clicar num link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.onclick = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    };
}); 
// --Menu hambúrguer (Mobile)

// Interação com o Banco de Dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyA_tVDmvcRHRBr-aLoVZU9bhRO2SUMJMOU",
            authDomain: "paroquia-pns-do-carmo.firebaseapp.com",
            projectId: "paroquia-pns-do-carmo",
            storageBucket: "paroquia-pns-do-carmo.firebasestorage.app",
            messagingSenderId: "454506351447",
            appId: "1:454506351447:web:58eaf7b84c119886ebcc12",
            measurementId: "G-5BSGXTLWHZ"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // ESCUTA EM TEMPO REAL
        onSnapshot(doc(db, "site_content", "geral"), (doc) => {
            if (doc.exists()) {
                const dados = doc.data();
                
                // // Atualiza Horários
                // document.getElementById("horario-domingo").innerText = dados.domingo;
                // document.getElementById("horario-domingo").classList.remove("loading");
                
                // document.getElementById("horario-semana").innerText = dados.semana;
                // document.getElementById("horario-semana").classList.remove("loading");

                // Atualiza Aviso (mostra se não estiver vazio)
                if (dados.aviso && dados.aviso.trim() !== "") {
                    document.getElementById("container-aviso").style.display = "block";
                    document.getElementById("texto-aviso").innerText = dados.aviso;
                } else {
                    document.getElementById("container-aviso").style.display = "none";
                }
            }
        });