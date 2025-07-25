import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AllItemsInCategory() {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data: foundItems } = await axios.get(
          `/api/items/category/${category}`
        );
        setItems(foundItems);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, [category]);

  return (
    <div>
      <h2>{items[0]?.category_description}</h2>
      {items.map((item) => (
        <Link to={`/item/${item.id}`}>
          <div
            key={item.id}
            style={{ border: "2px solid black", width: "500px" }}
          >
            <h2>{item.name}</h2>
            <img src={item.image_url} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllItemsInCategory;
