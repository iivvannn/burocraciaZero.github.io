document.addEventListener('DOMContentLoaded', function() {
    // Add logout functionality
    document.querySelector('.btn-login').addEventListener('click', function(e) {
        e.preventDefault();
        // Delete the username cookie
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to index.html
        window.location.href = "index.html";
    });

    // Lista de parámetros de gestión válidos (generados a partir de las sugerencias del dropdown)
    const validGestionParams = [];

    const searchDropdownMenu = document.querySelector('.search-suggestions');

    const pendientes = JSON.parse(localStorage.getItem('tramitesPendientes')) || [];
    const submenu = document.getElementById('tramitesPendientesSubmenu');

    // Eliminar los elementos existentes si son estáticos
    submenu.innerHTML = '';

    pendientes.forEach(tramite => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = tramite;
        a.classList.add('tramite-pendiente');
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = `verEstado.html`;
            window.location.href = targetUrl;
        });
        li.appendChild(a);
        submenu.appendChild(li);
    });


    document.querySelectorAll('.search-suggestions .dropdown-item').forEach(item => {
        const tramiteText = item.textContent.trim();
        const gestionParam = encodeURIComponent(tramiteText
            .toLowerCase()
            .replace(/\s+/g, '-') // Reemplazar espacios con guiones
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
            .replace(/[^a-z0-9-]/g, '')); // Eliminar caracteres especiales
        validGestionParams.push(gestionParam);
    });

    // Sidebar toggle functionality
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Initialize notification dropdown
    const notificationDropdown = new bootstrap.Dropdown(document.getElementById('notificationDropdown'));
    
    // Add click handlers for dropdown suggestions (already navigates to valid tramite)
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
    }); 
    
    // Add search bar functionality
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
    });    // Only hide search dropdown when clicking outside of search container and searchbar
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
                const targetUrl = `seleccionarInteresado.html?gestion=beca-educacion-2025`;
                window.location.href = targetUrl;
                button.classList.remove('recording');
            
            }, 4000);
        }
    });
});