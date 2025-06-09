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
        <input
          value={name}
          className="form-field"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Image link</label>
        <input
          value={imageLink}
          className="form-field"
          onChange={(e) => setImageLink(e.target.value)}
        />
        <label>Description</label>
        <textarea
          className="form-field"
          placeholder="You may resize this box for legibility."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>Category</label>
        <input
          value={category}
          className="form-field"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
export default CreateItems;
