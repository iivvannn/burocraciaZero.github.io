// Variables para el control del scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const loginBtn = document.querySelector('.login-btn');
const content = document.querySelector('.content');
const sections = document.querySelectorAll('main, section');

// Función para manejar el evento de scroll
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si estamos haciendo scroll hacia abajo y hemos bajado más de 100px
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('header-scrolled');
        navLinks.forEach(link => link.style.opacity = '0');
        loginBtn.style.opacity = '0';
        content.style.display = 'block'; // Show content on scroll
    } 
    // Si estamos haciendo scroll hacia arriba
    else if (scrollTop < lastScrollTop) {
        header.classList.remove('header-scrolled');
        navLinks.forEach(link => link.style.opacity = '1');
        loginBtn.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;

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