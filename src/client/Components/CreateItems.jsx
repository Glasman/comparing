import React, { useState } from "react";

function ItemForm({
  name,
  imageLink,
  description,
  onNameChange,
  onImageLinkChange,
  onDescriptionChange,
}) {
  return (
    <div className="box">
      <label>Item name</label>
      <input value={name} className="form-field" onChange={onNameChange} />
      <label>Image link</label>
      <input
        value={imageLink}
        className="form-field"
        onChange={onImageLinkChange}
      />
      <label>Description</label>
      <textarea
        className="form-field"
        placeholder="You may resize this box for legibility."
        value={description}
        onChange={onDescriptionChange}
      />
    </div>
  );
}

function CreateItems() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageLinkChange = (e) => setImageLink(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  //handlesubmit function that has yet to be written needs to be pased in abelow
  console.log(name, imageLink, description, category);
  return (
    <>
      <div className="box">
        <h2>Add your own items to compare!</h2>
        <div className="box">
          <label>Category</label>
          <input
            value={category}
            className="form-field"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <ItemForm
            name={name}
            imageLink={imageLink}
            description={description}
            onNameChange={handleNameChange}
            onImageLinkChange={handleImageLinkChange}
            onDescriptionChange={handleDescriptionChange}
          />
          {/* pass handlesubmit function above*/}
        </div>
      </div>
    </>
  );
}

export default CreateItems;
