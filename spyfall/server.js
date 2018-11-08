const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'dist')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/spyfall-client/index.html'))
// })

// -----------------------------------------------

const server = http.createServer(app);
const io = socketIO(server);
const rooms = {};

// const test = {
//   '2776': ['Leo', 'Luke', ''],

// }

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (data) => {
    socket.join(data.id);
    rooms[data.id] = [data.name];
    console.log(`${data.name} has joined room "${data.id}".`)
    console.log('ROOMS NOW: ', rooms);
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
  })

  socket.on('disconnect', () => {
    console.log('Connection ended');
  });
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);

})