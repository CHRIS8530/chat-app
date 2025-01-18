// Establish a connection to the Socket.IO server at the specified URL
const socket = io(process.env.NGROK_URL);

// Add an event listener to the send button
document.getElementById('send-button').addEventListener('click', () => {
    // Get the message from the input field
    const message = document.getElementById('message-input').value;
    if (message) {
        // Emit the 'sendMessage' event with the message to the Socket.IO server
        socket.emit('sendMessage', message);
        // Clear the input field
        document.getElementById('message-input').value = '';
    }
});

// Add an event listener for 'receiveMessage' events from the Socket.IO server
socket.on('receiveMessage', (message) => {
    // Get the chat box element
    const chatBox = document.getElementById('chat-box');
    // Create a new div element for the message
    const newMessage = document.createElement('div');
    // Set the text content of the new div to the message
    newMessage.textContent = message;
    // Append the new message to the chat box
    chatBox.appendChild(newMessage);
});