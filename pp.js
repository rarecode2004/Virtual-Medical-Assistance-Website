const images = [
    'a.png',
    'b.png',
    '4447.jpg',
    // Add other images here
];

let currentImageIndex = 0;

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${images[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 1000); // Change image every 5 seconds
window.onload = changeBackgroundImage; // Initialize with the first image

function goToServices() {
    const form = document.getElementById('patientForm');

    if (form.checkValidity()) {
        console.log('Form is valid. Proceeding to services page.');
        window.location.href = 'services.html';
    } else {
        form.reportValidity();
    }
}
