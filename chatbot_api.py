from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/chat', methods=['POST'])  # Define the /chat route properly
def chat():
    data = request.get_json()
    user_message = data.get("message", "").lower()

    # Chatbot responses
    responses = {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How can I help?",
        "appointment": "To book an appointment, please provide the date and time.",
        "symptom": "I'm sorry to hear that. Can you describe your symptoms?",
        "bye": "Goodbye! Take care!",
        "thanks": "You're welcome! Let me know if you need more help."
    }

    # Default response
    reply_message = "I'm sorry, I didn't understand that. Can you rephrase?"
    for key, value in responses.items():
        if key in user_message:
            reply_message = value
            break

    return jsonify({"reply": reply_message})  # Return JSON response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)  # Make Flask accessible
