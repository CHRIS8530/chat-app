// Add an event listener to the send button
document.getElementById('send-button').addEventListener('click', function() {
    // Get the message from the input field
    const message = document.getElementById('message-input').value;
    if (message) {
        // Get the chat box element
        const chatBox = document.getElementById('chat-box');
        // Create a new div element for the message
        const newMessage = document.createElement('div');
        // Set the text content of the new div to the message
        newMessage.textContent = message;
        // Append the new message to the chat box
        chatBox.appendChild(newMessage);
        // Clear the input field
        document.getElementById('message-input').value = '';
    }
});