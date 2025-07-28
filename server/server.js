const http = require('http');
const server = http.createServer(); // создаём обычный HTTP сервер

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
  console.log('🔌 Новое подключение');
  clients.push(ws);

  ws.on('message', (message) => {
    console.log('📨 Сообщение:', message.toString());

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

// Используем порт от Render или 8080 по умолчанию
const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`📡 WebSocket сервер запущен на ws://0.0.0.0:${PORT}`);
});
