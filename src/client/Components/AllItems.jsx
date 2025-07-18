import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllItems() {
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
        const { data: foundItems } = await axios.get("/api/items");
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
      <div className="items-grid">
        {search.length == 0
          ? items.map((item) => (
              <div key={item.id} className="item-card">
                <Link to={`/item/${item.id}`}>
                  <h2>Name: {item.name}</h2>
                  <img src={item.image_url} />
                </Link>
              </div>
            ))
          : filtered.map((item) => (
              <div key={item.id} className="item-card">
                <Link to={`/item/${item.id}`}>
                  <h2>{item.name}</h2>
                  <img src={item.image_url} />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

export default AllItems;
