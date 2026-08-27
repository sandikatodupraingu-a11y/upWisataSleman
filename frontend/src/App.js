import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'aos/dist/aos.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Alternatif from "./pages/Alternatif";
import Kriteria from "./pages/Kriteria";
import Evaluasi from "./pages/Evaluasi";
import Perhitungan from "./pages/Perhitungan";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const showHeader = location.pathname !== "/" && location.pathname !== "/register";
  const showFooter = location.pathname !== "/" && location.pathname !== "/register";

  return (
    <div>
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alternatif" element={<Alternatif />} />
          <Route path="/kriteria" element={<Kriteria />} />
          <Route path="/evaluasi" element={<Evaluasi />} />
          <Route path="/perhitungan" element={<Perhitungan />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
