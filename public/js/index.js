var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function(location){
        var template = $('#location-message-template').html();
    var formattedTime = moment(location.createdAt).format('h:mm a');

    var html = Mustache.render(template, {
        url: location.url,
        from: location.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
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
