const express = require('express');
const app = express();
//ask explanation tutor said http librari is incorporated by default in node
const http = require('http');
//cors prevents issues from io library
const cors = require('cors');
//import server fron socket io
const { Server } = require('socket.io');

app.use(cors());
//another way to create a server
const server = http.createServer(app);
//create anotehr instance of the connection, preguntar?
const io = new Server(server, {
    //setting up an origin for react
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
//iniates and detects if someone connects the id is random
io.on('connection', (socket) => {
    console.log(`user online: ${socket.id}`);
    //it recognizes the data i want to pass from the front end
    socket.on('joinChatSpace', (data) => {
        socket.join(data);
        console.log(`user ${socket.id} entered ${data} `);
    });
//creates send message event with the data from Chat.js
    socket.on('sendTextMessage', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log(`user offline: ${socket.id}`);
    });
});
server.listen(3001, () => {
    console.log("server running in port 3001");
});