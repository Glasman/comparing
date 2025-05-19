import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleItem() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getItem() {
      try {
        const foundItem = await axios.get(`/api/items/${id}`);
        setItem(foundItem.data);
      } catch (error) {
        console.error(error);
      }
    }
    getItem();
  });
  return (
    <div>
      <div style={{ border: "2px solid black" }}>
        <h2>Name: {item.name}</h2>
        <img src={item.image_url} />
        <h3>Description: {item.description}</h3>
      </div>
    </div>
  );
}

export default SingleItem;
