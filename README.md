# PNSC - Site Oficial da Paroquia Nossa Senhora do Carmo

Site institucional da Paroquia Nossa Senhora do Carmo, com foco em comunicacao paroquial, horarios, liturgia diaria, noticias, galeria, contato e doacao via PIX.

## Visao Geral

O projeto e um site estatico em HTML, CSS e JavaScript, com algumas integracoes externas para conteudo dinamico:

1. API liturgica para leituras diarias.
2. Supabase para conteudo publico (ex.: aviso e dados de PIX).
3. Google Maps embed para localizacao.

## Funcionalidades

1. Home com secoes institucionais, destaques, noticias e galeria.
2. Liturgia diaria com cards expansivos.
3. Agenda de celebracoes e informacoes de pastorais.
4. Doacao via PIX com botao para copiar chave.
5. Botao flutuante de WhatsApp.
6. Banner de privacidade com aceite local (localStorage).
7. Layout responsivo otimizado para mobile, tablet e desktop.

## Estrutura do Projeto

```text
sitepnsc/
	index.html
	parocos.html
	liturgia.html
	corais.html
	pix.html
	privacidade.html
	robots.txt
	sitemap.xml
	CSS/
		style.css
		theme.css
		parocos.css
		pix.css
	JS/
		animations.js
		evangelho.js
		hamburger.js
		liturgiadiaria.js
		main.js
		privacy-consent.js
		supabase-config.js
		theme-toggle.js
	img/
		logoIgrejaPNG.png
		qrcode.jpeg
		imgaerea1.jpeg
		contents/
			IMG_2848.png
```

## Como Rodar Localmente

Como e um site estatico, basta abrir o arquivo index.html no navegador.

Para desenvolvimento com recarga mais confiavel (recomendado):

1. Use uma extensao como Live Server no VS Code.
2. Ou rode um servidor HTTP simples na pasta do projeto.

## Guia Rapido: Alterar Imagens dos Cards de Destaques

As imagens da secao Destaques Paroquiais na home sao definidas no CSS com background-image.

Arquivos principais:

1. Estrutura dos cards: index.html
2. Imagens dos cards: CSS/style.css

Classes usadas atualmente na home:

1. .destaque-instagram-placeholder
2. .destaque-juvenil
3. .destaque-caridade

Exemplo de uso com imagem local:

```css
.destaque-instagram-placeholder {
	background-image:
		linear-gradient(rgba(26, 17, 10, 0.2), rgba(26, 17, 10, 0.2)),
		url('../img/contents/IMG_2848.png');
}
```

Importante:

1. Em arquivos dentro de CSS/, o caminho para img/ deve subir um nivel: ../img/...
2. Evite usar barra invertida no CSS (\\). Use sempre barra normal (/).
3. Se a imagem nao atualizar, faca hard refresh no navegador (Ctrl+F5).

## Responsividade

O layout foi ajustado para manter legibilidade e boa navegacao em telas menores.

Exemplos de ajustes recentes:

1. Cards de liturgia com abrir/fechar consistente no mobile.
2. Secoes de cards (destaques, noticias e participe) em coluna unica no mobile.
3. Galeria da comunidade com carrossel no mobile, swipe e botoes laterais.
4. Banner de privacidade reorganizado para texto acima e acoes abaixo em telas pequenas.

## Acessibilidade e UX

1. Uso de estrutura semantica nas paginas principais.
2. Labels e atributos ARIA em componentes interativos.
3. Respeito a prefers-reduced-motion em animacoes.
4. Contraste e hierarquia visual orientados para leitura em mobile.

## Integracoes

1. API liturgica: https://liturgia.up.railway.app/
2. Supabase (configurado via JS/supabase-config.js)

## Licenca

Este projeto esta sob a licenca MIT. Consulte o arquivo LICENSE.
