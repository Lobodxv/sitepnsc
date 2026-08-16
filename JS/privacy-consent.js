const PRIVACY_POLICY_VERSION = '2026-08-15';
const PRIVACY_KEY = 'pnsc_privacy_consent';

function getConsentState() {
  try {
    return JSON.parse(localStorage.getItem(PRIVACY_KEY) || 'null');
  } catch {
    return null;
  }
}

function setConsentState(value) {
  const payload = {
    accepted: Boolean(value),
    version: PRIVACY_POLICY_VERSION,
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString('pt-BR', { hour12: false })
  };

  localStorage.setItem(PRIVACY_KEY, JSON.stringify(payload));
  return payload;
}

function renderPrivacyBanner() {
  const existing = document.querySelector('.privacy-banner');
  if (existing) existing.remove();

  const state = getConsentState();
  if (state && state.accepted && state.version === PRIVACY_POLICY_VERSION) {
    return;
  }

  const banner = document.createElement('div');
  banner.className = 'privacy-banner is-visible';
  banner.innerHTML = `
    <div class="privacy-banner__content">
      <div class="privacy-banner__text">
        <strong>Privacidade e finalidade</strong>
        <p>
          Os canais de contato e doação da paróquia são usados apenas para responder dúvidas, atender solicitações e receber contribuições paroquiais.
          Ao continuar, você confirma que leu e aceita a finalidade e a Política de Privacidade vigente.
        </p>
        <small>Versão da política: ${PRIVACY_POLICY_VERSION}</small>
      </div>
      <div class="privacy-banner__actions">
        <a href="privacidade.html">Saiba mais</a>
        <button type="button" id="privacy-accept">Aceito</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  const acceptButton = document.getElementById('privacy-accept');
  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      setConsentState(true);
      banner.remove();
    });
  }
}

window.addEventListener('DOMContentLoaded', renderPrivacyBanner);
