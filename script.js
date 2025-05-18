document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for notification items
    document.querySelectorAll('.notification-dropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle notification click (you can add specific actions here)
            console.log('Notification clicked:', this.querySelector('strong').textContent);
        });
    });    // Add click handlers for dropdown suggestions
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tramiteText = this.textContent.trim();
            
            // Convert the trámite text to a URL-friendly parameter
            const gestionParam = encodeURIComponent(tramiteText
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
                .replace(/[^a-z0-9-]/g, '')); // Remove special characters
            
            // Navigate to seleccionarInteresado.html with the gestion parameter
            const targetUrl = `seleccionarInteresado.html?gestion=${gestionParam}`;
            console.log(`Navigating to: ${targetUrl}`);
            window.location.href = targetUrl;
        });
    });    // Add search bar functionality

// Update navigation active state on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add offset for navigation (height of navbar)
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    if (scrollPosition < aboutSection.offsetTop - navHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('a[href="#hero"]').classList.add('active');
    } else {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('a[href="#about"]').classList.add('active');
    }
});
});


// Activate Bootstrap scrollspy on the main nav element
const mainNav = document.body.querySelector('#navbar-main');
if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-main',
        offset: 70, // Adjust this value if your navbar height changes or content is offset
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate the position of the target element, considering the fixed navbar height
            const navbarHeight = document.querySelector('#navbar-main') ? document.querySelector('#navbar-main').offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Manually update the URL hash without jumping, if desired
            // history.pushState(null, null, targetId);


            // Manually activate the correct nav link for "Sobre nosotros"
            // because it points to a parent section with multiple sub-items
            if (targetId === '#sobre-nosotros' || targetId === '#ahorra-tiempo' || targetId === '#muchos-beneficiarios') {
                document.querySelectorAll('#navbar-main .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#sobre-nosotros') {
                        link.classList.add('active');
                    }
                });
            } else if (targetId === '#inicio') {
                 document.querySelectorAll('#navbar-main .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#inicio') {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
});


// Snapping scroll behavior (optional, modern browsers)
// For a more robust snapping, you might need a library or more complex JS
// This basic CSS approach works but can be finicky.
const sections = document.querySelectorAll('section');
let currentSection = 0;
let isScrolling;

window.addEventListener('wheel', function(event) {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        // Determine scroll direction
        if (event.deltaY < 0 && currentSection > 0) { // Scrolling up
            // currentSection--; // Commented out to prevent immediate snap back
        } else if (event.deltaY > 0 && currentSection < sections.length - 1) { // Scrolling down
            // currentSection++; // Commented out to prevent immediate snap back
        }

        // Find the section that is most visible
        let maxVisible = 0;
        let mostVisibleSectionIndex = 0;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            if (visibleHeight > maxVisible) {
                maxVisible = visibleHeight;
                mostVisibleSectionIndex = index;
            }
        });
        currentSection = mostVisibleSectionIndex;


        // Scroll to the determined current section (optional, for snapping)
        // This can sometimes conflict with smooth scroll and scrollspy, enable with caution
        /*
        const navbarHeight = document.querySelector('#navbar-main') ? document.querySelector('#navbar-main').offsetHeight : 0;
        const sectionTop = sections[currentSection].offsetTop - navbarHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
        */

    }, 150); // Adjust timeout as needed
}, false);


// Update active nav link on scroll (more robust than just ScrollSpy for this case)
window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.querySelector('#navbar-main') ? document.querySelector('#navbar-main').offsetHeight : 0;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Add a little offset
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('#navbar-main .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
        // Special handling for "Sobre nosotros" parent
        if ((current === 'sobre-nosotros' || current === 'ahorra-tiempo' || current === 'muchos-beneficiarios') && href === 'sobre-nosotros') {
            navLinks.forEach(l => l.classList.remove('active')); // Deactivate all
            link.classList.add('active'); // Activate "Sobre nosotros"
        } else if (current === 'inicio' && href === 'inicio') {
            navLinks.forEach(l => l.classList.remove('active')); // Deactivate all
            link.classList.add('active'); // Activate "Inicio"
        }
    });
});

const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('focus', function() {
        searchDropdownMenu.classList.add('show');
    });

// Permite al usuario filtrar las sugerencias mientras escribe
    searchBar.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        document.querySelectorAll('.search-suggestions .dropdown-item').forEach(item => {
            const itemText = item.textContent.trim().toLowerCase();
            if (itemText.includes(searchText)) {
                item.style.display = 'block'; // Muestra el item si coincide
            } else {
                item.style.display = 'none'; // Oculta el item si no coincide
            }
        });
        // Si no hay texto, muestra todas las sugerencias
        if (searchText === '') {
            document.querySelectorAll('.search-suggestions .dropdown-item').forEach(item => {
                item.style.display = 'block';
            });
        }
    });

// Controla la navegación al presionar 'Enter' en la barra de búsqueda
    searchBar.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const typedText = this.value.trim();
            // Convertir el texto introducido al formato de parámetro de gestión
            const typedGestionParam = encodeURIComponent(typedText
                .toLowerCase()
                .replace(/\s+/g, '-')
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9-]/g, ''));

            // Comprobar si el trámite introducido es válido
            if (validGestionParams.includes(typedGestionParam)) {
                const targetUrl = `seleccionarInteresado.html?gestion=${typedGestionParam}`;
                console.log(`Navigating to: ${targetUrl}`);
                window.location.href = targetUrl;
            } else {
                alert('El trámite introducido no es válido. Por favor, selecciona uno de las sugerencias o introduce un trámite existente.');
                // Opcional: podrías limpiar la barra de búsqueda o forzar que el desplegable se mantenga abierto
                // this.value = ''; 
                // searchDropdownMenu.classList.add('show'); // Mantener abierto si quieres que el usuario vea las opciones
            }
        }
    });  

    document.addEventListener('click', function(e) {
        const searchContainer = document.querySelector('.search-container');
        const searchBar = document.querySelector('.search-bar');
        
        // Check if click is on search bar to prevent immediate hide
        if (e.target === searchBar) {
            searchDropdownMenu.classList.add('show');
        }
        // Hide only if click is outside container and not on search bar
        else if (!searchContainer.contains(e.target)) {
            searchDropdownMenu.classList.remove('show');
        }
    });

// Voice search functionality
document.querySelector('.busqueda-voz').addEventListener('click', function() {    const button = this;
    if (!button.classList.contains('recording')) {
        // Start recording
        button.classList.add('recording');
        
        // Simulate 4 seconds of recording
        setTimeout(() => {
            // Stop recording
            window.location.href = '/seleccionarInteresado.html?gestion=beca-educacion-2025';
            button.classList.remove('recording');
        
        }, 4000);
    }
});