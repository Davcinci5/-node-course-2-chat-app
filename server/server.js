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

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
   });
   
   
   