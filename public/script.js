const socket = new WebSocket('ws://localhost:3000/ws');

console.log('Сайт работает');

socket.addEventListener('open', (event) => {
  console.log('открыто WebSocket соединение:', event);
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});