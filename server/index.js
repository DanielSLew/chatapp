const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 8080

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

expressWs(app);

const connections = {};

const wsHandler = async (ws, req) => {
  // try {
  //   await client.connect();

  //   await client.db('admin').command({ ping: 1 });
  //   const db = client.db('worldchat');
  //   console.log(db);
  //   const collection = db.collection('commits');
  //   console.log(collection);
  //   await db.insertOne({ name: 'test' });
  // } catch (e) {
  //   console.error(e);
  // } finally {
  //   await client.close();
  // }

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

const gitWebhookHandler = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('worldchat');
    const collection = db.collection('commits');
    await collection.insertOne(req.body);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    res.sendStatus(200);
  }
}


app.ws('/chat/:token', wsHandler);

app.post('/git-webhook', gitWebhookHandler);
app.use(express.static('build'));

app.listen(PORT);