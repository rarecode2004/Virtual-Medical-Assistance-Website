window.addEventListener('beforeunload', function (e) {
    // URL of your Google Form
    var googleFormURL = 'https://forms.gle/wx516ZYtQRofCqwJ6'; // Replace with your form URL

    // Display the form URL
    window.location.href = googleFormURL;

    // Custom message for older browsers (not guaranteed to be shown in modern browsers)
    e.preventDefault();
    e.returnValue = 'Are you sure you want to leave?';

    // Return true to indicate the action should be taken
    return true;
});
