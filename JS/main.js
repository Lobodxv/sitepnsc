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


const imagem = document.getElementById('imagem1');
const breakpoint = window.matchMedia("(max-width: 768px)");

function trocarImagem(e) {
  if (e.matches) {
    // Se for mobile
    imagem.src = "img/Paróquia N. Sra. do Carmo (800 x 400 px).png";
  } else {
    // Se for desktop
    imagem.src = "img/Paróquia N. Sra. do Carmo.png";
  }
}

// Escuta mudanças no tamanho da tela
breakpoint.addListener(trocarImagem);
// Executa a função ao carregar a página
trocarImagem(breakpoint);
