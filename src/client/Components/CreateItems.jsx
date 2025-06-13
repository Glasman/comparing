import React, { useState } from "react";
import axios from "axios";

// function ItemForm({
//   name,
//   imageLink,
//   description,
//   onNameChange,
//   onImageLinkChange,
//   onDescriptionChange,
// }) {
//   return (
//     <div className="box">
//       <label>Item name</label>
//       <input value={name} className="form-field" onChange={onNameChange} />
//       <label>Image link</label>
//       <input
//         value={imageLink}
//         className="form-field"
//         onChange={onImageLinkChange}
//       />
//       <label>Description</label>
//       <textarea
//         className="form-field"
//         placeholder="You may resize this box for legibility."
//         value={description}
//         onChange={onDescriptionChange}
//       />
//     </div>
//   );
// }

// function CreateItems() {
//   const [category, setCategory] = useState("");
//   const [name, setName] = useState("");
//   const [imageLink, setImageLink] = useState("");
//   const [description, setDescription] = useState("");

//   const handleNameChange = (e) => setName(e.target.value);
//   const handleImageLinkChange = (e) => setImageLink(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);

//   //handlesubmit function that has yet to be written needs to be pased in abelow
//   console.log(name, imageLink, description, category);
//   return (
//     <>
//       <div className="box">
//         <h2>Add your own items to compare!</h2>
//         <div className="box">
//           <label>Category</label>
//           <input
//             value={category}
//             className="form-field"
//             onChange={(e) => {
//               setCategory(e.target.value);
//             }}
//           />
//           <ItemForm
//             name={name}
//             imageLink={imageLink}
//             description={description}
//             onNameChange={handleNameChange}
//             onImageLinkChange={handleImageLinkChange}
//             onDescriptionChange={handleDescriptionChange}
//           />
//           {/* pass handlesubmit function above*/}
//         </div>
//       </div>
//     </>
//   );
// }

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
