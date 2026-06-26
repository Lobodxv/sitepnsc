# ✦ PNSC — Site Oficial da Paróquia Nossa Senhora do Carmo

<div align="center">

![Status](https://img.shields.io/badge/status-produção-brightgreen?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/licença-MIT-blue?style=flat-square)

**Site institucional da Paróquia Nossa Senhora do Carmo**, com liturgia diária, agenda de celebrações, escala de corais, doação via PIX e demais informações e funcionalidades.**

[🌐 Ver Site](#) · [🐛 Reportar Bug](https://github.com/manoellob_/sitepnsc/issues) · [✨ Solicitar Funcionalidade](https://github.com/manoellob_/sitepnsc/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Funcionalidades EM DESENVOLVIMENTO](#-funcionalidades-em-desenvolvimento)
- [Tecnologias](#-tecnologias)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Páginas](#-páginas)
- [Responsividade](#-responsividade)
- [Acessibilidade](#-acessibilidade)
- [Contribuindo](#-contribuindo)
- [Desenvolvedor](#-desenvolvedor)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

O site da **Paróquia Nossa Senhora do Carmo** é uma plataforma web institucional desenvolvida para aproximar a comunidade paroquial dos serviços e informações da paróquia. A aplicação exibe:

- **Horários de celebrações** semanais em tempo real
- **Escala de corais** com cálculo automático baseado na data
- **Barra do Evangelho do Dia** com integração à API litúrgica

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📅 **Agenda Litúrgica** | Cards com horários de missas, terços e adoração por dia da semana |
| 📖 **Liturgia Diária** | Página dedicada às leituras do dia, com visual premium e conteúdo atualizado automaticamente |
| 🎵 **Escala de Corais** | Cálculo automático por domingo do mês; navegação entre meses |
| 📖 **Evangelho do Dia** | Barra marquee com texto litúrgico carregado da API em tempo real |
| 🌓 **Tema Claro/Escuro** | Alternância de tema premium com preferência salva no navegador |
| 🗺️ **Mapa** | Google Maps embed com localização da Igreja Matriz |
| 📱 **Responsivo** | Layout adaptado para mobile, tablet e desktop |
| ♿ **Acessível** | ARIA labels, roles, foco gerenciado, `prefers-reduced-motion` |
| 📞 **WhatsApp** | Botão flutuante para contato direto |

---

## ✨ Funcionalidades EM DESENVOLVIMENTO
| Funcionalidade | Descrição |
|---|---|
| 💰 **Doação PIX** | QR Code + cópia de chave com feedback visual |
| 🔒 **Painel Admin** | Login com Firebase Auth + edição de avisos e dados PIX |
| ⚡ **Tempo Real** | Conteúdo do site atualizado via `onSnapshot` do Firestore |

## 🛠 Tecnologias

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) | — | Estrutura semântica das páginas |
| [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) | — | Estilo, animações, variáveis CSS |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | — | Lógica, interatividade, módulos |
| [Bootstrap](https://getbootstrap.com/) | 5.3.8 | Grid, carrossel, utilitários |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.1 | Ícones |
| [Swiper.js](https://swiperjs.com/) | 11 | Carrossel dos cards de celebrações |
| [Google Fonts](https://fonts.google.com/) | — | Playfair Display · Montserrat |

### Backend / Infraestrutura

| Tecnologia | Uso |
|---|---|
| [Firebase Authentication](https://firebase.google.com/docs/auth) | Autenticação do painel administrativo |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | Banco de dados em tempo real |
| [API Litúrgica](https://liturgia.up.railway.app/) | Evangelho do dia |

---

## 📁 Estrutura de Pastas

```
sitepnsc/
│
├── index.html          # Página inicial (hero, celebrações, PIX, endereço)
├── liturgia.html       # Liturgia diária com leituras do dia
├── corais.html         # Escala de corais por mês
├── pix.html            # Página de doação via PIX
├── login.html          # Login do painel administrativo
├── admin.html          # Painel administrativo (protegido)
│
├── CSS/
│   ├── style.css       # Estilos globais + variáveis + responsividade
│   ├── theme.css       # Overlays do tema claro/escuro e botão de alternância
│   ├── pix.css         # Estilos específicos da página de doação
│   ├── login.css       # Estilos da página de login
│   └── admin.css       # Estilos do painel administrativo
│
├── JS/
│   ├── main.js         # Firebase Firestore — escuta em tempo real
│   ├── hamburger.js    # Menu hambúrguer mobile (abre/fecha/Escape)
│   ├── evangelho.js    # Carrega o Evangelho do dia via API
│   ├── liturgiadiaria.js # Carrega e formata o conteúdo da liturgia diária
│   ├── theme-toggle.js  # Alterna entre dark e light com persistência local
│   ├── animations.js   # Animações de scroll (IntersectionObserver)
│   └── login.js        # Firebase Auth — login/logout
│
├── img/
│   ├── bannergrande.png        # Banner desktop (carrossel)
│   ├── bannermobile.png        # Banner mobile (carrossel, srcset)
│   ├── bannerpequeno.png       # Variante do banner
│   ├── imgaerea1.jpeg          # Foto aérea 1
│   ├── imgaerea2.jpeg          # Foto aérea 2 (desktop)
│   ├── imgaerea2-mob.jpeg      # Foto aérea 2 (mobile)
│   ├── logoIgrejaPNG.png       # Logo da Igreja
│   └── qrcode.jpeg             # QR Code para doação PIX
│
├── README.md
└── LICENSE
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Um editor de código (ex: [VS Code](https://code.visualstudio.com/))
- Extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recomendado) ou qualquer servidor HTTP local

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/manoellob_/sitepnsc.git

# 2. Entre na pasta
cd sitepnsc

# 3. Abra com Live Server (VS Code)
# Clique com botão direito em index.html → "Open with Live Server"
```

> **Atenção:** Por usar módulos ES6 (`import`/`export`) e APIs externas, é necessário servir os arquivos via HTTP. Não abra o `index.html` direto pelo sistema de arquivos.


---

## 📄 Páginas

### `index.html` — Página Inicial
- Header fixo com navegação responsiva
- Barra marquee com Evangelho do Dia (API externa)
- Carrossel Bootstrap com imagens responsivas (`srcset`)
- Seção de Celebrações com Swiper.js (cards por dia da semana)
- Seção de Doação (link para pix.html)
- Seção de Endereço com Google Maps embed
- Footer com informações e crédito do desenvolvedor
- Botão WhatsApp flutuante

### `liturgia.html` — Liturgia Diária
- Leituras do dia organizadas em cards premium com glassmorphism
- Conteúdo carregado automaticamente ao abrir a página
- Layout dedicado para leitura e oração, sem a seção de santo do dia
- Compatível com os temas dark e light do site

### `corais.html` — Escala de Corais
- Destaque do próximo coral (calculado automaticamente)
- Tabela mensal de domingos com coral responsável
- Navegação entre meses
- Linha destacada indica o próximo domingo

### `pix.html` — Doação via PIX *(Em desenvolvimento)*
- Layout de dois painéis (contextual + formulário)
- QR Code para escaneamento
- Chave PIX com botão de cópia (feedback visual de "Copiado!")
- Dados do Firestore atualizados em tempo real

### `login.html` — Acesso Administrativo *(Em desenvolvimento)*
- Formulário com Firebase Authentication
- Mensagens de erro amigáveis por código Firebase
- Noindex/nofollow (oculto dos mecanismos de busca)
- Animação de entrada

### `admin.html` — Painel Administrativo *(protegido)* *(Em desenvolvimento)*
- Verificação de autenticação (`onAuthStateChanged`)
- Edição do aviso paroquial
- Configuração da chave PIX e nome do beneficiário
- Feedback visual de sucesso/erro ao salvar
- Logout seguro

---

## 📱 Responsividade

O site é desenvolvido com abordagem **Mobile First** e funciona em:

| Dispositivo | Resolução | Comportamento |
|---|---|---|
| Mobile pequeno | < 480px | Cards empilhados, menu lateral, banner 180px |
| Mobile | 480px–768px | Banner 220px, swiper 1 card |
| Tablet | 768px–1024px | Swiper 2 cards, layout 2 colunas no PIX |
| Desktop | > 1024px | Swiper 4 cards, layout completo |

---

## ♿ Acessibilidade

- **ARIA labels** em todos os botões e regiões importantes
- **Roles semânticos**: `main`, `nav`, `aside`, `region`, `alert`, `marquee`
- **Foco gerenciado** no menu hambúrguer (fecha com `Escape`, foco retorna ao botão)
- **`aria-expanded`** atualizado dinamicamente no hambúrguer
- **`prefers-reduced-motion`**: animações desativadas quando o usuário solicita
- **Alt texts** descritivos em todas as imagens
- **`lang="pt-br"`** no `<html>` para leitores de tela
- **`autocomplete`** nos campos de formulário (login)
- **`novalidate` + validação manual** com mensagens de erro acessíveis
- **Tema alternável** entre dark e light, com preferência salva no navegador

---

### Convenção de commits

```
feat:     nova funcionalidade
fix:      correção de bug
style:    alterações visuais/CSS
refactor: refatoração sem mudança de comportamento
docs:     alterações na documentação
chore:    tarefas de manutenção
```

---

## 👨‍💻 Desenvolvedor

<div align="center">

**Manoel Lobo**

[![Instagram](https://img.shields.io/badge/@manoellob__-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/manoellob_)

*Desenvolvido com dedicação para a comunidade da Paróquia Nossa Senhora do Carmo.*

</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

✦ *Feito com fé e código para a comunidade paroquial* ✦

</div>
