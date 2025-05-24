// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length;
    if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';
    } else {
        chatboxForm.style.alignItems = 'center';
    }
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage();
        setTimeout(autoReply, 1000);
    }
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function writeMessage() {
    const today = new Date();
    let message = `
        <div class="chatbox-message-item sent">
            <span class="chatbox-message-item-text">
                ${textarea.value.trim().replace(/\n/g, '<br>\n')}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    chatboxForm.style.alignItems = 'center';
    textarea.rows = 1;
    textarea.focus();
    textarea.value = '';
    chatboxNoMessage.style.display = 'none';
    scrollBottom();
}

function autoReply() {
    const today = new Date();
    const userMessage = chatboxMessageWrapper.lastElementChild.querySelector('.chatbox-message-item-text').textContent.toLowerCase();
    
    let replyMessage = "I'm sorry, I didn't understand that. Can you please rephrase?";

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
        replyMessage = "Hello! How can I assist you today?";
    } else if (userMessage.includes('appointment')) {
        replyMessage = "To schedule an appointment, please provide your preferred date and time.";
    } else if (userMessage.includes('symptom')) {
        replyMessage = "I'm sorry to hear you're not feeling well. Can you describe your symptoms in more detail?";
    } else if (userMessage.includes('thank you')) {
        replyMessage = "You're welcome! Is there anything else I can help you with?";
    } else if (userMessage.includes('bye')) {
        replyMessage = "Goodbye! Take care and stay healthy.";
    } else if (userMessage.includes('ok')) {
        replyMessage = "Thank you, do you have any other queries?";
    } else if (userMessage.includes('no')) { 
        replyMessage = "Fine!";
    } else if (userMessage.includes('yes')) {
        replyMessage = "How can I help you? Tell me.";
    }

    let message = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
                ${replyMessage}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    scrollBottom();
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');

    return text.length > 0;
}

// ----------------------------
// New Code: Track Nearby Hospitals & Clinics
// ----------------------------

function trackNearbyHospitals() {
    window.open(
        "https://www.google.com/maps/search/only+hospitals,clinics,medical+shops+india/@11.9435558,79.813783,14.89z/data=!4m2!2m1!6e6?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D", 
        "_blank"
    );
}
