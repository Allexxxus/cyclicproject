const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}/wss`);
});

const wss = new WebSocket.Server({ noServer: true });
let clickCount = 0;

wss.on('connection', (ws) => {
  ws.send(clickCount.toString()); 

  ws.on('message', (message) => {
    clickCount++;
    wss.clients.forEach((client) => {
      client.send(clickCount.toString()); 
    });
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use(express.static(path.join(__dirname, 'public')));