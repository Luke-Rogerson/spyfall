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
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('A user has left');
  })

})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);

})