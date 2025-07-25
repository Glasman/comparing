import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllApprovedItemsByCategory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [grouped, setGrouped] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

const filtered = items.filter((item) => {
    return (
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLocaleLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data: foundItems } = await axios.get("/api/items/approved");

        //goes through foundItems object and creates an object full of arrays
        //that are sorted by category
        //(key:value == category:[array full of objects that belong to that category])
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
  return (
    <div className="items-and-searchbar">
      <h2>All Items!</h2>
      <input
      className="search-bar"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="items-grid">
        {Object.entries(grouped).map(([category, items]) => {
          const representative = items[0];

          return (
            <div
              key={category}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                position: "relative",
                width: "400px",
                border: "2px solid black",
                padding: "10px",
              }}
            >
              <Link to={`/category/${representative.category}`}>
                <h3>{representative.category}</h3>
                <img
                  src={representative.image_url}
                  alt={representative.name}
                  style={{ width: "100%" }}
                />
              </Link>

              {hoveredCategory === category &&
                items.map((item, index) => {
                  const angle = (index / items.length) * 2 * Math.PI;
                  const radius = 70;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <Link to={`/item/${item.id}`}>
                    <img
                      key={item.id}
                      src={item.image_url}
                      alt={item.name}
                      className="item-circle-image"
                      style={{
                        top: `${150 + y}px`,
                        left: `${150 + x}px`,
                    
                      }}
                    />
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </div>
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

export default AllApprovedItemsByCategory;
