import WebSocket, { WebSocketServer } from "ws";
import dgram from "dgram";
import http from "http";
import {
  SCREENS,
  WS_PORT,
  MESSAGE_TYPE,
  UDP_PORT,
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

udpServer.on("message", (msg) => {
  console.log("UDP message received");
  currentScreen = SCREENS[0].id;
  broadcastScreen();
});

udpServer.bind(UDP_PORT);

httpServer.listen(WS_PORT, () => {
  console.log(`Server is running on http://localhost:${WS_PORT}`);
});
