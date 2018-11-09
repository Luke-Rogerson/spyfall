const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const rooms = {};

const locationsAndRoles = require('./locationAndRoles.json');

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (data) => {
    socket.join(data.id);
    console.log('DATA: ',JSON.stringify(data));

    //socket.roomID = data.id;
    rooms[data.id] = [data.name];
    console.log(`${data.name} has joined room "${data.id}".`)
    socket.emit('roomID', data.id);
    socket.emit('currentPlayers', { players: rooms[data.id], roomID: data.id });
  });

  socket.on('join', (data) => {
    if (!rooms.hasOwnProperty(data.id)) {
      socket.emit('message', 'That game does not exist. Try again')
      console.log(`${data.id} doesn't exist!`);
      return;
    }
    socket.join(data.id);
    rooms[data.id] = [...rooms[data.id], data.name];
    console.log(`${data.name} has joined room "${data.id}".`);
    //console.log('ROOMS NOW: ', rooms);
    socket.emit('roomID', data.id);
    io.sockets.emit('currentPlayers', { players: rooms[data.id], roomID: data.id });
    console.log('ROOMID: ', socket.rooms);

  });

  socket.on('startGameReq', (roomID) => {
    //io.sockets.emit('startGameRes', roomID )
    io.sockets.in(roomID).emit('startGameRes', roomID);
  })

  socket.on('disconnect', () => {
   // delete rooms.roo
    console.log('Connection ended');
  });
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);

})


chooseRandomLocation = () => {

}

/*
Game logic:
--------------------------------------------------------
1. Choose random location and store in variable
2. Get all players from that room and store in variable
3. Shuffle players into random order
4. Grab roles using location value as key and store in varibable
5. Add spy to front of role list
6. For each player in shuffled list, emit a {role} to them
{isSpy: false, location: The Beach, role: Ice Cream Seller}
--------------------------------------------------------
*/