document.getElementById("btt_iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btt_registrarse").addEventListener("click", register);

document.getElementById("btt_login").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    menu();
});
document.getElementById("btt_registrar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío del formulario
    menu();
});


var contenedor_login_register = document.querySelector(".contenedor_login-register");
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var caja_login = document.querySelector(".caja_trasera_login");
var caja_register = document.querySelector(".caja_trasera_registrar");

function menu(){
    window.location.href = "index.html";
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