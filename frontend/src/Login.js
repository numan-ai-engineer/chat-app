import React, { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return;
    setUser(name);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Enter Your Name</h2>

        <input
          type="text"
          placeholder="Your name..."
          className="border p-2 w-full mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
}

export default Login;