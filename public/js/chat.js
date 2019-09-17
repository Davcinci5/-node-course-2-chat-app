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
       //Implementing the Mustache.js rendering method
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
       });
    jQuery('#messages').append(html);
        scrollToBottom();
        // console.log('newMessage', message);
        // var formattedTime = moment(message.createAt).format('h:mm a');
        // var li = jQuery('<li></li>');
        // li.text(`${message.from} ${formattedTime}: ${message.text}`);
        // jQuery('#messages').append(li);
    });

    

    var locationButton = jQuery('#send-location');  
    locationButton.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser.');
            }

            locationButton.attr('disabled', 'disabled').text('Sending location...');

                navigator.geolocation.getCurrentPosition(function (position) {
                    locationButton.removeAttr('disabled').text('Send location');
                    socket.emit('createLocationMessage', {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });               
                    }, function () {
                        locationButton.removeAttr('disabled').text('Send location');
                        alert('Unable to fetch location.');
                        });
       });
       
       socket.on('newLocationMessage', function(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });
        jQuery('#messages').append(html);
        scrollToBottom();
       });


       //Stops normal flow of form, get the message emit, that new message
       // and create a callback which clean up the text box
    jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();
        var messageTextbox = jQuery('[name=message]');
        socket.emit('createMessage', {
         from: 'User',
         text: messageTextbox.val()
        }, function() {
         messageTextbox.val('')
        });
       });
       
// Function it's going to determine whether or not we should scroll 
// the user to the bottom depending on their position    
        function scrollToBottom () {
            
            
            // Selectors
            var messages = jQuery('#messages');
            var newMessage = messages.children('li:last-child');
            // Heights
                // 'prop' method  gives us a cross-browser 
                // way to fetch a property
                var clientHeight = messages.prop('clientHeight');
                var scrollTop = messages.prop('scrollTop');
                var scrollHeight = messages.prop('scrollHeight');

                    //This is going to calculate the height of 
                    //the message taking into account the padding
                     //that we've also applied via CSS.
                var newMessageHeight = newMessage.innerHeight();

                var lastMessageHeight = newMessage.prev().innerHeight();

                // if the scrollTop plus the clientHeight is greater than or equal to
                //the scrollHeight. If it is, then we want to go ahead and scroll the user to the bottom
                //because we know they're already near the bottom
                if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {           
                    messages.scrollTop(scrollHeight);
                }
        }
       
       



       
    
       