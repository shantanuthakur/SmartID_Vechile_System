import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // add login API logic later
    navigate("/zone");
  };

  const purple = "#6a0dad";
  const pink = "#e91e63";

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "40px",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(106, 13, 173, 0.2)",
      }}
    >
      <h2 style={{ color: purple, textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID or Email:</label>
        <input
          type="text"
          name="userOrEmail"
          value={formData.userOrEmail}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            backgroundColor: purple,
            color: "white",
            padding: "10px",
            border: "none",
            width: "100%",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        New user?{" "}
        <Link to="/register" style={{ color: pink, fontWeight: "bold" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "6px 0 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};
