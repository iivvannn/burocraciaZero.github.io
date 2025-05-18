document.getElementById("btt_iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btt_registrarse").addEventListener("click", register);

// Función para limpiar errores
function limpiarErrores(form) {
    const inputs = form.querySelectorAll('input');
    const mensajes = form.querySelectorAll('.mensaje-error');
    
    inputs.forEach(input => input.classList.remove('error'));
    mensajes.forEach(msg => msg.style.display = 'none');
}

document.getElementById("btt_login").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    // Obtener los campos del formulario de login
    const loginForm = document.querySelector(".formulario_login");
    const username = loginForm.querySelector('input[type="text"]');
    const password = loginForm.querySelector('input[type="password"]');
    
    // Limpiar errores anteriores
    limpiarErrores(loginForm);
    
    let isValid = true;
    
    // Validar campos
    if (!username.value) {
        document.getElementById('login-usuario-error').style.display = 'block';
        username.classList.add('error');
        isValid = false;
    }
    
    if (!password.value) {
        document.getElementById('login-password-error').style.display = 'block';
        password.classList.add('error');
        isValid = false;
    }
    
    // Si todo está correcto, proceder con el login
    if (isValid) {
        menu();
    }
});

document.getElementById("btt_registrar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    // Obtener los campos del formulario de registro
    const registerForm = document.querySelector(".formulario_register");
    const username = registerForm.querySelector('input[type="text"]');
    const password = registerForm.querySelector('input[type="password"]');
    
    // Limpiar errores anteriores
    limpiarErrores(registerForm);
    
    let isValid = true;
    
    // Validar campos
    if (!username.value) {
        document.getElementById('registro-usuario-error').style.display = 'block';
        username.classList.add('error');
        isValid = false;
    }
    
    if (!password.value) {
        document.getElementById('registro-password-error').style.display = 'block';
        password.classList.add('error');
        isValid = false;
    }
    
    // Si todo está correcto, proceder con el registro
    if (isValid) {
        menu();
    }
});

var contenedor_login_register = document.querySelector(".contenedor_login-register");
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var caja_login = document.querySelector(".caja_trasera_login");
var caja_register = document.querySelector(".caja_trasera_registrar");

// Función para establecer una cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
}

function menu() {
    // Guardar el estado de la sesión en localStorage
    localStorage.setItem("sesionIniciada", "true");
    
    // Obtener el nombre de usuario del formulario activo
    let username;
    if (formulario_login.style.display !== "none") {
        username = formulario_login.querySelector('input[type="text"]').value;
    } else {
        username = formulario_register.querySelector('input[type="text"]').value;
    }
    
    // Establecer la cookie con el nombre de usuario (expira en 7 días)
    setCookie('username', username, 7);
    
    window.location.href = "miPanel.html";
}

function iniciarSesion(){
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display = "block";
    caja_register.style.opacity = "1";
    caja_login.style.opacity = "0";
}

function register(){
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_register.style.opacity = "0";
    caja_login.style.opacity = "1";
}