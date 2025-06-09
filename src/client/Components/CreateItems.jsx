import React, { useState } from "react";

function CreateItems() {
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="box">
      <h2>Add your own items to compare!</h2>
      <div className="box">
        <label>Item name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Image link</label>
        <input
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>Category</label>
        <input
          value={category}
          onChange={(e) => {
            setCategory(e.category.value);
          }}
        />
      </div>
    </div>
  );
}
export default CreateItems;
