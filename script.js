// Seleccionar elementos
const voiceButton = document.getElementById('voiceButton');
const responseText = document.getElementById('responseText');

// Función que se ejecuta cuando se hace clic en el círculo
voiceButton.addEventListener('click', () => {
    // Crear la animación de onda
    const wave = document.createElement('div');
    wave.classList.add('wave');
    voiceButton.appendChild(wave);

    // Después de 3 segundos, mostrar el texto de respuesta
    setTimeout(() => {
        // Eliminar la onda
        wave.remove();

        // Mostrar el texto de respuesta
        responseText.textContent = 'Iniciando el siguiente trámite: Sacar beca MECD';
        responseText.style.display = 'block'; // Mostrar el texto
    }, 3000); // Esperar 3 segundos
});
