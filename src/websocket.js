const uuidv4 = require('uuid/v4');
const config = require('./config').default;
const host = config.NODE_ENV === 'production' ? window.location.host : 'localhost:8080';

export let send;

let onMessageCallback;
let token;

export const startWebsocketConnection = (id) => {
  token = id ? id : uuidv4();
  let wsEndpoint = `ws://${host}/chat/${token}:8080`;
  if (config.NODE_ENV === 'production') wsEndpoint.replace('s', 'ss');

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