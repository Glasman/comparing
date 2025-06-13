import React, { useState } from "react";
import axios from "axios";

function CreateItems() {
  const [category, setCategory] = useState("");
  const [entries, setEntries] = useState([{ name: "", imageURL: "", description: "" }]);

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, {name: "", imageURL: "", description: ""}])
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(entries);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-field"
          required
        />

        {entries.map((entry, index) => (
          <div key={index} className="box">
            <label>Item Name:</label>
            <input
              placeholder="Item name"
              value={entry.name}
              onChange={(e) => {
                handleEntryChange(index, "name", e.target.value);
              }}
              required
            />
            <label>Image Link:</label>
            <input
              placeholder="Image URL"
              required
              value={entry.imageUrl}
              onChange={(e) => {
                handleEntryChange(index, "imageURL", e.target.value);
              }}
            />
            <label>Description:</label>
            <textarea
              placeholder="Be as descriptive as you'd like!"
              required
              value={entry.description}
              onChange={(e) => {
                handleEntryChange(index, "description", e.target.value);
              }}
            />
          </div>
        ))}
        <button type="button" onClick={addEntry}>Add another entry</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateItems;
