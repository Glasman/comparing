import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleItem() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getItem() {
      try {
        const {data: foundItem} = await axios.get(`/api/items/${id}`);
        setItem(foundItem);
      } catch (error) {
        console.error(error);
      }
    }
    getItem();
  }, []);

if (!item.id) {
  return <div>Loading...</div>
}

  return (
    <div>
      <div style={{ border: "2px solid black" }}>
        <h2>{item.name}</h2>
        <img src={item.image_url} />
        <h3>{item.description}</h3>
      </div>
    </div>
  );
}

export default SingleItem;
