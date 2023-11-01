const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  const interval = setInterval(() => {
    ws.send('Сообщение с бекенда');
  }, 2000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use(express.static(path.join(__dirname, 'public')));