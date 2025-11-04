import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";

function DashboardNavbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 fixed-top"
        style={{
          zIndex: 1030,
          borderBottom: "2px solid #e9ecef",
        }}
      >
        <div className="container-fluid">
          {/* Left: Logo */}
          <a className="navbar-brand fw-bold text-primary fs-4" href="/">
            🛒 MyShop
          </a>

          {/* Right: User Dropdown */}
          <div className="dropdown ms-auto position-relative">
            <button
              className="btn btn-outline-primary rounded-pill d-flex align-items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle size={22} />
              <span>{user ? user.name : "User"}</span>
            </button>

            {showDropdown && (
              <div
                className="dropdown-menu dropdown-menu-end show mt-2 shadow-sm rounded-3 p-2"
                style={{ right: 0, minWidth: "200px" }}
              >
                <div className="px-3 py-2 text-center border-bottom">
                  <strong>{user?.name}</strong>
                  <div className="text-muted small">{user?.email}</div>
                </div>
                <button
                  className="dropdown-item text-danger fw-semibold text-center mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            body {
              padding-top: 70px; /* To avoid content hiding behind navbar */
            }
            .dropdown-menu {
              animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </nav>
    </>
  );
}

export default DashboardNavbar;
