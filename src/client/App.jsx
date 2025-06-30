import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllItems from "./Components/AllItems";
import SingleItem from "./Components/SingleItem";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AllApprovedItems from "./Components/AllApprovedItems";
import CreateItems from "./Components/CreateItems";
import AdminApprove from "./Components/AdminApprove";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      // return;
      console.log("no token");
    }
    async function getMe() {
      try {
        const { data } = await axios.get("/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("data", data);
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    }
    getMe();
    // }, [user]);
  }, [user]);

  return (
    <div className="App">
      <Navbar user={user} />
      {/* will need to replace with extended if/else for admin view */}
      {user === "loggedIn" ? (
        <Routes>
          <Route path="/" element={<AllItems />} />
          <Route path="/approved" element={<AllApprovedItems />} />
          <Route path="/unapproved" element={<AdminApprove />} />
          <Route path="/:id" element={<SingleItem />} />
          <Route path="/createItems" element={<CreateItems />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AllItems />} />
          <Route path="/approved" element={<AllApprovedItems />} />
          <Route path="/unapproved" element={<AdminApprove />} />
          <Route path="/:id" element={<SingleItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
