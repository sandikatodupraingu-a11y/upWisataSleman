import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message); // Set error message from the server response
        return;
      }

      console.log("Login successful:", data);

      // Redirect to home page after successful login
      navigate("/home"); // Navigate to the home page
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Bagian Gambar */}
      <div className="login-image">
        <img src="assets/img/ornamen.png" alt="Pariwisata" className="image-full" />
      </div>

      {/* Bagian Form */}
      <div className="login-form-container">
        <div className="form-header">
          <h3>
            Sistem Pendukung Keputusan<br />
            Pemberian Bantuan Pengembangan Objek Pariwisata
          </h3>
          <img src="assets/img/logo-sleman.png" alt="UpDestination Logo" className="logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Login</h3>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-login btn-primary">
            Masuk
          </button>
          <p className="form-footer">
            Belum punya akun? 
          </p>
          <p className="link-register">
            <a href="/register">Daftar sekarang</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
