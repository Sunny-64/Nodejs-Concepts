const express = require("express");
const app = express();

const {Server} = require("socket.io");
const http = require("http");
const httpServer = http.createServer(app);
const socket = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");
app.use(cors());

let messages = []; 

app.get("/", (req, res) => {
  res.json({ status: 200, success: true, message: "Home Route" });
});

socket.on("connection", (s) => {

    s.on("msg", (data) => {
        messages.push(data);

        socket.emit("getMessages",messages);

    })
    s.on("disconnect", () => {
      console.log("Disconnected: ", s.id);
    });
});

httpServer.listen(3000, () => {
  console.log("SERVER RUNNING AT PORT 3000");
});
