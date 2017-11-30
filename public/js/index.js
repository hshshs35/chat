var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(message.from + ':' + message.text);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(location){
    var li = $('<li></li>');
    var a = $('<a target="_blank">my current location</a>');

    li.text(location.from + ':');
    a.attr('href', location.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function(){
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('geolocation is not supported by the browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('can not get geolocation');
    });
});



