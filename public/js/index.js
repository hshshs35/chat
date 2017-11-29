var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'huangsha',
        text: 'hello world'
    });

});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', (message)=>{
    console.log('newMessage', message);
});