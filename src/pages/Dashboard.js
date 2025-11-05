import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories/all");
      console.log("Categories Response:", res.data);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products/all");
      console.log("Products API Response:", res.data); // 🔍 check once
      const data = res.data.products || res.data || [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]); // to prevent crash
    }
  };


  const navigate = useNavigate();
  return (
    <>
      <DashboardNavbar />

      <div className="w-100">
        <section
          className="banner-section"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-vector/super-market-promotional-banner-design_987701-5360.jpg?semt=ais_hybrid&w=740&q=80')",
          }}
        ></section>
      </div>


      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary">Popular Categories</h3>
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => navigate("/category")}
          >
            <FaPlus className="me-2" /> Create Category
          </button>
        </div>

        <div className="category-slider d-flex overflow-auto gap-4 pb-3">
          {categories.length === 0 ? (
            <p className="text-center text-muted">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden hover-card"
                key={cat._id}
                style={{
                  minWidth: "200px",
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                }} onClick={() => navigate(`/category/${cat._id}`)}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{cat.name}</h5>
                </div>
              </div>
            ))
          )}
        </div>

        <style>
          {`
      .category-slider {
        scroll-snap-type: x mandatory;
        scrollbar-width: thin;
        scrollbar-color: #007bff #e9ecef;
      }

      .category-slider::-webkit-scrollbar {
        height: 8px;
      }

      .category-slider::-webkit-scrollbar-thumb {
        background-color: #007bff;
        border-radius: 10px;
      }

      .hover-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }
    `}
        </style>
      </section>

      <section className="container py-5">
        {/* 🔹 Header Row */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h3 className="fw-bold text-primary mb-0">All Products</h3>
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => navigate("/products")}
          >
            <FaPlus className="me-2" /> Create Product
          </button>
        </div>

        {/* 🔍 Filters Row */}
        <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
          <input
            type="text"
            className="form-control rounded-pill px-3"
            placeholder="Search by name or category..."
            style={{ width: "250px" }}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />

          <select
            className="form-select rounded-pill px-3"
            style={{ width: "180px" }}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="100">Under ₹100</option>
            <option value="200">Under ₹200</option>
            <option value="300">Under ₹300</option>
            <option value="400">Under ₹400</option>
          </select>
        </div>

        {/* 🧠 Filtered Products Logic */}
        {(() => {
          const filtered = products.filter((product) => {
            const matchesSearch =
              product.name.toLowerCase().includes(searchTerm || "") ||
              product.categoryName.toLowerCase().includes(searchTerm || "");
            const matchesPrice =
              !priceFilter || product.price <= Number(priceFilter);
            return matchesSearch && matchesPrice;
          });

          return (
            <div className="row">
              {filtered.length === 0 ? (
                <p className="text-center text-muted">No products found.</p>
              ) : (
                filtered.map((product) => (
                  <div className="col-md-3 mb-4" key={product._id}>
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-card h-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="card-img-top"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="fw-bold text-dark">{product.name}</h5>
                        <p className="text-muted small mb-1">
                          {product.categoryName}
                        </p>
                        <p className="fw-semibold text-success mb-3">
                          ₹{product.price}
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="btn btn-outline-success btn-sm rounded-pill px-3"
                            onClick={() =>
                              alert("This functionality not implemented yet...")
                            }
                          >
                            Cart
                          </button>
                          <button
                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                            onClick={() =>
                              alert("🔍This functionality not implemented yet...")
                            }
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })()}

        <style>
          {`
      .hover-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }

      input.form-control, select.form-select {
        border: 1px solid #dee2e6;
        box-shadow: none;
      }

      input.form-control:focus, select.form-select:focus {
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0,123,255,0.25);
      }
    `}
        </style>
      </section>


      <Footer />

      <style>
        {`
          .hover-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }
          .banner-section {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            border-radius: 0 0 40px 40px;
          }
        `}
      </style>
    </>
  );
}

export default Dashboard;
