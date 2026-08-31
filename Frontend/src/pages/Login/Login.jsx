import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // =========================
  // LOGIN FORM STATE
  // =========================
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // Success message
  const [success, setSuccess] = useState("");

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Purane messages remove
    setError("");
    setSuccess("");
  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Backend API ko request
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Login data backend ko bhejna
          body: JSON.stringify(formData),
        }
      );

      // Backend response
      const data = await response.json();

      console.log("Login Response:", data);

      // Login successful
      if (data.success) {
        setSuccess(data.message);

        console.log("Logged in user:", data.user);

        // Thori dair baad home page
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Backend error
        setError(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Server se connection nahi ho raha. Backend check karo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">

      {/* =========================
          LEFT SIDE
      ========================= */}
      <div className="left">

        {/* Instagram Logo */}
        <img
          className="insta-logo"
          src="/images/logo.jpg"
          alt="Instagram"
        />

        {/* Main Text */}
        <div className="left-text">

          <p>
            See everyday moments from
          </p>

          <p>
            your <span>close friends.</span>
          </p>

        </div>

        {/* Instagram Promotional Image */}
        <img
          className="insta-image"
          src="/images/insta.jpg"
          alt="Instagram moments"
        />

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}
      <div className="right">

        <div className="login-container">

          <h1>
            Log in to Instagram
          </h1>

          {/* =========================
              LOGIN FORM
          ========================= */}
          <form onSubmit={handleSubmit}>

            {/* Username / Email */}
            <input
              type="text"
              name="emailOrMobile"
              placeholder="Mobile number, username or email address"
              value={formData.emailOrMobile}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* =========================
                SUCCESS MESSAGE
            ========================= */}
            {success && (
              <p className="success-message">
                {success}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

          </form>


          {/* =========================
              FORGOT PASSWORD
          ========================= */}
          <Link
            to="/forgot-password"
            className="forgot-password"
          >
            Forgotten password?
          </Link>


          {/* =========================
              FACEBOOK LOGIN
          ========================= */}
          <button
            type="button"
            className="facebook-btn"
          >

            <span className="facebook-icon">
              f
            </span>

            Log in with Facebook

          </button>


          {/* =========================
              CREATE ACCOUNT
          ========================= */}
          <Link
            to="/signup"
            className="create-account"
          >
            Create new account
          </Link>


          {/* =========================
              META
          ========================= */}
          <div className="meta">

            <span className="meta-logo">
              ∞
            </span>

            <span>
              Meta
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;