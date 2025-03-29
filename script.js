// Variables para el control del scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const loginBtn = document.querySelector('.login-btn');
const sections = document.querySelectorAll('main, section');

// Función para manejar el evento de scroll
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Highlight the current section in the navigation
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});