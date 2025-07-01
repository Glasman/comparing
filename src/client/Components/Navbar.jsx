import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("TOKEN");
    setToken("");
    navigate("/");
  }
  if (user === "loggedIn") {
    return (
      <div>
        <Link to="/">
          <button>All Items</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  } else if (user === "notLoggedIn") {
    return (
      <div>
        <Link to="/">
          <button>All Items</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
        <Link to="/approved">
          <button>Approved Items</button>
        </Link>
      </div>
    );
  }
}

export default Navbar;

/*} <Link to="/">
        <button>All Items</button>
      </Link>
      <Link to="/login">
        <button>Log in</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/approved">
        <button>Approved Items</button>
      </Link>
      <Link to="/unapproved">
        <button>Unapproved Items (Admins only!)</button>
      </Link>
      <Link to="/createItems">
        <button>Add Items</button>
      </Link> */
