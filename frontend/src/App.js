import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5001/login"
      : "http://localhost:5001/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "Create account" : "Already have account?"}
      </p>
    </div>
  );
}

export default App;