import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllItems() {
  const [items, setItems] = useState([]);
  console.log("items", items);
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
      {items.map((item) => (
        <div key={item.id} style={{ border: "2px solid black" }}>
          <Link to={`/${item.id}`}>
            <h2>Name: {item.name}</h2>
            <img src={item.image_url} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AllItems;
