// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
  console.log('🔌 Новое подключение');
  clients.push(ws);

  ws.on('message', (message) => {
    console.log('📨 Сообщение:', message.toString());

    // Рассылаем всем, кроме отправителя
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
    console.log('❎ Отключение клиента');
  });
});

console.log('📡 WebSocket сервер запущен на ws://localhost:8080');