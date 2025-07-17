import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("TOKEN");
    setToken(null);
    navigate("/");
  }

  return (
    <div>
      {user ? (
        <div>
          <Link to="/">
            <button>All Items</button>
          </Link>
          <Link to="/approved">
            <button>All Items By Category</button>
          </Link>
          <Link to="/createItems">
            <button>Add Items</button>
          </Link>
          {user.is_admin && (
            <Link to="/adminapproval">
              <button>Approve Items</button>
            </Link>
          )}

          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/">
            <button>All Items</button>
          </Link>
           <Link to="/approved">
            <button>All Items By Category</button>
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
      )}
    </div>
  );
}

export default Navbar;
