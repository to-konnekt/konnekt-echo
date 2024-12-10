import WebSocket, { WebSocketServer } from "ws";
import dgram from "dgram";
import http from "http";
import osc from "osc";
import {
  SCREENS,
  WS_PORT,
  MESSAGE_TYPE,
  UDP_PORT,
  SERVER_IP,
} from "../shared/constants.js";

const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });

let currentScreen = SCREENS[0].id;

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    JSON.stringify({
      type: MESSAGE_TYPE.CHANGE_SCREEN,
      payload: currentScreen,
    })
  );

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === MESSAGE_TYPE.CHANGE_SCREEN) {
      currentScreen = data.payload;
      broadcastScreen();
    }
  });
});

function broadcastScreen() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: MESSAGE_TYPE.CHANGE_SCREEN,
          payload: currentScreen,
        })
      );
    }
  });
}

// UDP Server
const udpServer = dgram.createSocket("udp4");

const ARGS_SCREEN_MAP = {
  'A': 'screen1',
  'B': 'screen2',
  'C': 'screen3',
  'D': 'screen4'
}

udpServer.on("message", (msgBuffer, remoteInfo) => {
  try {
    console.log(`From ${remoteInfo.address}:${remoteInfo.port}`);
    const msg = osc.readMessage(msgBuffer);

    currentScreen = ARGS_SCREEN_MAP[msg.args];

    console.log('OSC Message: ', msg);
    if (currentScreen) {
      broadcastScreen();
    }
} catch (error) {
    console.error('Error decoding OSC message: ', error);
} 
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

// Handle server error event
udpServer.on('error', (err) => {
  console.log(`UDP Server error: ${err}`);
  udpServer.close();
});

udpServer.bind(UDP_PORT, SERVER_IP);

httpServer.listen(WS_PORT, () => {
  console.log(`Server is running on http://localhost:${WS_PORT}`);
});
