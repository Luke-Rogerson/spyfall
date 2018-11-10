const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const rooms = {};
const testRoom = { '9700': ['Luke', 'John', 'Barry', 'Sam'] };

const locationsAndRoles = require('./locationAndRoles.json');

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (data) => {
    socket.join(data.id);
    //socket.roomID = data.id;
    rooms[data.id] = [data.name];
    console.log(`${data.name} has joined room "${data.id}".`)
    //console.log('ROOMS NOW: ', rooms);
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
    io.sockets.in(roomID).emit('startGameRes', roomID);
    io.sockets.in(roomID).emit('currentPlayers', { players: rooms[roomID], roomID: roomID });
    const shuffledPlayers = shufflePlayers(roomID);
    const newLocationAndRoles = getRandomLocationAndRoles();
    for (let i = 0; i < shuffledPlayers.length; i++) {
      io.to(`${shuffledPlayers[i]}`).emit('roleAndLocation', newLocationAndRoles[i]);
    }
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
function getRandomLocationAndRoles () {
  // Get random location and that location's roles, and add spy to roles
  const allLocations = Object.keys(locationsAndRoles[0]);
  const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
  const roles = locationsAndRoles[0][randomLocation];
  roles.unshift('Spy');

  // Contruct an array to return containing roles and location
  const rolesAndLocation = [{role: 'Spy', location: '???'}];
  for (let i = 1; i < roles.length; i++) {
    rolesAndLocation.push({role: roles[i], location: randomLocation});
  }
  return rolesAndLocation;
}


// Get players from room and shuffle their order
function shufflePlayers (roomID) {
  const players = rooms[roomID];
  const shufflePlayers = (players) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    return players;
  }
  return shufflePlayers([...players]);
}
