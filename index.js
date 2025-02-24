const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const { join } = require('path');
const { Socket } = require('dgram');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

// app.use(express.static('public'));
app.get('/', (req, res) => {
    // console.log(join(__dirname, 'public'))
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (message) => {
        // console.log(message)
        socket.broadcast.emit('message', message);
    })
})

server.listen('8000', () => {
    console.log("Server started at port: 5000")
})