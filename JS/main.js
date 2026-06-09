/**
 * main.js — Scripts principais da página inicial
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

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
const db  = getFirestore(app);

// Escuta em tempo real o documento de conteúdo
onSnapshot(doc(db, "site_content", "geral"), (snapshot) => {
  if (!snapshot.exists()) return;
  const dados = snapshot.data();

  // Aviso paroquial (se existir o elemento)
  const containerAviso = document.getElementById("container-aviso");
  const textoAviso     = document.getElementById("texto-aviso");

  if (containerAviso && textoAviso) {
    if (dados.aviso && dados.aviso.trim() !== "") {
      containerAviso.style.display = "block";
      textoAviso.innerText = dados.aviso;
    } else {
      containerAviso.style.display = "none";
    }
  }

  // Chave PIX dinâmica (se existir o elemento na página)
  const txtChave = document.getElementById("txt-chave");
  const txtNome  = document.getElementById("txt-nome");
  if (txtChave && dados.pix_chave) txtChave.innerText = dados.pix_chave;
  if (txtNome  && dados.pix_nome)  txtNome.innerText  = dados.pix_nome;
});
