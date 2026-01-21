// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.onclick = () => {
    // Alterna a classe 'open' para animar as linhas do ícone
    hamburger.classList.toggle('open');
    // Alterna a classe 'active' para mostrar o menu lateral
    navMenu.classList.toggle('active');
};

// Fecha o menu e reseta o ícone ao clicar num link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.onclick = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    };
}); 
// --Menu hambúrguer (Mobile)