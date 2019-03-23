const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('red', function(data) {
        console.log('red event heard');
        socketIO.sockets.emit('remove-component');
    });

    socket.on('green', function(data) {
        console.log('green event heard');
        socketIO.sockets.emit('color_change', {r:152, g:238, b:144});
    });

    socket.on('green2', function(data) {
        console.log('green2 event heard');
        socketIO.sockets.emit('color_change2');
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);