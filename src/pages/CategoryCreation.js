import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CategoryPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // 🔑 Decode user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`https://backend1-4va2.onrender.com/categories/user/${user.email}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Categories fetched:", res.data.categories); // 👈 check this
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching user categories:", err);
    }
  };

  // ➕ Add / Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("userName", user?.name || user?.userName);
    formData.append("userEmail", user?.email);

    try {
      let res;
      if (editingId) {
        res = await axios.put(
          `https://backend1-4va2.onrender.com/categories/update/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        res = await axios.post("https://backend1-4va2.onrender.com/categories/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      alert(res.data.msg || "Success");
      setName("");
      setImage(null);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Error saving category");
    }
  };

  // 🗑️ Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await axios.delete(`https://backend1-4va2.onrender.com/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(res.data.msg);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Edit category
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id); // ✅ use _id instead of id
  };

  return (
    <>
    <Navbar />
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4 mb-4">
          <h3 className="text-center mb-3 text-primary fw-bold">
            {editingId ? "Update Category" : "Add Category"}
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="btn btn-success w-100 fw-bold">
              {editingId ? "Update" : "Create"} Category
            </button>
          </form>
        </div>

        {/* 🗂️ Category List */}
        <h3 className="text-center fw-bold mb-4 text-primary">
          My Categories
        </h3>
        <div className="row">
          {categories.length === 0 ? (
            <p className="text-center text-muted">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <div
                className="col-md-3 mb-4"
                key={cat._id} // ✅ use _id instead of id
                style={{ transition: "all 0.3s" }}
              >
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-secondary">{cat.name}</h5>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(cat)} // ✅ ok
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(cat._id)} // ✅ fix here
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
