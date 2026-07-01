import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_ANON_KEY, SUPABASE_READY, SUPABASE_URL } from "./supabase-config.js";

const REDIRECT_URL = "admin.html";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusBox = document.getElementById("login-status");
const root = document.documentElement;

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.classList.remove("is-error", "is-success");

  if (type) {
    statusBox.classList.add(type);
  }
}

function updatePointerVars(event) {
  const x = Math.max(0, Math.min(100, (event.clientX / window.innerWidth) * 100));
  const y = Math.max(0, Math.min(100, (event.clientY / window.innerHeight) * 100));

  root.style.setProperty("--pointer-x", `${x}%`);
  root.style.setProperty("--pointer-y", `${y}%`);
}

function resetPointerVars() {
  root.style.setProperty("--pointer-x", "50%");
  root.style.setProperty("--pointer-y", "32%");
}

if (form) {
  window.addEventListener("pointermove", updatePointerVars, { passive: true });
  window.addEventListener("pointerleave", resetPointerVars, { passive: true });
  setStatus(SUPABASE_READY
    ? "Entre com as credenciais autorizadas para acessar o painel."
    : "Configure a URL e a chave anônima do Supabase em JS/supabase-config.js antes de usar o login.");

  if (SUPABASE_READY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.href = REDIRECT_URL;
      }
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        setStatus("Preencha o e-mail e a senha.", "is-error");
        return;
      }

      setStatus("Autenticando...", "");
      form.querySelector("button[type='submit']").disabled = true;

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setStatus(error.message || "Não foi possível entrar.", "is-error");
        form.querySelector("button[type='submit']").disabled = false;
        return;
      }

      setStatus("Login realizado com sucesso. Redirecionando...", "is-success");
      window.location.href = REDIRECT_URL;
    });
  } else {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      setStatus("Atualize as credenciais do Supabase em JS/supabase-config.js para habilitar este formulário.", "is-error");
    });
  }
}