const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🧠 store messages in memory
let messages = [];

// 🔌 socket connection
io.on("connection", (socket) => {
  console.log("User connected");

  // send old messages
  socket.emit("loadMessages", messages);

  // receive message
  socket.on("sendMessage", (data) => {
    const newMsg = {
      id: Date.now(),
      user: data.user,
      text: data.text,
    };

    messages.push(newMsg);

    // broadcast to all users
    io.emit("receiveMessage", newMsg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});