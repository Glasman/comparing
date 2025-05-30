import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">
        <button>All Items</button>
      </Link>

      <Link to="/login">
        <button>Log in</button>
      </Link>
    </div>
  );
}

export default Navbar;
