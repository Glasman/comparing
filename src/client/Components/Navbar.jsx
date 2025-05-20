import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Link to="/">
        <button>All Items</button>
      </Link>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
