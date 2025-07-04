import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllApprovedItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) => {
    return (
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data: foundItems } = await axios.get("/api/items/approved");
        setItems(foundItems);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);
  return (
    <div>
      <h2>All Items!</h2>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length == 0
        ? items.map((item) => (
            <div
              key={item.id}
              style={{ border: "2px solid black", width: "500px" }}
            >
              <Link to={`/item/${item.id}`}>
                <h2>Name: {item.name}</h2>
                <img src={item.image_url} />
              </Link>
            </div>
          ))
        : filtered.map((item) => (
            <div
              key={item.id}
              style={{ border: "2px solid black", width: "500px" }}
            >
              <Link to={`/item/${item.id}`}>
                <h2>Name: {item.name}</h2>
                <img src={item.image_url} />
              </Link>
            </div>
          ))}
    </div>
  );
}

export default AllApprovedItems;
