const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const rooms = {};
const testRoom = {
  '7888':
    [{ aaaaa: 's4A1B2ZDk-c96YtsAAAD' },
    { bbbb: 'rZe_Rdb8U_j-iwyTAAAE' }]
}
const rooms2 = { 9700: [{ Luke: 'yA33KLKnNAlG9EyHAAAD' }, { Bob: 'yA33KLKnNAlG9EyHAAAD' }] };

const locationsAndRoles = require('./locationAndRoles.json');

//const currentPlayers = rooms[data.id].map(el => Object.keys(el));

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (data) => {
    socket.join(data.id);
    //socket.roomID = data.id;
    rooms[data.id] = [{ [data.name]: socket.id }];
    console.log(`${data.name} has joined room "${data.id}".`)
    //console.log('ROOMS NOW: ', rooms);
    socket.emit('roomID', data.id);
    socket.emit('currentPlayers', {
      players: rooms[data.id].map(el => Object.keys(el)),
      roomID: data.id
    });
    console.log('ROOMS: ', rooms);

  });

  socket.on('join', (data) => {
    if (!rooms.hasOwnProperty(data.id)) {
      socket.emit('message', 'That game does not exist. Try again')
      console.log(`${data.id} doesn't exist!`);
      return;
    }
    socket.join(data.id);
    rooms[data.id] = [...rooms[data.id], { [data.name]: socket.id }];
    console.log(`${data.name} has joined room "${data.id}".`);
    socket.emit('roomID', data.id);
    io.sockets.emit('currentPlayers', {
      players: rooms[data.id].map(el => Object.keys(el)),
      roomID: data.id
    });

  });

  socket.on('startGameReq', (roomID) => {
    // On start game request, emit start game signal to all users in room
    io.sockets.in(roomID).emit('startGameRes', roomID);
    // Send list of players to all players
    io.sockets.in(roomID).emit('currentPlayers', {
      players: rooms[roomID].map(el => Object.keys(el)),
      roomID: roomID
    });
    // Grab users in room and shuffle their order
    const shuffledPlayers = shufflePlayers(roomID);
    // Get a random location, its roles, and spy
    const newLocationAndRoles = getRandomLocationAndRoles();
    // For each shuffled player, send an object containing role and location
    for (let i = 0; i < shuffledPlayers.length; i++) {
      io.to((Object.values(shuffledPlayers[i])).toString()).emit('roleAndLocation', newLocationAndRoles[i]);
    }
    // Emit time left to all players in room
    let timeRemaining = 480; // 8 minutes
    setInterval(() => {
      io.sockets.in(roomID).emit('beginCountdown', {timeRemaining: timeRemaining});
        if (timeRemaining === 0) return;
        timeRemaining -= 1;
    }, 1000);
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

  // Contruct an array to return containing roles and location
  const rolesAndLocation = [{ role: 'Spy', location: '???' }];
  for (let i = 1; i < roles.length; i++) {
    rolesAndLocation.push({ role: roles[i], location: randomLocation });
  }
  return rolesAndLocation;
}


// Get players from room and shuffle their order
function shufflePlayers (roomID) {
  const players = rooms[roomID];
  console.log('Players: ', players)
  const shufflePlayers = (players) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    return players;
  }
  return shufflePlayers([...players]);
}


