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
    async function getMe() {
      const { data } = await axios.get("/api/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      console.log("data", data)
      setUser(data.user)
      console.log(user)
    }
    getMe();
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/approved" element={<AllApprovedItems />} />
        <Route path="/unapproved" element={<AdminApprove />} />
        <Route path="/:id" element={<SingleItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItems" element={<CreateItems />} />
      </Routes>
    </div>
  );
}

export default App;
