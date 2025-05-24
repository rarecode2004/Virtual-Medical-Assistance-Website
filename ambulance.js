function showPopup(button, contact) {
    // Remove existing popups before showing a new one
    let existingPopup = document.querySelector('.popup');
    if (existingPopup) existingPopup.remove();

    // Create a new popup
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `<p>${contact}</p>`;

    // Append popup inside the clicked card
    button.parentElement.appendChild(popup);
    popup.style.display = 'block';
}

// Close popup when clicking anywhere else
document.addEventListener("click", function(event) {
    if (!event.target.classList.contains("details-btn")) {
        let popups = document.querySelectorAll('.popup');
        popups.forEach(popup => popup.remove());
    }
});
