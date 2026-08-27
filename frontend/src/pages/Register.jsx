import React, { useState } from "react";


function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message


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
    setSuccessMessage(""); // Reset success message

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message); // Set error message from response
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      // Set success message after successful registration
      setSuccessMessage("Akun Anda sukses terdaftar! Silakan masuk."); 
      // Optionally, you can clear the form after successful registration
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Bagian Gambar */}
      <div className="login-image">
        <img
          src="assets/img/ornamen.png"
          alt="Pariwisata"
          className="image-full"
        />
      </div>

      {/* Bagian Form */}
      <div className="login-form-container">
        <div className="form-header">
          <h3>
            Sistem Pendukung Keputusan
            <br />
            Pemberian Bantuan Pengembangan Objek Pariwisata
          </h3>
          <img
            src="assets/img/logo-sleman.png"
            alt="UpDestination Logo"
            className="logo"
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Daftar Akun</h3>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}

          {/* Username Input */}
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

          {/* Password Input */}
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

          {/* Confirm Password Input */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login btn-primary">
            Daftar
          </button>
          <p className="form-footer">
            Sudah punya akun? 
          </p>
          <p className="link-login">
            <a href="/">Masuk sekarang</a> {/* Ensure no space in href */}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;