document.addEventListener("DOMContentLoaded", function () {
    const chatboxToggle = document.querySelector(".chatbox-toggle");
    const chatboxMessageWrapper = document.querySelector(".chatbox-message-wrapper");
    const chatboxForm = document.querySelector(".chatbox-message-form");
    const textarea = document.querySelector(".chatbox-message-input");
    const chatboxMessageContent = document.querySelector(".chatbox-message-content");
  
    let userSymptoms = "";
    let symptomDays = 0;
    let waitingForDays = false;
    let waitingForAppointment = false;
    let waitingForDate = false;
    let waitingForTime = false;
    let appointmentDate = "";
    let appointmentTime = "";
  
    const responses = {
      fever: {
        level: "mild to moderate",
        remedy: "Stay hydrated, drink herbal teas (ginger, chamomile), and rest.",
        doctor: "General Practitioner (GP) or Internal Medicine Specialist.",
        tablet: "Paracetamol (Acetaminophen) for fever reduction."
      },
      cough: {
        level: "mild to moderate",
        remedy: "Drink warm fluids, honey with lemon, steam inhalation, and ginger tea.",
        doctor: "GP or ENT specialist.",
        tablet: "Diphenhydramine or guaifenesin."
      },
      headache: {
        level: "mild to severe",
        remedy: "Stay hydrated, rest in a dark room, and apply peppermint oil on temples.",
        doctor: "Neurologist or GP.",
        tablet: "Ibuprofen or Paracetamol."
      }
    };
  
    function addMessage(message, type = "received") {
      let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let msgHTML = `
        <div class="chatbox-message-item ${type}">
          <span class="chatbox-message-item-text">${message}</span>
          <span class="chatbox-message-item-time">${time}</span>
        </div>`;
      chatboxMessageContent.insertAdjacentHTML("beforeend", msgHTML);
      chatboxMessageContent.scrollTo(0, chatboxMessageContent.scrollHeight);
    }
  
    function handleResponse(userInput) {
      let lowerInput = userInput.toLowerCase().trim();
  
      // If we are waiting for the user to input the number of days
      if (waitingForDays) {
        symptomDays = parseInt(lowerInput);
        if (!isNaN(symptomDays) && symptomDays > 0) {
          let severity = symptomDays >= 5 ? "severe" : responses[userSymptoms]?.level || "mild";
          addMessage(`Your symptoms for ${symptomDays} days indicate a ${severity} condition.`);
          addMessage(`Suggested remedy: ${responses[userSymptoms]?.remedy || "Try rest and hydration."}`);
          addMessage(`You may consult a ${responses[userSymptoms]?.doctor || "General Practitioner"}.`);
          addMessage(`Would you like to book a doctor’s appointment? (yes/no)`);
          waitingForDays = false;
          waitingForAppointment = true;
        } else {
          addMessage("Please enter a valid number of days.");
        }
        return;
      }
  
      // If we are waiting to know if user wants to book appointment
      if (waitingForAppointment) {
        if (lowerInput.includes("yes")) {
          addMessage("Enter the appointment date (DD.MM.YYYY format).");
          waitingForAppointment = false;
          waitingForDate = true;
        } else {
          addMessage("Let me know if you need any other help.");
          waitingForAppointment = false;
        }
        return;
      }
  
      // If we are waiting for the appointment date
      if (waitingForDate) {
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(lowerInput)) {
          appointmentDate = lowerInput;
          addMessage("Enter the appointment time (H AM/PM or H.MM AM/PM).");
          waitingForDate = false;
          waitingForTime = true;
        } else {
          addMessage("Invalid format. Use DD.MM.YYYY (e.g., 25.02.2025).");
        }
        return;
      }
  
      // If we are waiting for the appointment time
      if (waitingForTime) {
        if (/^([1-9]|1[0-2])(\.[0-5][0-9])?\s?(am|pm)$/i.test(lowerInput)) {
          appointmentTime = lowerInput;
          addMessage(`✅ Your appointment is set for **${appointmentDate} at ${appointmentTime}**.`);
          waitingForTime = false;
        } else {
          addMessage("Invalid format. Use H AM/PM or H.MM AM/PM.");
        }
        return;
      }
  
      // Generic user input handling
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        addMessage("Hello! How can I assist you?");
      } else if (lowerInput.includes("i have") || lowerInput.includes("i'm having")) {
        // Check if user mentions any known symptom
        let foundSymptom = Object.keys(responses).find(symptom => lowerInput.includes(symptom));
        if (foundSymptom) {
          userSymptoms = foundSymptom;
          addMessage(`You have ${userSymptoms}. How many days have you had this issue?`);
          waitingForDays = true;
        } else {
          addMessage("Can you describe your symptoms in more detail?");
        }
      } else if (lowerInput.includes("thank you")) {
        addMessage("You're welcome! Stay healthy.");
      } else if (lowerInput.includes("bye")) {
        addMessage("Goodbye! Take care.");
      } else {
        addMessage("I'm not sure I understand. Could you rephrase?");
      }
    }
  
    // Toggle the chatbox on button click
    chatboxToggle.addEventListener("click", function () {
      chatboxMessageWrapper.classList.toggle("show");
    });
  
    // Handle message submission
    chatboxForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let userMessage = textarea.value.trim();
      if (userMessage) {
        addMessage(userMessage, "sent");
        textarea.value = "";
        handleResponse(userMessage);
      }
    });
  });
  