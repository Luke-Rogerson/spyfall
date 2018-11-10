const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const rooms = {};
//const testRoom = { '9700': ['Luke', 'John', 'Barry', 'Sam'] };

const locationsAndRoles = require('./locationAndRoles.json');

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (data) => {
    socket.join(data.id);
    //socket.roomID = data.id;
    rooms[data.id] = [data.name];
    console.log(`${data.name} has joined room "${data.id}".`)
    console.log('ROOMS NOW: ', rooms);
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
    console.log('ROOMS NOW: ', rooms);
    socket.emit('roomID', data.id);
    io.sockets.emit('currentPlayers', { players: rooms[data.id], roomID: data.id });
    console.log('ROOMID: ', socket.rooms);

  });

  socket.on('startGameReq', (roomID) => {
    io.sockets.in(roomID).emit('startGameRes', roomID);
    io.sockets.in(roomID).emit('currentPlayers', { players: rooms[roomID], roomID: roomID });
  })

  socket.on('disconnect', () => {
    // delete rooms.roo
    console.log('Connection ended');
  });
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);

})

// -------------------------------------------------------
// Helper function to calculate roles and location
chooseRandomLocationAndAllocateRoles = (roomID) => {
  // Get random location and that location's roles, and add spy to roles
  const allLocations = Object.keys(locationsAndRoles[0]);
  const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
  const roles = locationsAndRoles[0][randomLocation];
  roles.unshift('Spy');

  // Get all players in room and shuffle them
  const players = rooms[roomID];
  const shufflePlayers = (players) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    return players;
  }
  const shuffledPlayers = shufflePlayers([...players])

  // Make an object to send back containing player name, role and location
  const returnObject = [{name: shuffledPlayers[0], role: 'Spy', location: '???'}];
  for (let i = 1; i < shuffledPlayers.length; i++) {
    returnObject.push({name : shuffledPlayers[i], role: roles[i], location: randomLocation});
  }
}
// -------------------------------------------------------
