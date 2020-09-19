const uuidv4 = require('uuid/v4');
const config = require('./config').default;
const host = config.NODE_ENV === 'production' ? window.location.host : 'localhost';
const PORT = config.PORT || 8080

export let send;

let onMessageCallback;
let token;

export const startWebsocketConnection = (id) => {
  token = id ? id : uuidv4();
  const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
  const wsEndpoint = `${socketProtocol}//${host}/chat/${token}`;

  const ws = new window.WebSocket(wsEndpoint) || {};

  ws.onopen = () => {
    console.log('opened ws connection:', ws.id);
  }

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  }

  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  }

  send = ws.send.bind(ws);
};

export const registerOnMessageCallback = (func) => {
  onMessageCallback = func;
};

export const getToken = () => {
  return token;
}