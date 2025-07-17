import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllItems from "./Components/AllItems";
import SingleItem from "./Components/SingleItem";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AllApprovedItemsByCategory from "./Components/AllApprovedItemsByCategory";
import CreateItems from "./Components/CreateItems";
import AdminApprove from "./Components/AdminApprove";
import AllItemsInCategory from "./Components/AllItemsInCategory";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("TOKEN") || null
  );

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    console.log("TOKEN", token);
    if (!token) {
      setUser(null);
      return;
    }

    async function fetchUser() {
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
    fetchUser();
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} setToken={setToken} />
      {/* will need to replace with extended if/else for admin view */}
      {/* Ensure that users have navbar buttons that match up to their respective routes */}
      {user ? (
        <Routes>
          <Route path="/" element={<AllItems />} />
          {user?.is_admin && (
            <Route
              path="/adminapproval"
              element={<AdminApprove is_admin={user.is_admin} />}
            />
          )}
          <Route path="/approved" element={<AllApprovedItemsByCategory />} />
          <Route path="/createItems" element={<CreateItems />} />
          <Route path="/category/:category" element={<AllItemsInCategory />} />
          <Route path="/item/:id" element={<SingleItem />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AllItems />} />
          <Route path="/approved" element={<AllApprovedItemsByCategory />} />
          <Route path="/unapproved" element={<AdminApprove />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/category/:category" element={<AllItemsInCategory />} />
          <Route path="/item/:id" element={<SingleItem />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
