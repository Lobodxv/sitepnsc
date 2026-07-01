# ✦ PNSC — Site Oficial da Paróquia Nossa Senhora do Carmo

<div align="center">

![Status](https://img.shields.io/badge/status-produção-brightgreen?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/licença-MIT-blue?style=flat-square)

**Site institucional da Paróquia Nossa Senhora do Carmo**, com liturgia diária, agenda de celebrações, escala de corais, doação via PIX e painel administrativo com Supabase Auth.

[🌐 Ver Site](#) · [🐛 Reportar Bug](https://github.com/manoellob_/sitepnsc/issues) · [✨ Solicitar Funcionalidade](https://github.com/manoellob_/sitepnsc/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Atuais](#-funcionalidades-atuais)
- [Painel Administrativo](#-painel-administrativo)
- [Tecnologias](#-tecnologias)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Páginas](#-páginas)
- [Segurança e Dados Sensíveis](#-segurança-e-dados-sensíveis)
- [Responsividade](#-responsividade)
- [Acessibilidade](#-acessibilidade)
- [Contribuindo](#-contribuindo)
- [Desenvolvedor](#-desenvolvedor)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

O site da **Paróquia Nossa Senhora do Carmo** é uma plataforma web institucional desenvolvida para apresentar informações da comunidade, disponibilizar a liturgia diária, organizar a escala de corais, exibir conteúdo litúrgico em tempo real e permitir a administração de conteúdo do site com autenticação.

O projeto foi estruturado como um site estático com HTML, CSS e JavaScript, usando Supabase para autenticação e armazenamento do conteúdo compartilhado entre as páginas públicas e o painel administrativo.

---

## ✅ Funcionalidades Atuais

| Funcionalidade | Descrição |
|---|---|
| 📅 **Agenda Litúrgica** | Cards com horários de missas, terços e adoração por dia da semana |
| 📖 **Liturgia Diária** | Página dedicada às leituras do dia, com visual premium e conteúdo atualizado automaticamente |
| 🎵 **Escala de Corais** | Cálculo automático por domingo do mês; navegação entre meses |
| 📖 **Evangelho do Dia** | Barra com o texto litúrgico carregado de API externa |
| 🌓 **Tema Claro/Escuro** | Alternância de tema com preferência salva no navegador |
| 🗺️ **Mapa** | Google Maps embed com a localização da igreja |
| 💰 **Doação PIX** | QR Code + chave PIX com botão de cópia e feedback visual |
| 🔒 **Painel Admin** | Login com Supabase Auth, edição de conteúdo e cadastro de administradores |
| 📱 **Responsivo** | Layout adaptado para mobile, tablet e desktop |
| ♿ **Acessível** | ARIA labels, foco gerenciado, roles semânticos e redução de animações quando solicitado |

---

## 🔒 Painel Administrativo

O painel administrativo está funcional e organizado para uso restrito.

### O que já funciona

- Login administrativo via Supabase Auth
- Verificação de sessão e autorização por lista de administradores
- Edição do conteúdo público compartilhado entre home e página PIX
- Cadastro de novos administradores pelo próprio painel
- Atualização de nome de exibição, e-mail e senha no perfil
- Drawer lateral de perfil com backdrop e animação suave
- Botão de encerrar sessão flutuante
- Boas-vindas personalizadas com base no nome de exibição salvo
- Modal de primeiro acesso para definir o nome de exibição

### Estrutura de dados usada

- `site_content`: conteúdo público do site, incluindo aviso paroquial e dados do PIX
- `admin_users`: allowlist de e-mails com permissão administrativa
- Supabase Auth: autenticação do usuário administrativo

---

## 🛠 Tecnologias

### Frontend

| Tecnologia | Uso |
|---|---|
| [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) | Estrutura semântica das páginas |
| [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) | Estilo, responsividade, animações e temas |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Lógica, interatividade e módulos |
| [Bootstrap](https://getbootstrap.com/) | Grid, utilitários e componentes pontuais |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Ícones |
| [Swiper.js](https://swiperjs.com/) | Carrossel dos cards de celebrações |
| [Google Fonts](https://fonts.google.com/) | Playfair Display · Montserrat |

### Integrações

| Tecnologia | Uso |
|---|---|
| [Supabase Auth](https://supabase.com/docs/guides/auth) | Autenticação do painel administrativo |
| [Supabase Database](https://supabase.com/docs/guides/database) | Conteúdo compartilhado e allowlist de administradores |
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
├── login.html          # Acesso administrativo via Supabase
├── admin.html          # Painel administrativo protegido
│
├── CSS/
│   ├── style.css       # Estilos globais + variáveis + responsividade
│   ├── theme.css       # Tema claro/escuro e botão de alternância
│   ├── pix.css         # Estilos específicos da página de doação
│   ├── login.css       # Estilos da página de login
│   └── admin.css       # Estilos do painel administrativo
│
├── JS/
│   ├── main.js         # Leitura do conteúdo público no Supabase
│   ├── hamburger.js    # Menu hambúrguer mobile (abre/fecha/Escape)
│   ├── evangelho.js    # Carrega o Evangelho do dia via API
│   ├── liturgiadiaria.js # Carrega e formata o conteúdo da liturgia diária
│   ├── theme-toggle.js  # Alterna entre dark e light com persistência local
│   ├── animations.js   # Animações de scroll (IntersectionObserver)
│   ├── supabase-config.js # Configuração pública do Supabase para o cliente
│   ├── login.js        # Supabase Auth — login/logout
│   └── admin.js        # Sessão, perfil, conteúdo e cadastro de admins
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

## 📄 Páginas

### `index.html` — Página Inicial
- Header fixo com navegação responsiva
- Barra com Evangelho do Dia carregado por API externa
- Carrossel Bootstrap com imagens responsivas (`srcset`)
- Seção de celebrações com Swiper.js
- Seção de doação com acesso à página PIX
- Seção de endereço com Google Maps embed
- Footer com informações e crédito do desenvolvedor
- Botão WhatsApp flutuante

### `liturgia.html` — Liturgia Diária
- Leituras do dia organizadas em cards com visual premium
- Conteúdo carregado automaticamente ao abrir a página
- Layout dedicado para leitura e oração
- Compatível com os temas dark e light do site

### `corais.html` — Escala de Corais
- Destaque do próximo coral calculado automaticamente
- Tabela mensal de domingos com coral responsável
- Navegação entre meses
- Linha destacada para o próximo domingo

### `pix.html` — Doação via PIX
- Layout de dois painéis com área contextual e área de PIX
- QR Code para escaneamento
- Chave PIX com botão de cópia e feedback visual
- Dados dinâmicos vindos do Supabase

### `login.html` — Acesso Administrativo
- Formulário com Supabase Auth
- Mensagens de erro amigáveis
- Fundo dinâmico com identidade visual do site
- `noindex`/`nofollow` para não aparecer nos buscadores

### `admin.html` — Painel Administrativo
- Verificação de autenticação com Supabase
- Editor do aviso paroquial
- Campo para nome e chave PIX
- Cadastro de novos administradores
- Configurações de perfil em drawer lateral
- Primeiro acesso com modal para definir nome de exibição
- Logout flutuante

---

## 📱 Responsividade

O site foi ajustado com foco em mobile e telas pequenas.

| Dispositivo | Comportamento |
|---|---|
| Mobile pequeno | Cards empilhados, sidebar adaptada, drawers compactos, botões em largura total |
| Mobile | Espaçamentos reduzidos, tipografia compacta e overlays mais leves |
| Tablet | Layout intermediário com melhor aproveitamento do espaço |
| Desktop | Layout completo com navegação lateral e cards em largura confortável |

---

## ♿ Acessibilidade

- **ARIA labels** em botões e regiões importantes
- **Roles semânticos**: `main`, `nav`, `aside`, `region`, `alert`, `dialog`
- **Foco gerenciado** no menu e nos overlays do painel
- **`aria-expanded`** e estados visuais atualizados quando aplicável
- **`prefers-reduced-motion`** respeitado nas animações
- **Alt texts** descritivos nas imagens
- **`lang="pt-br"`** no `<html>` para leitores de tela
- **`autocomplete`** nos campos de formulário
- **Validação manual** com mensagens claras e acessíveis
- **Tema alternável** entre dark e light com preferência persistida

---

### Convenção de commits

```text
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
