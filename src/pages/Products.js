import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaEdit, FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Products() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
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
            fetchProducts();
        }
    }, [user]);

    // 🗂️ Fetch categories for dropdown
    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                `https://backend1-4va2.onrender.com/categories/user/${user.email}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    // 📦 Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                `https://backend1-4va2.onrender.com/products/user/${user.email}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            console.log("Products fetched:", res.data.products);
            setProducts(res.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    // ➕ Add / Update Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first!");

        const selectedCategory = categories.find((c) => c._id === categoryId);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("categoryId", categoryId);
        formData.append("categoryName", selectedCategory?.name || "");
        formData.append("userName", user?.name || user?.userName);
        formData.append("userEmail", user?.email);

        try {
            let res;
            if (editingId) {
                res = await axios.put(
                    `https://backend1-4va2.onrender.com/products/update/${editingId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
            } else {
                res = await axios.post("https://backend1-4va2.onrender.com/products/add", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            }

            alert(res.data.msg || "Success");
            setName("");
            setPrice("");
            setDescription("");
            setImage(null);
            setCategoryId("");
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Error saving product");
        }
    };

    // ✏️ Edit product
    const handleEdit = (product) => {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.categoryId);
        setEditingId(product._id);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    // 🗑️ Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await axios.delete(
                `https://backend1-4va2.onrender.com/products/delete/${id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert(res.data.msg);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                {/* 🧾 Add / Edit Product Form */}
                <div className="card shadow-lg p-4 rounded-4 mb-4">
                    <h3 className="text-center mb-3 text-primary fw-bold">
                        {editingId ? "Update Product" : "Add Product"}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Left column */}
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Product Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Right column */}
                            <div className="col-md-6">
                                <select
                                    className="form-control mb-3"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="file"
                                    className="form-control mb-3"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                        </div>

                        {/* Full width description at the bottom */}
                        <div className="row">
                            <div className="col-12">
                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Description"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <button className="btn btn-success w-100 fw-bold">
                            {editingId ? "Update" : "Create"} Product
                        </button>
                    </form>
                </div>

                <h3 className="text-center fw-bold mb-5 text-gradient">
                    My Products
                </h3>

                <div className="row justify-content-center">
                    {products.length === 0 ? (
                        <p className="text-center text-muted">No products found.</p>
                    ) : (
                        products.map((product) => (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                                key={product._id}
                                style={{ transition: "all 0.3s ease-in-out" }}
                            >
                                <div
                                    className="card h-100 border-0 shadow-lg rounded-4 position-relative overflow-hidden"
                                    style={{
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.03)";
                                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                                    }}
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="card-img-top"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                            borderTopLeftRadius: "16px",
                                            borderTopRightRadius: "16px",
                                        }}
                                    />

                                    <div className="card-body text-center p-3">
                                        <h5
                                            className="fw-bold mb-2"
                                            style={{
                                                background: "linear-gradient(90deg, #007bff, #00c6ff)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            {product.name}
                                        </h5>

                                        <p className="text-muted small mb-1">
                                            💰 <strong>{product.price} ₹</strong> | 🏷️ {product.categoryName}
                                        </p>

                                        <p
                                            className="small text-secondary mb-3"
                                            style={{
                                                height: "45px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {product.description}
                                        </p>

                                        <div className="d-flex justify-content-center gap-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <FaEdit className="me-1" /> Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <FaTrash className="me-1" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <style>
                    {`
.text-gradient {
  background: linear-gradient(90deg, #007bff, #44adcaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`}
                </style>
            </div >
            <Footer />
        </>
    );
}

export default Products;
