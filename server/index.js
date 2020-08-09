const express = require('express');
const expressWs = require('express-ws');
const uuidv4 = require('uuid/v4');

const PORT = process.env.PORT || 8080;
const app = express();

expressWs(app);

const connections = {};

const wsHandler = (ws, req) => {
  const roomId = req.params.token;
  ws.id = uuidv4();

  if (!connections[roomId]) {
    connections[roomId] = [ws];
  } else {
    connections[roomId].push(ws);
  }

  ws.on('message', (message) => {
    console.log('WS received:', message, roomId);
    connections[roomId].forEach((conn) => conn.send(message));
  });

  ws.on('close', () => {
    const wsIdx = connections[roomId].findIndex(clients => clients.id === ws.id);

    connections[roomId].splice(wsIdx, 1);

    if (connections[roomId].length === 0) {
      delete connections[roomId];
    }
  });
}

app.ws('/chat/:token', wsHandler)

app.use(express.static('build'));

app.listen(PORT);