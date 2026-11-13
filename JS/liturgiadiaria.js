document.addEventListener("DOMContentLoaded", function () {
    // 1. Formata e exibe a data atual com segurança
    const subtitulo = document.querySelector(".liturgia-subtitulo");
    if (subtitulo) {
        const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dataHoje = new Date().toLocaleDateString('pt-BR', opcoesData);
        subtitulo.innerText = `Hoje é ${dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1)}.`;
    }

    // Usaremos uma API unificada, pública e estável que retorna Liturgia + Santo do Dia juntos
    fetch("https://liturgia.up.railway.app/")
        .then(response => {
            if (!response.ok) throw new Error("Erro na requisição.");
            return response.json();
        })
        .then(data => {
            // Primeira Leitura
            if (data.primeiraLeitura) {
                // Mantém o capítulo e versículos de referência intactos no título (h3)
                atualizarElemento("#primeira-leitura-item h3, .card-liturgia .liturgia-item:nth-child(1) h3", data.primeiraLeitura.referencia);
                // Limpa os números apenas de dentro do texto corrido
                atualizarTextoLeitura("#primeira-leitura-item .leitura-texto, .card-liturgia .liturgia-item:nth-child(1) .leitura-texto", data.primeiraLeitura.texto);
            }

            const segundaLeitura = data.segundaLeitura || data.segunda_leitura;
            const segundaItem = document.getElementById("segunda-leitura-item");
            if (segundaItem) {
                if (segundaLeitura && (segundaLeitura.referencia || segundaLeitura.texto)) {
                    const titulo = segundaItem.querySelector("h3");
                    if (titulo) titulo.innerText = segundaLeitura.referencia || "Segunda Leitura";
                    atualizarTextoLeitura("#segunda-leitura-item .leitura-texto", segundaLeitura.texto);
                    segundaItem.hidden = false;
                } else {
                    segundaItem.hidden = true;
                }
            }

            // Salmo Responsorial
            if (data.salmo) {
                atualizarElemento("#salmo-item h3", data.salmo.referencia);
                const campoSalmo = document.querySelector("#salmo-item .leitura-texto");
                if (campoSalmo) {
                    const refrao = data.salmo.refrao ? `<strong>Refrão: ${data.salmo.refrao}</strong><br><br>` : '';
                    campoSalmo.innerHTML = `${refrao}${data.salmo.texto.replace(/\n/g, '<br>')}`;
                }
            }

            // Evangelho
            if (data.evangelho) {
                // Mantém o capítulo e referência intactos no título (h3)
                atualizarElemento("#evangelho-item h3", `Evangelho (${data.evangelho.referencia})`);
                // Limpa os números apenas de dentro do texto do evangelho
                atualizarTextoLeitura("#evangelho-item .leitura-texto", data.evangelho.texto);
            }
        })
        .catch(error => {
            console.error("Erro ao buscar liturgia:", error);
            const containerLiturgia = document.querySelector(".card-liturgia .liturgia-conteudo, .liturgia-container");
            if (containerLiturgia) {
                containerLiturgia.innerHTML = "<p class='leitura-texto'>Liturgia indisponível no momento. Por favor, tente mais tarde.</p>";
            }
        });
});

// Função padrão: injeta o texto sem nenhuma alteração (usada para os títulos/capítulos)
function atualizarElemento(seletor, texto) {
    const elemento = document.querySelector(seletor);
    if (elemento && texto) {
        elemento.innerText = texto;
    }
}

// Nova função específica: limpa apenas os versículos do texto corrido
function atualizarTextoLeitura(seletor, texto) {
    const elemento = document.querySelector(seletor);
    if (elemento && texto) {
        // Remove números isolados que representam os versículos no meio do texto
        let textoLimpo = texto.replace(/\b\d+\s*/g, '');

        // Remove hifens ou pontuações órfãs que possam ter sobrado da limpeza
        textoLimpo = textoLimpo.replace(/\s+/g, ' ').trim();

        elemento.innerText = textoLimpo;
    }
}