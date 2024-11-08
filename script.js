// Function to send user input to the API and display the response
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return; // Prevent empty messages

    // Display user's message
    displayMessage('User', userInput);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Call the OpenAI API
    const apiKey = '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'; // Replace with your OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { "role": "system", "content": "You are an AI legal assistant specializing in Indian law." },
                { "role": "user", "content": userInput }
            ]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    // Display AI's response
    displayMessage('AI', reply);
}

// Function to display messages in the chat box
function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}
