const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// we get back is our WebSockets server
var io = socketIO(server);

app.use(express.static(publicPath));

// listen for a new connection of a client to the server 
// and lets you do something when that connection comes in
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));




    // Creating a message 
    socket.on('createMessage', (message,callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    }); 
        
    socket.on('createLocationMessage', (coords) => {
            io.emit('newLocationMessage', generateLocationMessage('Admin',
            coords.latitude, coords.longitude));
       });
     
        
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });
      


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
   });
   
   
   