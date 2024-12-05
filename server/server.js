/* eslint-disable @typescript-eslint/no-require-imports */
const WebSocket = require("ws");
const dgram = require("dgram");
const http = require("http");

const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });

let currentScreen = 0;
const screens = ["Screen 1", "Screen 2", "Screen 3", "Screen 4"];

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send initial screen
  ws.send(
    JSON.stringify({ type: "CHANGE_SCREEN", screen: screens[currentScreen] })
  );

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "CHANGE_SCREEN") {
      currentScreen = (currentScreen + 1) % screens.length;
      broadcastScreen();
    }
  });
});

function broadcastScreen() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "CHANGE_SCREEN",
          screen: screens[currentScreen],
        })
      );
    }
  });
}

// UDP Server
const udpServer = dgram.createSocket("udp4");

udpServer.on("message", (msg) => {
  console.log("UDP message received");
  currentScreen = (currentScreen + 1) % screens.length;
  broadcastScreen();
});

udpServer.bind(5000);

httpServer.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
