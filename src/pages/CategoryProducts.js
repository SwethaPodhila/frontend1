import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Fetch products of that category
        const res = await axios.get(`https://backend1-4va2.onrender.com/products/category/${id}`);
        setProducts(res.data);

        // ✅ Optional: Fetch category name for banner
        const catRes = await axios.get(`https://backend1-4va2.onrender.com/categories/${id}`);
        setCategoryName(catRes.data.name);
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <>
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🖼️ Banner Section */}
      <section
        className="category-banner text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "250px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://thumbs.dreamstime.com/b/supermarket-aisle-colorful-packaged-food-products-shelves-filled-neatly-arranged-showcasing-variety-grocery-items-368045784.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="fw-bold display-5">
            {categoryName ? categoryName : "Category"}
          </h1>
          <p className="lead">Explore all products in this category</p>
        </div>
      </section>

      {/* 🛍️ Products Section */}
      <section className="container py-5">
        <h3 className="fw-bold text-primary mb-4 text-center">Category Products</h3>

        <div className="row">
          {products.length === 0 ? (
            <p className="text-center text-muted">No products found for this category.</p>
          ) : (
            products.map((product) => (
              <div className="col-md-3 mb-4" key={product._id}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-card">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{product.name}</h5>
                    <p className="text-muted mb-2">₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 👣 Footer */}
      <Footer />

      {/* 🧾 Extra Styles */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }
          .category-banner {
            position: relative;
          }
          .category-banner h1 {
            color: #fff;
          }
        `}
      </style>
    </>
  );
}

export default CategoryProducts;
