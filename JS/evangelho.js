// Função para carregar o Evangelho do dia
async function carregarEvangelho() {
    try {
        const response = await fetch('https://liturgia.up.railway.app/');
        const data = await response.json();

        const trecho = data.evangelho.texto;
        const referencia = data.evangelho.referencia;

        document.getElementById('texto-evangelho').innerHTML =
            `<strong>Evangelho do Dia (${referencia}):</strong> ${trecho} — 💡 <em>Passe o mouse para pausar a leitura</em>`;
    } catch (error) {
        console.error("Erro ao buscar evangelho:", error);
        document.getElementById('texto-evangelho').innerText = "📖 Bem-vindos à Paróquia Nossa Senhora do Carmo!";
    }
}

carregarEvangelho();