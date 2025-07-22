import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AllItemsInCategory() {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data: foundItems } = await axios.get(
          `/api/items/category/${category}`
        );
        console.log("found items before setItems:", foundItems);
        setItems(foundItems);
        console.log(items);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, [category]);

  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ border: "2px solid black", width: "500px" }}
        >
          <h2>{item.name}</h2>
          <img src={item.image_url} />
        </div>
      ))}
    </div>
  );
}

export default AllItemsInCategory;
