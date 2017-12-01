var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
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

        var messageTextbox = $('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function(){
            messageTextbox.val('')
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('geolocation is not supported by the browser');
    }

    locationButton.attr('disabled', 'disabled').text('finding out your location.....');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('show location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled');
        alert('can not get your location!');
    });
});
