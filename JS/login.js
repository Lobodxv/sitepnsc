
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_tVDmvcRHRBr-aLoVZU9bhRO2SUMJMOU",
    authDomain: "paroquia-pns-do-carmo.firebaseapp.com",
    projectId: "paroquia-pns-do-carmo",
    storageBucket: "paroquia-pns-do-carmo.firebasestorage.app",
    messagingSenderId: "454506351447",
    appId: "1:454506351447:web:58eaf7b84c119886ebcc12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "admin.html";
    } catch (error) {
        document.getElementById('error-msg').style.display = "block";
        console.error("Erro de login:", error.message);
    }
};