const WebSocket = require("ws");
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

const wss = new WebSocket.Server({ noServer: true });

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected");

  ws.on("close", () => {
    clients.delete(ws);
  });
});

app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);

  clients.forEach((ws) => {
    ws.send(JSON.stringify(req.body));
  });

  res.status(200).send("OK");
});
