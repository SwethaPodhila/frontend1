import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ import Link
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend1-4va2.onrender.com/user/login", form);
     // alert(res.data.msg);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-primary w-100">Login</button>
        </form>

        {/* 👇 Added register link */}
        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;