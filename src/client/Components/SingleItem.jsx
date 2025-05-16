import React from "react";

function SingleItem() {
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
