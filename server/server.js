import WebSocket, { WebSocketServer } from "ws";
import dgram from "dgram";
import http from "http";
import {
  SCREENS,
  WS_PORT,
  MESSAGE_TYPE,
  UDP_PORT,
  UDP_HOST,
  TEST_SERVER_OUT_HOST,
  TEST_SERVER_OUT_PORT,
  SCREENS_TRANSITIONS,
  TEST_SERVER_IN_HOST,
  TEST_SERVER_IN_PORT
} from "../shared/constants.js";

const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });
const udpServer = dgram.createSocket("udp4");
udpServer.bind(UDP_PORT, UDP_HOST);

let currentScreen = SCREENS[0].id;
let currentParams = {};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    JSON.stringify({
      type: MESSAGE_TYPE.CHANGE_SCREEN,
      payload: {currentScreen, currentParams},
    })
  );

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === MESSAGE_TYPE.CHANGE_SCREEN) {
      currentScreen = SCREENS_TRANSITIONS[data.payload.currentScreenId];
      currentParams = {};

      const messageString = currentScreen;
      const message = Buffer.from(messageString);
      udpServer.send(message, TEST_SERVER_IN_PORT, TEST_SERVER_IN_HOST, (err) => {
          if (err) {
              console.error('Error sending response:', err);
          } else {
              console.log(`Message "${messageString}" sent to client ${UDP_HOST}:${UDP_PORT}`);
          }
      })

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
          payload: {currentScreen, currentParams: currentParams},
        })
      );
    }
  });
}

udpServer.on("message", ((msg, rinfo) => {
  if (rinfo.address === TEST_SERVER_OUT_HOST && rinfo.port === TEST_SERVER_OUT_PORT && currentScreen === SCREENS[0].id) {
    const msgStr = msg.toString();
    console.log(`Server received: ${msgStr} from ${rinfo.address}:${rinfo.port}`);
    const [neiryParam1, neiryParam2] = msgStr.split(' ');
    currentScreen = SCREENS_TRANSITIONS['idle'];
    currentParams = {
      neiryParam1,
      neiryParam2
    }

    broadcastScreen();
  }
}));


httpServer.listen(WS_PORT, () => {
  console.log(`Server is running on http://localhost:${WS_PORT}`);
});
