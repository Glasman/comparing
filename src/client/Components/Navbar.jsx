import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  function handleLogout() {
    window.localStorage.removeItem("TOKEN");
  }
  return (
    <div>
      <Link to="/">
        <button>All Items</button>
      </Link>

      <Link to="/login">
        <button>Log in</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Navbar;
