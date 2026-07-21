import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_ANON_KEY, SUPABASE_READY, SUPABASE_URL } from "./supabase-config.js";

const userLabel = document.getElementById("admin-user");
const welcomeBox = document.getElementById("admin-welcome");
const logoutButton = document.getElementById("logout-button");
const statusBox = document.getElementById("admin-status");
const contentForm = document.getElementById("content-form");
const saveContentButton = document.getElementById("save-content-button");
const contentStatusBox = document.getElementById("content-status");
const avisoInput = document.getElementById("site-aviso");
const pixNomeInput = document.getElementById("pix-nome");
const pixChaveInput = document.getElementById("pix-chave");
const adminCreateForm = document.getElementById("admin-create-form");
const createAdminButton = document.getElementById("create-admin-button");
const adminCreateStatusBox = document.getElementById("admin-create-status");
const newAdminEmailInput = document.getElementById("new-admin-email");
const newAdminPasswordInput = document.getElementById("new-admin-password");
const displayNameInput = document.getElementById("display-name");
const profileForm = document.getElementById("profile-form");
const profileEmailInput = document.getElementById("profile-email");
const profilePasswordInput = document.getElementById("profile-password");
const profileStatusBox = document.getElementById("profile-status");
const saveProfileButton = document.getElementById("save-profile-button");
const onboardingOverlay = document.getElementById("profile-onboarding");
const onboardingForm = document.getElementById("onboarding-form");
const onboardingDisplayNameInput = document.getElementById("onboarding-display-name");
const onboardingStatusBox = document.getElementById("onboarding-status");
const onboardingSaveButton = document.getElementById("onboarding-save-button");
const profilePanel = document.getElementById("perfil-panel");
const profileNavLink = document.querySelector('[data-panel-link="perfil"]');
const profileDrawerBackdrop = document.getElementById("profile-drawer-backdrop");
const profileDrawerClose = document.getElementById("profile-drawer-close");

const CONTENT_SLUG = "geral";
const ADMIN_USERS_TABLE = "admin_users";
const DISPLAY_NAME_KEY = "pnsc-admin-display-name";
const DISPLAY_NAME_SEEN_KEY = "pnsc-admin-display-name-seen";
let currentSessionEmail = "";

function loadDisplayName() {
  try {
    return localStorage.getItem(DISPLAY_NAME_KEY) ?? "";
  } catch (error) {
    return "";
  }
}

function saveDisplayName(value) {
  try {
    localStorage.setItem(DISPLAY_NAME_KEY, value);
  } catch (error) {
    // Ignore storage failures.
  }
}

function loadDisplayNameSeen() {
  try {
    return localStorage.getItem(DISPLAY_NAME_SEEN_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function saveDisplayNameSeen() {
  try {
    localStorage.setItem(DISPLAY_NAME_SEEN_KEY, "true");
  } catch (error) {
    // Ignore storage failures.
  }
}

function openOnboarding() {
  if (!onboardingOverlay) {
    return;
  }

  onboardingOverlay.classList.add("is-visible");
  onboardingOverlay.setAttribute("aria-hidden", "false");

  if (onboardingDisplayNameInput) {
    onboardingDisplayNameInput.value = loadDisplayName();
    onboardingDisplayNameInput.focus();
  }
}

function closeOnboarding() {
  if (!onboardingOverlay) {
    return;
  }

  onboardingOverlay.classList.remove("is-visible");
  onboardingOverlay.setAttribute("aria-hidden", "true");
}

function closeProfilePanel() {
  if (!profilePanel) {
    return;
  }

  profilePanel.classList.remove("is-visible");
  profilePanel.classList.add("is-hidden");
  profilePanel.setAttribute("aria-hidden", "true");

  if (profileDrawerBackdrop) {
    profileDrawerBackdrop.classList.remove("is-visible");
    profileDrawerBackdrop.hidden = true;
  }

  if (profileNavLink) {
    profileNavLink.classList.remove("active");
  }
}

function openProfilePanel() {
  if (!profilePanel) {
    return;
  }

  profilePanel.classList.remove("is-hidden");
  profilePanel.setAttribute("aria-hidden", "false");

  if (profileDrawerBackdrop) {
    profileDrawerBackdrop.hidden = false;
    window.requestAnimationFrame(() => {
      profileDrawerBackdrop.classList.add("is-visible");
    });
  }

  window.requestAnimationFrame(() => {
    profilePanel.classList.add("is-visible");
  });

  if (profileNavLink) {
    profileNavLink.classList.toggle("active", true);
  }

  if (displayNameInput) {
    displayNameInput.focus();
  }
}

function setProfileStatus(message, type = "") {
  if (!profileStatusBox) {
    return;
  }

  profileStatusBox.textContent = message;
  profileStatusBox.className = "msg-feedback";

  if (type) {
    profileStatusBox.classList.add(type);
    profileStatusBox.style.display = "block";
  }
}

function setOnboardingStatus(message, type = "") {
  if (!onboardingStatusBox) {
    return;
  }

  onboardingStatusBox.textContent = message;
  onboardingStatusBox.className = "msg-feedback";

  if (type) {
    onboardingStatusBox.classList.add(type);
    onboardingStatusBox.style.display = "block";
  }
}

function updateWelcome(sessionEmail = currentSessionEmail) {
  const savedName = loadDisplayName().trim();
  const displayName = savedName || sessionEmail.split("@")[0] || "administrador";

  if (welcomeBox) {
    welcomeBox.textContent = `Bem-vindo(a), ${displayName}!`;
  }
}

function syncProfileFields(sessionEmail) {
  currentSessionEmail = sessionEmail;

  if (profileEmailInput) {
    profileEmailInput.value = sessionEmail;
  }

  if (displayNameInput) {
    displayNameInput.value = loadDisplayName();
  }

  updateWelcome(sessionEmail);
}

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.className = "msg-feedback";

  if (type) {
    statusBox.classList.add(type);
    statusBox.style.display = "block";
  }
}

function setAdminCreateStatus(message, type = "") {
  if (!adminCreateStatusBox) {
    return;
  }

  adminCreateStatusBox.textContent = message;
  adminCreateStatusBox.className = "msg-feedback";

  if (type) {
    adminCreateStatusBox.classList.add(type);
    adminCreateStatusBox.style.display = "block";
  }
}

function setContentStatus(message, type = "") {
  if (!contentStatusBox) {
    return;
  }

  contentStatusBox.textContent = message;
  contentStatusBox.className = "msg-feedback";

  if (type) {
    contentStatusBox.classList.add(type);
    contentStatusBox.style.display = "block";
  }
}

function normalizeDataRow(data) {
  return {
    aviso: data?.aviso ?? "",
    pix_nome: data?.pix_nome ?? "Paróquia Nossa Senhora do Carmo",
    pix_chave: data?.pix_chave ?? "07.721.749/0020-30"
  };
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

async function isAllowedAdmin(supabase, email) {
  const { data, error } = await supabase
    .from(ADMIN_USERS_TABLE)
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    if (error.message?.toLowerCase().includes("does not exist")) {
      return { allowed: true, fallback: true };
    }

    return { allowed: false, fallback: false, error };
  }

  return { allowed: Boolean(data), fallback: false };
}


// async function registerAdminEmail(supabase, email) {
//   const { error } = await supabase.from(ADMIN_USERS_TABLE).upsert({
//     email
//   }, { onConflict: "email" });

//   if (error && !error.message?.toLowerCase().includes("does not exist")) {
//     throw error;
//   }
// }

if (!SUPABASE_READY) {
  userLabel.textContent = "Configure as credenciais do Supabase em JS/supabase-config.js para habilitar a sessão.";
  logoutButton.disabled = true;
  setStatus("As credenciais do Supabase ainda precisam ser configuradas.", "erro");
  if (contentForm) {
    contentForm.querySelectorAll("input, textarea, button").forEach((element) => {
      element.disabled = true;
    });
    setContentStatus("Configure o Supabase para liberar a edição de conteúdo.", "erro");
  }
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  if (profileNavLink) {
    profileNavLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (profilePanel?.classList.contains("is-visible")) {
        closeProfilePanel();
        return;
      }

      openProfilePanel();
    });
  }

  if (profileDrawerBackdrop) {
    profileDrawerBackdrop.addEventListener("click", closeProfilePanel);
  }

  if (profileDrawerClose) {
    profileDrawerClose.addEventListener("click", closeProfilePanel);
  }

  if (profileForm) {
    profileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nextDisplayName = displayNameInput?.value.trim() ?? "";
      const nextEmail = normalizeEmail(profileEmailInput?.value ?? "");
      const nextPassword = profilePasswordInput?.value ?? "";
      const updatePayload = {};
      const changedValues = [];

      if (nextDisplayName && nextDisplayName !== loadDisplayName().trim()) {
        saveDisplayName(nextDisplayName);
        changedValues.push("nome de exibição");
      }

      if (nextEmail && nextEmail !== currentSessionEmail.toLowerCase()) {
        updatePayload.email = nextEmail;
        changedValues.push("e-mail");
      }

      if (nextPassword) {
        updatePayload.password = nextPassword;
        changedValues.push("senha");
      }

      if (!changedValues.length) {
        setProfileStatus("Nenhuma alteração para salvar.", "erro");
        return;
      }

      saveProfileButton.disabled = true;
      setProfileStatus("Salvando perfil...", "");

      if (Object.keys(updatePayload).length) {
        const { error } = await supabase.auth.updateUser(updatePayload);

        if (error) {
          setProfileStatus(`Não foi possível atualizar o perfil: ${error.message}`, "erro");
          saveProfileButton.disabled = false;
          return;
        }
      }

      if (nextDisplayName) {
        saveDisplayNameSeen();
      }

      if (updatePayload.email) {
        currentSessionEmail = updatePayload.email;
      }

      if (profilePanel) {
        profilePanel.classList.remove("is-hidden");
        window.requestAnimationFrame(() => {
          profilePanel.classList.add("is-visible");
        });
      }

      if (profileDrawerBackdrop) {
        profileDrawerBackdrop.hidden = false;
        profileDrawerBackdrop.classList.add("is-visible");
      }

      updateWelcome(updatePayload.email ?? currentSessionEmail);
      setProfileStatus("Perfil atualizado com sucesso.", "sucesso");

      if (profilePasswordInput) {
        profilePasswordInput.value = "";
      }

      saveProfileButton.disabled = false;
    });
  }

  const nomeSalvo = localStorage.getItem("nomeUsuario"); // Ajuste o nome da chave conforme seu código

  if (nomeSalvo) {
    // Se o nome existe, fecha o onboarding ou esconde o elemento
    const form = document.getElementById("onboardingForm"); // Ou a referência que você usa
    if (form) {
      form.style.display = "none";
    }
    // Opcional: chamar a função que fecha o modal
    closeOnboarding();
  } else {
    // Só adiciona o listener se o usuário ainda não tiver um nome
    if (onboardingForm) {
      onboardingForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nextDisplayName = onboardingDisplayNameInput?.value.trim() ?? "";

        if (!nextDisplayName) {
          setOnboardingStatus("Digite um nome de exibição para continuar.", "erro");
          return;
        }

        saveDisplayName(nextDisplayName);
        saveDisplayNameSeen();

        if (displayNameInput) {
          displayNameInput.value = nextDisplayName;
        }

        updateWelcome();
        setOnboardingStatus("Nome de exibição definido.", "sucesso");
        closeOnboarding();
      });
    }
  }

  const applySession = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      window.location.href = "login.html";
      return;
    }

    const adminCheck = await isAllowedAdmin(supabase, session.user.email.toLowerCase());

    if (adminCheck.error) {
      syncProfileFields(session.user.email);
      userLabel.textContent = `Logado como ${session.user.email}`;
      updateWelcome(session.user.email);
      setStatus(`Sessão ativa, mas a lista de administradores não respondeu: ${adminCheck.error.message}`, "erro");
    } else if (!adminCheck.allowed && !adminCheck.fallback) {
      setStatus("Seu e-mail não está autorizado como administrador.", "erro");
      await supabase.auth.signOut();
      window.location.href = "login.html";
      return;
    } else {
      syncProfileFields(session.user.email);
      userLabel.textContent = `Logado como ${session.user.email}`;
      updateWelcome(session.user.email);
      setStatus(adminCheck.fallback
        ? "Sessão ativa. A tabela admin_users ainda não existe, então o painel está funcionando em modo provisório."
        : "Sessão ativa e pronta para uso.",
        adminCheck.fallback ? "erro" : "sucesso");

      if (!loadDisplayName().trim() && !loadDisplayNameSeen()) {
        openOnboarding();
      }
    }

  };

  const loadContent = async () => {
    if (!contentForm) {
      return;
    }

    setContentStatus("Carregando conteúdo do site...", "");

    const { data, error } = await supabase
      .from("site_content")
      .select("aviso, pix_nome, pix_chave")
      .eq("slug", CONTENT_SLUG)
      .maybeSingle();

    if (error) {
      setContentStatus(`Não foi possível carregar o conteúdo: ${error.message}`, "erro");
      return;
    }

    const normalized = normalizeDataRow(data);
    avisoInput.value = normalized.aviso;
    pixNomeInput.value = normalized.pix_nome;
    pixChaveInput.value = normalized.pix_chave;
    setContentStatus("Conteúdo carregado. Faça suas alterações e salve.", "sucesso");
  };

  applySession();
  loadContent();

  logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;
    setStatus("Encerrando sessão...", "sucesso");
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });

  contentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      slug: CONTENT_SLUG,
      aviso: avisoInput.value.trim(),
      pix_nome: pixNomeInput.value.trim(),
      pix_chave: pixChaveInput.value.trim()
    };

    saveContentButton.disabled = true;
    setContentStatus("Salvando conteúdo...", "");

    const { error } = await supabase
      .from("site_content")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      setContentStatus(`Não foi possível salvar: ${error.message}`, "erro");
      saveContentButton.disabled = false;
      return;
    }

    setContentStatus("Conteúdo atualizado com sucesso.", "sucesso");
    saveContentButton.disabled = false;
  });

  if (adminCreateForm) {
    adminCreateForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = normalizeEmail(newAdminEmailInput.value);
      const password = newAdminPasswordInput.value;

      if (!email || !password) {
        setAdminCreateStatus("Preencha o e-mail e a senha temporária.", "erro");
        return;
      }

      createAdminButton.disabled = true;
      setAdminCreateStatus("Criando conta do novo administrador...", "");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login.html`
        }
      });

      if (error) {
        setAdminCreateStatus(`Não foi possível criar o usuário: ${error.message}`, "erro");
        createAdminButton.disabled = false;
        return;
      }

      try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/create-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erro ao registrar admin");

      } catch (registrationError) {
        setAdminCreateStatus(
          `Usuário criado, mas não foi possível registrar na lista de administradores: ${registrationError.message}`,
          "erro"
        );
        createAdminButton.disabled = false;
        return;
      }

      newAdminEmailInput.value = "";
      newAdminPasswordInput.value = "";

      const emailStatus = data?.user?.confirmed_at
        ? "Conta criada e liberada para login."
        : "Conta criada. O novo administrador pode precisar confirmar o e-mail antes de entrar.";

      setAdminCreateStatus(`${emailStatus} O e-mail também foi adicionado aos administradores.`, "sucesso");
      createAdminButton.disabled = false;
    });
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) {
      window.location.href = "login.html";
    }
  });
}