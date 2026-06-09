/**
 * login.js — Autenticação do painel administrativo
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

import { initializeApp }                    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_tVDmvcRHRBr-aLoVZU9bhRO2SUMJMOU",
  authDomain: "paroquia-pns-do-carmo.firebaseapp.com",
  projectId: "paroquia-pns-do-carmo",
  storageBucket: "paroquia-pns-do-carmo.firebasestorage.app",
  messagingSenderId: "454506351447",
  appId: "1:454506351447:web:58eaf7b84c119886ebcc12",
  measurementId: "G-5BSGXTLWHZ"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form    = document.getElementById('login-form');
const errorEl = document.getElementById('error-msg');
const btn     = form?.querySelector('.btn-login');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) return;

  // Estado de carregamento
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Entrando...';
  errorEl.style.display = 'none';

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'admin.html';
  } catch (err) {
    errorEl.style.display = 'block';

    // Mensagem amigável por código de erro
    const msgs = {
      'auth/user-not-found':  'E-mail não encontrado no sistema.',
      'auth/wrong-password':  'Senha incorreta. Tente novamente.',
      'auth/invalid-email':   'E-mail inválido.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
      'auth/user-disabled':   'Conta desativada. Entre em contato com o suporte.',
    };
    errorEl.innerHTML =
      `<i class="bi bi-exclamation-circle-fill"></i> ${msgs[err.code] || 'Usuário ou senha incorretos.'}`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Entrar no Sistema';
  }
});
