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

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('create', (room) => {
    socket.join(room);
    console.log(`A user has joined room "${room}".`)
  })

  socket.on('disconnect', () => {
    console.log('Connection ended');
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);

})