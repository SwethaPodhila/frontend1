import React, { useState } from "react";
import axios from "axios";

function CategoryCreation() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/categories/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.msg);
      setName("");
      setImage(null);
    } catch (err) {
      alert("Error uploading category");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4">Add Category</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn btn-success w-100">Create Category</button>
        </form>
      </div>
    </div>
  );
}

export default CategoryCreation;
