import React, { useState } from "react";

function Login() {
  const { username, setUsername } = useState();
  const { password, setPassword } = useState();
  return (
    <div>
      <div>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </div>
  );
}

export default Login;
