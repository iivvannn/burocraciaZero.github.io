// Variables para el control del scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const loginBtn = document.querySelector('.login-btn');
const sections = document.querySelectorAll('main, section');

document.addEventListener("DOMContentLoaded", function() {
     /*
    const sesionIniciada = localStorage.getItem("sesionIniciada");
    const notificationIcon = document.querySelector('.notification-icon');
    const profileIcon = document.querySelector('.profile-icon');
    const menuIcon = document.querySelector('.menu-icon');
    const verticalMenu = document.querySelector('.vertical-menu');

   
    if (sesionIniciada === "true") {
        console.log("Sesión detectada en index.html");
        notificationIcon.style.display = 'inline';
        profileIcon.style.display = 'inline';
        menuIcon.style.display = 'inline';
        verticalMenu.style.display = 'flex';
    } else {
        console.log("No se detectó una sesión activa.");
        notificationIcon.style.display = 'none';
        profileIcon.style.display = 'none';
        menuIcon.style.display = 'none';
        verticalMenu.style.display = 'none';
    }
    */
});

// Función para manejar el evento de scroll
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Highlight the current section in the navigation
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - header.offsetHeight - section.clientHeight/3; // Adjust for header height
        const sectionBottom = sectionTop + section.clientHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// Función para manejar el clic en "Descubre más"
const discoverMore = document.querySelector('.discover-more');
discoverMore.addEventListener('click', function() {
    const offset = sections[1].offsetTop - document.querySelector('header').offsetHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
});

// Add event listeners for profile and notification icons
const profileIcon = document.querySelector('.profile-icon');
const notificationIcon = document.querySelector('.notification-icon');
const profileMenu = document.querySelector('.profile-menu');
const notificationMenu = document.querySelector('.notification-menu');

profileIcon.addEventListener('click', () => {
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    notificationMenu.style.display = 'none';
});

notificationIcon.addEventListener('click', () => {
    notificationMenu.style.display = notificationMenu.style.display === 'block' ? 'none' : 'block';
    profileMenu.style.display = 'none';
});

// Toggle vertical menu visibility
const menuIcon = document.querySelector('.menu-icon');
const verticalMenu = document.querySelector('.vertical-menu');

menuIcon.addEventListener('click', () => {
    const isMenuVisible = verticalMenu.style.display === 'flex';
    menuIcon.style.position = isMenuVisible ? 'static' : 'absolute';
    menuIcon.style.top = isMenuVisible ? '' : '20px';
    menuIcon.style.left = isMenuVisible ? '' : '20px';
    menuIcon.textContent = isMenuVisible ? '☰' : '✖'; // Change icon to indicate open/close
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    alert('Sesión cerrada.');
    const header = document.querySelector('header');
    header.classList.remove('logged-in');
    document.querySelector('.nav-links').style.display = 'none';
    verticalMenu.style.display = 'none';
    // Add logic to handle logout (e.g., redirect to login page)
});

// Función para activar sesión
function activarSesion() {
    console.log("Sesión activada desde script.js");
    
    const header = document.querySelector('header');
    header.classList.add('logged-in'); // Simulates a logged-in state
    document.querySelector('.nav-links').style.display = 'flex';
    document.querySelector('.vertical-menu').style.display = 'block';
}

// Exponer la función al objeto global
window.activarSesion = activarSesion;

