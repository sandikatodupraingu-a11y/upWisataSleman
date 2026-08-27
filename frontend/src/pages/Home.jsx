import React from "react";
import Kategori from "../components/Kategori";

function Home() {
  return (
    <>
      <section id="welcome" className="welcome section dark-background">
        <div className="info d-flex align-items-center">
          <div className="container">
            <div
              className="row justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="2000"
            >
              <div className="col-lg-7 text-center">
                <h2 data-aos="fade-up" data-aos-delay="300">
                  Selamat Datang di
                </h2>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  Sistem Pendukung Keputusan Pemberian Bantuan Pengembangan
                  Objek Pariwisata
                  <span className="info-yellow"> Kabupaten Sleman</span>
                </h2>
                <p data-aos="fade-up" data-aos-delay="500">
                  Keputusan yang tepat akan mendorong perkembangan pariwisata
                  yang berkelanjutan dan berkualitas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="welcome-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-item active">
            <img src="assets/img/welcome-carousel/jeepmerapi.jpg" alt="" />
          </div>

          <div className="carousel-item">
            <img src="assets/img/welcome-carousel/ledoksambi.jpg" alt="" />
          </div>

          <div className="carousel-item">
            <img src="assets/img/welcome-carousel/prambanan.jpg" alt="" />
          </div>

          <div className="carousel-item">
            <img src="assets/img/welcome-carousel/thelost.jpg" alt="" />
          </div>

          <div className="carousel-item">
            <img src="assets/img/welcome-carousel/prambanan.jpg" alt="" />
          </div>

          <a
            className="carousel-control-prev"
            href="#welcome-carousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bi bi-chevron-left"
              aria-hidden="true"
            ></span>
          </a>

          <a
            className="carousel-control-next"
            href="#welcome-carousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bi bi-chevron-right"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>
      <section id="program" className="program section">
        <div className="container">
          <div className="title">
            <h2 data-aos="fade-up" data-aos-delay="300">
              Dukungan Pengembangan Usaha Pariwisata dan Ekonomi Kreatif (DPUP)
              Kabupaten Sleman
            </h2>
          </div>
          <div className="row position-relative">
            <div
              className="col-lg-6 program-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src="assets/img/adwi2024.png" alt="Ornamen" />
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="our-story">
                <p data-aos="fade-up" data-aos-delay="400">
                  <span style={{ fontSize: "35px", fontWeight: "bold", color: "#F4BC40" }}>
                    Tahukah Anda?
                  </span> DPUP Kabupaten Sleman hadir dengan program menarik untuk mendukung pariwisata dan ekonomi kreatif lokal! Dengan memanfaatkan pesona alam, kekayaan budaya, dan kreativitas masyarakat, program ini bertujuan untuk mengangkat daya tarik wisata, membuka peluang usaha baru, dan menciptakan lapangan kerja yang membawa dampak positif bagi Sleman.
                </p>
                <p data-aos="fade-up" data-aos-delay="500">
                  Tidak hanya itu, DPUP juga memastikan pariwisata yang berkelanjutan menjadi pilar utama dalam pengembangan daerah. Desa wisata yang ikut program ini diklasifikasikan dalam kategori berikut, masing-masing dengan keistimewaannya:
                </p>
                <ul data-aos="fade-up" data-aos-delay="500">
                  <li>
                    <span>🌱 <b>Rintisan</b>: Desa yang mulai menggali potensi wisatanya.</span>
                  </li>
                  <li>
                    <span>🌿 <b>Berkembang</b>: Desa yang mulai menarik perhatian wisatawan.</span>
                  </li>
                  <li>
                    <span>🌳 <b>Maju</b>: Desa wisata favorit yang terus tumbuh dan bersinar.</span>
                  </li>
                  <li>
                    <span>🏞️ <b>Mandiri</b>: Desa inspiratif yang sudah berdikari dan menjadi ikon!</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Kategori />
    </>
  );
}

export default Home;
