document.getElementById('signUpBtn').addEventListener('click', function() {
    document.getElementById('signupModal').style.display = 'block';
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'block';
});

document.querySelectorAll('.close').forEach(item => {
    item.addEventListener('click', function() {
        item.parentElement.parentElement.style.display = 'none';
    });
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('signupModal')) {
        document.getElementById('signupModal').style.display = 'none';
    } else if (event.target === document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
});

document.querySelector('#signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    alert(`Account created for username: ${username}`);
});

document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Logged in with username: ${username}`);
});
// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

document.getElementById('accountIcon').addEventListener('click', function() {
    document.getElementById('accountDropdown').style.display = 
        document.getElementById('accountDropdown').style.display === 'block' ? 'none' : 'block';
});
//dropdown 
window.addEventListener('click', function(event) {
    if (!event.target.matches('.account-icon')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
});

//




