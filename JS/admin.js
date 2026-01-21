import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Suas chaves reais extraídas da imagem
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

// Carregar dados atuais ao abrir a página
async function carregarDados() {
    const docRef = doc(db, "site_content", "geral");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const d = docSnap.data();
        document.getElementById('missa-domingo').value = d.domingo;
        document.getElementById('missa-semana').value = d.semana;
        document.getElementById('aviso-texto').value = d.aviso;
    }
}
carregarDados();

// Salvar novos dados
document.getElementById('form-admin').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-salvar');
    btn.disabled = true;
    btn.innerText = "Salvando...";

    try {
        await setDoc(doc(db, "site_content", "geral"), {
            domingo: document.getElementById('missa-domingo').value,
            semana: document.getElementById('missa-semana').value,
            aviso: document.getElementById('aviso-texto').value,
            ultima_atualizacao: new Date()
        });
        alert("Site atualizado com sucesso!");
    } catch (err) {
        console.error(err);
        alert("Erro ao salvar dados.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Salvar no Site";
    }
};