/**
 * evangelho.js — Barra do Evangelho do Dia
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

(async function carregarEvangelho() {
  const el = document.getElementById('texto-evangelho');
  if (!el) return;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch('https://liturgia.up.railway.app/', {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const trecho    = data?.evangelho?.texto      || '';
    const referencia = data?.evangelho?.referencia || '';

    if (trecho) {
      el.innerHTML =
        `<strong>✝ Evangelho do Dia (${referencia}):</strong>&nbsp;${trecho}&nbsp;—&nbsp;` +
        `<em style="opacity:0.7;">Passe o mouse para pausar a leitura</em>`;
    } else {
      throw new Error('Conteúdo vazio');
    }
  } catch {
    el.innerHTML =
      '✝ &nbsp;Bem-vindos à Paróquia Nossa Senhora do Carmo — ' +
      '"Venha e vereis." (Jo 1,39)';
  }
})();
