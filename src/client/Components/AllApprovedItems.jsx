import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllApprovedItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [grouped, setGrouped] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

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

        const groups = {};
        for (let item of foundItems) {
          const key = item.category.toLowerCase();
          if (!groups[key]) groups[key] = [];
          groups[key].push(item);
        }

        setGrouped(groups);
        setItems(foundItems);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);
  console.log("grouped:", grouped);
  return (
    <div>
      <h2>All Items!</h2>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {Object.entries(grouped).map(([category, items]) => {
        return (
          <div key={category}>
            <h1>{category}</h1>
            {items.map((item) => {
              <div key={item.id}>
                <p>{item.name}</p>
              </div>;
            })}
          </div>
        );
      })}

      {/* {search.length == 0
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
          ))} */}
    </div>
  );
}

export default AllApprovedItems;
