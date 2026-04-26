import React, { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [user, setUser] = useState("");

  return user ? <Chat user={user} /> : <Login setUser={setUser} />;
}

export default App;