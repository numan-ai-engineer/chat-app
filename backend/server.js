const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// 🔥 MongoDB Local Connection
mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err.message));

// 🔥 User Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// 🔥 Message Model
const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
});
const Message = mongoose.model("Message", messageSchema);

// 🔥 Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 🔥 Real-time chat
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();

    io.emit("receiveMessage", data);
  });
});

// 🔥 GET all messages
app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// 🔥 REGISTER API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  res.json({ message: "User registered successfully" });
});

// 🔥 LOGIN API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  res.json({ message: "Login successful", user });
});

// 🔥 Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 Server Start
server.listen(5001, () => {
  console.log("Server running on port 5001");
});