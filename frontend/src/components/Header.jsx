import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Implement logout logic here (clear session, tokens, etc.)
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <div className="container-fluid navigation_bar">
      <nav className="navscroll navbar fixed-top navbar-expand-lg navbar-light py-2 px-3">
        <div className="container">
          <NavLink className="navbar-brand" to="/home">
            <img src="assets/img/logo.png" alt="logo1" className="img-fluid" width="250" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  className={({ isActive }) =>
                    isActive ? "nav-link active-text" : "nav-link"
                  }
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className={({ isActive }) =>
                    isActive ? "nav-link active-text" : "nav-link"
                  }
                  to="/alternatif"
                >
                  Desa Wisata
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className={({ isActive }) =>
                    isActive ? "nav-link active-text" : "nav-link"
                  }
                  to="/kriteria"
                >
                  Kriteria
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className={({ isActive }) =>
                    isActive ? "nav-link active-text" : "nav-link"
                  }
                  to="/evaluasi"
                >
                  Penilaian
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className={({ isActive }) =>
                    isActive ? "nav-link active-text" : "nav-link"
                  }
                  to="/perhitungan"
                >
                  REKOMENDASI
                </NavLink>
              </li>
              {/* User Icon with Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="dropbtn"
                  onClick={toggleDropdown}
                >
                  <FaUserCircle className="user-icon" />
                  <i className="fa fa-caret-down"></i>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <a href="/" onClick={handleLogout}>Logout</a>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
