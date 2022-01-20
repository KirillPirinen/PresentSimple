/* eslint-disable comma-dangle */
const { createServer } = require('http');
const WebSocket = require('ws');
const {app, sessionParser} = require('./app.js')
const PORT = process.env.SERVER_PORT

const server = createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const map = new Map();

server.on('upgrade', (request, socket, head) => {

  sessionParser(request, {}, () => {
    if (!request.session.user.id) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { id, name, lname } = request.session.user;

  map.set(id, ws);
  ws.on('message', async (message) => {

    const parsed = JSON.parse(message);

    switch (parsed.type) {
      case 'NEW_MESSAGE':
        console.log('message on back', parsed);
        // let userId = await User.findOne()
        map.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: { id, name: `${name} ${lname}`, text: parsed.payload },
              })
            );
          }
        });
        break;
      case 'CHAT_CONNECT':
        map.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: userName,
              })
            );
          }
        });
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    map.delete(id);
  });
});

server.listen(PORT, () => console.log(`Server has been started ${PORT}`));
