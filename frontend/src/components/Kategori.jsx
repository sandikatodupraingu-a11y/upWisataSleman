import React, { useState } from 'react';

const Kategori = () => {
  const [showModal, setShowModal] = useState(null); // Menyimpan modal mana yang akan ditampilkan

  const handleOpenModal = (kategori) => {
    setShowModal(kategori); // Menyimpan kategori yang dipilih untuk modal
  };

  const handleCloseModal = () => {
    setShowModal(null); // Menutup modal
  };

  return (
    <section id="kategori" className="kategori section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Kategori Penilaian</h2>
        <p>Kategori Penilaian Dukungan Pengembangan Usaha Pariwisata dan Ekonomi Kreatif (DPUP) 2024 Kabupaten Sleman</p>
      </div>

      <div className="container mt-5 px-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {/* Kartu Kelembagaan & SDM */}
          <div className="col" data-aos="fade-up" data-aos-delay="100">
            <div className="card kategori-card h-100">
              <img src="assets/img/cat4.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Kelembagaan & SDM</h5>
                <p className="card-text">
                  Pemberdayaan SDM di Desa Wisata untuk meningkatkan lapangan
                  kerja, dampak ekonomi, serta mendukung kesetaraan gender
                  dalam pelibatan SDM di Desa Wisata
                </p>
                <button className="btn btn-danger" onClick={() => handleOpenModal('kelembagaan')}>Indikator</button>
              </div>
            </div>
          </div>

          {/* Kartu Amenitas */}
          <div className="col" data-aos="fade-up" data-aos-delay="200">
            <div className="card kategori-card h-100">
              <img src="assets/img/cat2.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Amenitas</h5>
                <p className="card-text">
                  Peningkatan standar kualitas amenitas pariwisata dengan
                  standar CHSE melalui fasilitas homestay, toilet, serta
                  fasilitas penungjang pariwisata lainnya untuk pemenuhan sarana dan prasarana
                  kenyamanan Wisatawan
                </p>
                <button className="btn btn-danger" onClick={() => handleOpenModal('amenitas')}>Indikator</button>
              </div>
            </div>
          </div>

          {/* Kartu Digital */}
          <div className="col" data-aos="fade-up" data-aos-delay="300">
            <div className="card kategori-card h-100">
              <img src="assets/img/cat3.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Digital</h5>
                <p className="card-text">
                  Akselerasi transformasi digital melalui pelayanan
                  infrastruktur dan menciptakan konten kreatif sebagai sarana
                  promosi desa wisata melalui media digital
                </p>
                <button className="btn btn-danger" onClick={() => handleOpenModal('digital')}>Indikator</button>
              </div>
            </div>
          </div>

          {/* Kartu Daya Tarik */}
          <div className="col" data-aos="fade-up" data-aos-delay="400">
            <div className="card kategori-card h-100">
              <img src="assets/img/cat1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Daya Tarik</h5>
                <p className="card-text">
                  Merupakan potensi utama desa wisata yang memiliki keunikan,
                  keautentikan, dan kreativitas yang menjadi Daya Tarik Wisata
                  berupa produk wisata (wisata alam, buatan, budaya) & produk
                  ekonomi kreatif (kriya, kuliner, fashion)
                </p>
                <button className="btn btn-danger" onClick={() => handleOpenModal('dayaTarik')}>Indikator</button>
              </div>
            </div>
          </div>

          {/* Kartu Resiliensi */}
          <div className="col" data-aos="fade-up" data-aos-delay="500">
            <div className="card kategori-card h-100">
              <img src="assets/img/cat5.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Resiliensi</h5>
                <p className="card-text">
                  Pengelolaan desa wisata yang berkelanjutan dengan
                  memperhatikan isu lingkungan serta memiliki manajemen risiko
                </p>
                <button className="btn btn-danger" onClick={() => handleOpenModal('resiliensi')}>Indikator</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Kelembagaan */}
      {showModal === 'kelembagaan' && (
        <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Kriteria Penilaian Kelembagaan & SDM</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Kelembagaan</h6>
                <ol>
                  <li>Memiliki struktur organisasi pengelola desa wisata (Pokdarwis, Koperasi atau BUMDes)</li>
                  <li>Memiliki legalitas desa wisata (SK Desa Wisata)</li>
                  <li>Memiliki program kerja atau rencana pengembangan desa wisata</li>
                </ol>
                <h6>SDM</h6>
                <ol>
                  <li>Menciptakan lapangan kerja di sektor pariwisata</li>
                  <li>Memiliki SDM yang memiliki kompetensi dan keterampilan dalam pendukung pengelolaan Desa Wisata</li>
                  <li>Mendukung kesetaraan gender di bidang pariwisata</li>
                  <li>Meningkatkan perekonomian desa</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Amenitas */}
      {showModal === 'amenitas' && (
        <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Kriteria Penilaian Amenitas</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Homestay</h6>
                <ol>
                  <li>Memiliki bangunan dengan pencahayaan dan sirkulasi yang baik</li>
                  <li>Memiliki kamar tidur dengan kelengkapan yang bersih dan terawat</li>
                  <li>Memiliki kamar mandi dengan perlengkapan mandi, air bersih dan sistem pembuangan</li>
                </ol>
                <h6>Toilet</h6>
                <ol>
                  <li>Memiliki toilet yang berfungsi, bersih dan terawat, dilengkapi dengan penerangan yang baik dan signage</li>
                  <li>Memiliki kloset duduk/jongkok dan urinoir, dengan ketersediaan air dan perlengkapannya (gayung, bidet, sabun, tisu dan tempat sampah)</li>
                  <li>Memiliki tempat cuci tangan, dengan ketersediaan air dan perlengkapannya (sabun, tisu dan tempat sampah)</li>
                </ol>
                <h6>Fasilitas Pendukung</h6>
                <ol>
                  <li>Memiliki tempat ibadah</li>
                  <li>Memiliki tempat makan (warung/restoran)</li>
                  <li>Memiliki tempat parkir</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Digital */}
      {showModal === 'digital' && (
        <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Kriteria Penilaian Digital</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Digital</h6>
                <ol>
                    <li>Memiliki jaringan internet yang kuat dan WIFI</li>
                    <li>Memiliki sistem pencatatan secara digital (keuangan, pengunjung)</li>
                    <li>Terintegrasi dengan online travel agent atau e-commerce</li>
                </ol>
                <h6>Kreatif</h6>
                <ol>
                    <li>Memiliki pengelolaan situs dan media sosial</li>
                    <li>Memiliki informasi desa wisata yang akurat dan berkualitas</li>
                    <li>Memiliki nilai konten yang kreatif dan menarik bernilai kearifan lokal</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Daya Tarik */}
      {showModal === 'dayaTarik' && (
        <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Kriteria Penilaian Daya Tarik</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Produk Wisata</h6>
                <ol>
                    <li>Memilki potensi daya tarik wisata (alam/budaya/kreatif) yang unik dan otentik</li>
                    <li>Mampu mengembangkan inovasi dan diversifikasi produk wisata</li>
                    <li>Mendukung konservasi dan nilai kearifan lokal</li>
                    <li> Memiliki paket wisata yang terintegrasi</li>
                </ol>
                <h6>Produk Ekraf</h6>
                <ol>
                    <li>Ketersediaan produk ekonomi kreatif (kriya, kuliner dan fashion) sebagai souvenir yang menggunakan material lokal dan diproduksi oleh masyarakat setempat</li>
                    <li>Desain produk memiliki ciri khas berbasis pada kearifan lokal setempat</li>
                    <li>Produksi dan pengemasan memenuhi standar kualitas</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Resiliensi */}
      {showModal === 'resiliensi' && (
        <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Kriteria Penilaian Resiliensi</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Unit Pengelolaan Sampah</h6>
                <ul>
                    <li>Memilki tempat sampah terpilah</li>
                    <li>Memiliki Unit Pengelolaan Sampah (UPS) (kelompok pengelola sampah)</li>
                    <li>Memiliki program pengelolaan sampah (berupa sosialisasi/edukasi/pelatihan/signage tentang pengelolaan sampah)</li>
                    <li>Memiliki Bank Sampah</li>
                </ul>
                <h6>Manajemen Resiko Keselamatan, Kesehatan dan Lingkungan</h6>
                <ul>
                    <li>Memiliki jalur dan rambu evakuasi</li>
                    <li>Memiliki sarana prasarana mendukung keselamatan wisatawan (alat komunikasi darurat, APAR, kotak P3K, life jacket, dll)</li>
                    <li>Memiliki profilling resiko dari aktivitas wisata serta rencana antisipasi</li>
                    <li>Memiliki program terkait manajemen resiko keselamatan dan kesehatan yang sudah diinisasi baik oleh pemerintah pusat, pemerintah daerah , pemerintah desa maupun pihak swasta</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Kategori;
