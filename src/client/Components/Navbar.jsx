import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">
        <button>All Items</button>
      </Link>
      
      <button
        onClick={() => {
          console.log("clicked log in");
        }}
      >
        Log in
      </button>
    </div>
  );
}

export default Navbar;
