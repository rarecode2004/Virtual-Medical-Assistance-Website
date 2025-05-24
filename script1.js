document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notificationForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const emailNotif = document.getElementById('emailNotif').checked;
        const smsNotif = document.getElementById('smsNotif').checked;

        // Validate form
        if (!name || !email || !phone) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('Please enter a valid phone number.', 'error');
            return;
        }

        // If all validations pass, send data to server
        sendNotificationPreferences(name, email, phone, emailNotif, smsNotif);
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^\d{10}$/; // Assumes a 10-digit phone number
        return re.test(phone);
    }

    function sendNotificationPreferences(name, email, phone, emailNotif, smsNotif) {
        // This is where you would normally send an AJAX request to your server
        // For this example, we'll just simulate a server response
        setTimeout(() => {
            // Simulating a successful response
            showMessage('Your notification preferences have been saved successfully!', 'success');
            
            // In a real application, you might want to update the UI or redirect the user
        }, 1000); // Simulating network delay
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
    }
});