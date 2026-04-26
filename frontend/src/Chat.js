import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("loadMessages", (data) => {
      setMessages(data);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!text) return;

    socket.emit("sendMessage", {
      user: user,
      text: text,
    });

    setText("");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "25%", background: "#333", color: "white", padding: 10 }}>
        <h3>Users</h3>
        <p>{user}</p>
      </div>

      {/* Chat */}
      <div style={{ width: "75%", display: "flex", flexDirection: "column" }}>

        {/* Messages */}
        <div style={{ flex: 1, padding: 10, overflowY: "auto", background: "#f1f1f1" }}>
          {messages.map((msg) => (
            <div key={msg.id}>
              <b>{msg.user}:</b> {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: "flex", padding: 10 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1, padding: 8 }}
            placeholder="Type message..."
          />
          <button onClick={sendMessage} style={{ marginLeft: 10 }}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;