import React from 'react';
import ReactDOM from 'react-dom';
import { startWebsocketConnection, getToken } from './websocket';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const queryString = window.location.search;
const existingToken = new URLSearchParams(queryString).get('room');
startWebsocketConnection(existingToken);

const token = existingToken || getToken();

ReactDOM.render(
  <React.StrictMode>
    <App token={token}/>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
