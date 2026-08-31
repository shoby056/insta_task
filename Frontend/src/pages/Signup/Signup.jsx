import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    day: "",
    month: "",
    year: "",
    fullName: "",
    username: "",
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

    // Input change hone par old messages remove
    setError("");
    setSuccess("");
  };

  // =========================
  // HANDLE SIGNUP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Backend API ko request
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // React ka form data JSON mein convert
          body: JSON.stringify(formData),
        }
      );

      // Backend response ko JSON mein convert
      const data = await response.json();

      console.log("Backend Response:", data);

      // Agar signup successful hai
      if (data.success) {
        setSuccess(data.message);

        // Form clear
        setFormData({
          emailOrMobile: "",
          password: "",
          day: "",
          month: "",
          year: "",
          fullName: "",
          username: "",
        });

        // 1.5 second baad login page
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Backend se error
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);

      setError(
        "Server se connection nahi ho raha. Backend check karo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* Back Arrow */}
        <div
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        {/* =========================
            HEADER
        ========================= */}
        <div className="signup-header">
          <i className="fa-brands fa-meta meta-icon"></i>

          <h1>Get started on Instagram</h1>

          <p className="sub-title">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        {/* =========================
            FORM CARD
        ========================= */}
        <div className="signup-card">

          <form onSubmit={handleSubmit}>

            {/* Mobile / Email */}
            <div className="signup-group">

              <label htmlFor="emailOrMobile">
                Mobile number or email address
              </label>

              <input
                type="text"
                id="emailOrMobile"
                name="emailOrMobile"
                placeholder="Mobile number or email address"
                value={formData.emailOrMobile}
                onChange={handleChange}
                required
              />

              <p className="field-info">
                You may receive notifications from us.{" "}

                <a href="#">
                  Learn why we ask for your contact information
                </a>
              </p>

            </div>

            {/* Password */}
            <div className="signup-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* Date of Birth */}
            <div className="signup-group">

              <label>
                Date of birth{" "}

                <i className="fa-regular fa-circle-question help-icon"></i>
              </label>

              <div className="dob-dropdowns">

                {/* Day */}
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Day
                  </option>

                  {[...Array(31)].map((_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                    >
                      {i + 1}
                    </option>
                  ))}
                </select>

                {/* Month */}
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Month
                  </option>

                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((m, idx) => (
                    <option
                      key={idx}
                      value={m}
                    >
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year */}
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Year
                  </option>

                  {Array.from(
                    { length: 100 },
                    (_, i) => 2026 - i
                  ).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

              </div>
            </div>

            {/* Full Name */}
            <div className="signup-group">

              <label htmlFor="fullName">
                Name
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

            </div>

            {/* Username */}
            <div className="signup-group">

              <label htmlFor="username">
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>

            {/* =========================
                TERMS & CONDITIONS
            ========================= */}
            <div className="signup-terms">

              <p>
                People who use our service may have uploaded
                your contact information to Instagram.{" "}

                <a href="#">
                  Learn more.
                </a>
              </p>

              <p>
                By tapping Submit, you agree to create an
                account and to Instagram's{" "}

                <a href="#">Terms</a>,{" "}
                <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Cookies Policy</a>.
              </p>

              <p>
                The{" "}
                <a href="#">Privacy Policy</a>{" "}
                describes the ways we can use the information
                we collect when you create an account. For
                example, we use this information to provide,
                personalise and improve our products, including ads.
              </p>

            </div>

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

            {/* =========================
                SUBMIT BUTTON
            ========================= */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Submit"}
            </button>

            {/* =========================
                LOGIN BUTTON
            ========================= */}
            <button
              type="button"
              className="login-redirect-button"
              onClick={() => navigate("/login")}
            >
              I already have an account
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Signup;