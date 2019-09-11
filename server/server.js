const path = require('path');

const http = require('http');

const express = require('express');

const socketIO = require('socket.io');

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
    //new message
    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'See you then',
    //     createdAt: 123123
    //    });

    // Creating a message 
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //io.emit emits an event to every single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
           });
       });       

    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: 123
    //    });

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
   
   
   