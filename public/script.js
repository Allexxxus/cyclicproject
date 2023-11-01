const socket = new WebSocket('ws://localhost:3000/ws');

console.log('Сайт работает');

let clickme = document.querySelector('#clickme');
let dynamicCounter = document.querySelector('#dynamicCounter');
let clickCount = 0;

socket.addEventListener('open', (event) => {
  console.log('открыто WebSocket соединение:', event);
});

socket.addEventListener('message', (event) => {
  console.log('Сообщение с бекенда:', event.data);
  clickCount = parseInt(event.data); 
  dynamicCounter.textContent = `${clickCount}`;
});

document.addEventListener('DOMContentLoaded', function() {
  clickme.addEventListener('click', function() {
    alert('clicked')
    socket.send('Clicked!');
  });
});