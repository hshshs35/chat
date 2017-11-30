const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Shawn Huang \'s chatting room'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'a new user joined'));

    socket.on('createMessage', (message, callback) =>{
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
    });

    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});

server.listen(port, ()=>{
    console.log('server is up');
});

