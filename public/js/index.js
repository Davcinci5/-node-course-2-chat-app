var socket = io();
    // Adding a connection event in the client
    socket.on('connect', function () {

        console.log('Connected to server');

        // socket.emit('createMessage', {
        //     from: 'Andrew',
        //     text: 'Yup, that works for me.'
        //    });

        // socket.emit('createEmail',{
        //     to: 'jen@example.com',
        //     text: 'Hey. This is Andrew.'
        // });
 
    });
    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });
//     socket.on('newEmail', function (email) {
//         console.log('New email', email);
//        });
    
   socket.on('newMessage', function (message) {
        console.log('newMessage', message);
    });


       
       