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
  SCREENS_TRANSITIONS
} from "../shared/constants.js";

const httpServer = http.createServer();
const wss = new WebSocketServer({ server: httpServer });

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

  // ws.on("message", (message) => {
  //   const data = JSON.parse(message);
  //   if (data.type === MESSAGE_TYPE.CHANGE_SCREEN) {
  //     currentScreen = data.payload;
  //     broadcastScreen();
  //   }
  // });
});

function broadcastScreen() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: MESSAGE_TYPE.CHANGE_SCREEN,
          payload: {currentScreen, params: currentParams},
        })
      );
    }
  });
}

// UDP Server
const udpServer = dgram.createSocket("udp4");

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

udpServer.bind(UDP_PORT, UDP_HOST);

httpServer.listen(WS_PORT, () => {
  console.log(`Server is running on http://localhost:${WS_PORT}`);
});
