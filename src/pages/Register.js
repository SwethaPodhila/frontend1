import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");

  // 🧾 Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, phone } = form;

    // ✅ Simple frontend validations
    if (name.length < 3) return alert("Name must be at least 3 characters");
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert("Invalid email format");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Enter a valid 10-digit phone number");
    if (password.length < 6) return alert("Password must be at least 6 characters");

    try {
      const res = await axios.post("http://localhost:5000/user/register", form);
      alert(res.data.msg);

      if (res.data.success) {
        setVerifyEmail(form.email);
        setForm({ name: "", email: "", password: "", phone: "" });
        setOtpStep(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed. Please try again.");
    }
  };

  // 🔐 Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/verify-otp", {
        email: verifyEmail,
        otp,
      });
      alert(res.data.msg);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4">
          {otpStep ? "OTP Verification" : "Register"}
        </h3>

        {/* 🟢 Registration Step */}
        {!otpStep ? (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="btn btn-primary w-100">Register</button>
          </form>
        ) : (
          // 🟢 OTP Verification Step
          <form onSubmit={handleVerifyOtp}>
            <p className="text-muted mb-3">
              Please enter OTP has been sent to <strong>{verifyEmail}</strong>
            </p>
            <input
              type="text"
              className="form-control mb-3"

              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-primary w-100">Verify OTP</button>
          </form>
        )}

        {!otpStep && (
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none">
              Login here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;