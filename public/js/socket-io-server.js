var express = require('express')();
var server = require('http').Server(express);
var io = require('socket.io')(server);
require('dotenv').config({path: '../laravel/.env'});


io.on('authenticated', function (socket) {
  console.log(socket.decoded_token);
  socket.emit('name', socket.decoded_token.name);
  socket.emit('email', socket.decoded_token.email);
});

io.on('connection', function (socket) {

  console.log("new client connected");

  socket.on('chat-message', function (data) {
    
    var res = data;

    console.log('chat-message', JSON.stringify(res));

    io.emit('chat-message', res);

  });


  socket.on('user-join', function(data) {

    var res = data;

    console.log('user-join', res);

    io.emit('user-join', res);
  });

  socket.on('disconnect', function(data) {

    console.log('disconnect');
    
    io.emit('user-unjoin', 'one user');
  });

});

server.listen(9090, function () {

  console.log('socket.io server listen at 9090');

});