import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ email: "", password: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");

  // 🧾 Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/register", form);
      alert(res.data.msg);


      if (res.data.success) {
        setVerifyEmail(form.email); // store separately
        setForm({ email: "", password: "", phone: "" }); // clear all
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
        email: verifyEmail, // ✅ fixed line
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
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow-lg rounded-4">
        <h3 className="text-center mb-4">
          {otpStep ? "OTP Verification" : "Register"}
        </h3>

        {/* 🟢 Registration Step */}
        {!otpStep ? (
          <form onSubmit={handleRegister}>
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
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <button className="btn btn-success w-100">Register</button>
          </form>
        ) : (
          /* 🟢 OTP Verification Step */
          <form onSubmit={handleVerifyOtp}>
            <p className="text-muted mb-3">
              OTP has been sent to <strong>{verifyEmail}</strong>
            </p>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}  // ✅ make it controlled
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-success w-100">Verify OTP</button>
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
