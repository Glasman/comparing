import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/createUser", {
        username,
        password
      });
      const responseJson = await response.json();
      console.log("User being created");
      console.log(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/getUser", {
        username,
        password
      });
      const responseJson = await response.json();
      console.log("User being checked");
      console.log(responseJson);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <h1>Comparing Things</h1>
      <>
        {/* <form onSubmit={createUser}> */}
        <form>
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
          <button onClick={createUser}>Create User</button>
          <button onClick={getUser}>Login</button>
        </form>
      </>
    </>
  );
}

export default App;
