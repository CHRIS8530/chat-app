// Import the Express framework for building web applications
const express = require('express');

// Import the HTTP module to create an HTTP server
const http = require('http');

// Import the Socket.IO library for real-time web socket communication
const socketIo = require('socket.io');

// Import the path module to handle file paths
const path = require('path');

// Create an instance of an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO server and attach it to the HTTP server
const io = socketIo(server);

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, '../docs')));

// Set up an event listener for new connections to the Socket.IO server
io.on('connection', (socket) => {
    console.log('New client connected');

    // Set up an event listener for 'sendMessage' events from the client
    socket.on('sendMessage', (message) => {
        // Emit a 'receiveMessage' event to all connected clients with the received message
        io.emit('receiveMessage', message);
    });

    // Set up an event listener for when a client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the HTTP server and have it listen on port 4000
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));