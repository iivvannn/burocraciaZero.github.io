function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.getElementById('main');
    const toggleBtn = document.getElementById('menuToggleBtn');

    const isSidebarHidden = sidebar.classList.contains('hidden');

    if (isSidebarHidden) {
        // Mostrar sidebar
        sidebar.classList.remove('hidden');
        main.classList.add('shifted');
        toggleBtn.textContent = '×';
    } else {
        // Ocultar sidebar
        sidebar.classList.add('hidden');
        main.classList.remove('shifted');
        toggleBtn.textContent = '≡';
    }
}
