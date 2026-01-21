const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.onsubmit = (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação de autenticação simples para teste
    if (email === "admin@carmo.com" && password === "123456") {
        // Em um sistema real, aqui você salvaria o token de acesso
        window.location.href = "admin.html"; 
    } else {
        errorMsg.style.display = "block";
        document.getElementById('password').value = "";
    }
};