import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer text-white pt-5 pb-3 mt-2">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* 🏬 About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-uppercase">GroceryMarket</h5>
            <p className="text-light small">
              Your trusted platform to explore, buy, and manage all your favorite
              products with ease and style.
            </p>
          </div>

          {/* 🔗 Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/dashboard" className="footer-link">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/category" className="footer-link">
                  Categories
                </a>
              </li>
              <li>
                <a href="/products" className="footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* 📞 Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-uppercase">Contact Us</h5>
            <p className="mb-1 small">📧 support@myshop.com</p>
            <p className="mb-3 small">☎️ +91 7207374082</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-white fs-5 social-link">
                <FaFacebook />
              </a>
              <a href="#" className="text-white fs-5 social-link">
                <FaInstagram />
              </a>
              <a href="#" className="text-white fs-5 social-link">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white fs-5 social-link">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* ⚖️ Divider */}
        <hr className="border-light" />

        {/* 📄 Copyright */}
        <div className="text-center">
          <small>
            © {new Date().getFullYear()} <strong>MyShop</strong>. All Rights Reserved.
          </small>
        </div>
      </div>

      <style>
        {`
          .footer {
            background: linear-gradient(135deg, #007bff, #0056b3);
            border-radius: 40px 40px 0 0;
          }

          .footer-link {
            color: #e3f2fd;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-link:hover {
            color: #fff;
            text-decoration: underline;
          }

          .social-link {
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .social-link:hover {
            transform: scale(1.2);
            color: #ffd700;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
