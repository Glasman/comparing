import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const url = "/auth/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const token = await response.json();
      window.localStorage.setItem("TOKEN", token.token);
      setToken(token.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
