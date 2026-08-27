import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import SecondaryHeader from "../components/SecondaryHeader";

function Evaluasi({ updateEvaluasiList }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDesa, setSelectedDesa] = useState("");
  const [nilaiKriteria, setNilaiKriteria] = useState({
    kelembagaan: "",
    amenitas: "",
    digital: "",
    dayaTarik: "",
    resiliensi: "",
  });
  const [evaluasiList, setEvaluasiList] = useState([]);
  const [desaWisataList, setDesaWisataList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvaluasiId, setCurrentEvaluasiId] = useState(null);

  // Menangani modal toggle
  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal) resetForm();  // Reset form when modal is closed
  };

  // Reset form
  const resetForm = () => {
    setSelectedDesa("");
    setNilaiKriteria({
      kelembagaan: "",
      amenitas: "",
      digital: "",
      dayaTarik: "",
      resiliensi: "",
    });
    setIsEditing(false);
    setCurrentEvaluasiId(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
  
    // Validasi min dan max
    if (numericValue < 0 || numericValue > 33.5) {
      alert(`Nilai ${name} harus di antara 0 sampai 33.5`);
      return;
    }
  
    setNilaiKriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  // Handle form submit
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedDesa || Object.values(nilaiKriteria).some(value => value === "")) {
      alert("Semua kolom harus diisi!");
      return;
    }
  
    const newPenilaian = {
      id_alternatif: selectedDesa,
      value: {
        1: parseFloat(nilaiKriteria.kelembagaan),
        2: parseFloat(nilaiKriteria.amenitas),
        3: parseFloat(nilaiKriteria.digital),
        4: parseFloat(nilaiKriteria.dayaTarik),
        5: parseFloat(nilaiKriteria.resiliensi),
      },
    };
  
    const endpoint = isEditing
      ? `http://localhost:5000/penilaian/${currentEvaluasiId}`  // Endpoint untuk update
      : "http://localhost:5000/penilaian";  // Endpoint untuk create
  
    const method = isEditing ? "PUT" : "POST";  // Method untuk update atau create
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPenilaian),
      });
  
      if (response.ok) {  // Cek keberhasilan tanpa menggunakan status
        fetchEvaluasi();  // Refresh evaluasi list
        fetchDesaWisata();  // Refresh desaWisataList
        toggleModal();  // Tutup modal
      } else {
        const errorData = await response.json();
        throw new Error(`Terjadi kesalahan: ${errorData.message || 'Coba lagi.'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data, coba lagi.");
    }
  };

  // Fetch evaluations data
  const fetchEvaluasi = async () => {
    try {
      const response = await fetch("http://localhost:5000/penilaian");
      if (!response.ok) {
        throw new Error('Failed to fetch evaluations');
      }
      const temp = await response.json();
      let data = [];
      let nama = '';
      let alt = null;
      for (let item of temp) {
        if (item.nama_alt !== nama) {
          if (alt) data.push(alt);
          nama = item.nama_alt;
          alt = { 'id': item.id, 'id_alternatif': item.id_alternatif, 'nama': nama };
        }
        alt['C' + item.id_kriteria] = item.value;
      }
      data.push(alt);
      setEvaluasiList(data);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
    }
  };

  // Fetch desaWisata data
  const fetchDesaWisata = async () => {
    try {
      const response = await fetch("http://localhost:5000/alternatif");
      if (!response.ok) {
        throw new Error('Failed to fetch desa wisata');
      }
      const data = await response.json();
      const evaluatedDesaIds = evaluasiList.map(evaluasi => evaluasi.id_alternatif);
      const filteredDesaWisata = data.filter(desa => !evaluatedDesaIds.includes(desa.id));
      setDesaWisataList(filteredDesaWisata);
    } catch (error) {
      console.error("Error fetching alternatif:", error);
    }
  };

  // Edit evaluation
  const handleEdit = (evaluasi) => {
    setSelectedDesa(evaluasi.id_alternatif);
    setNilaiKriteria({
      kelembagaan: evaluasi.C1,
      amenitas: evaluasi.C2,
      digital: evaluasi.C3,
      dayaTarik: evaluasi.C4,
      resiliensi: evaluasi.C5,
    });
    setCurrentEvaluasiId(evaluasi.id);
    setIsEditing(true);
    toggleModal();
  };

  // Delete evaluation
  const handleDelete = (id_alternatif) => {
    if (window.confirm("Anda yakin ingin menghapus evaluasi ini?")) {
      fetch(`http://localhost:5000/penilaian/${id_alternatif}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchEvaluasi();  // Refresh evaluations list after deletion
          fetchDesaWisata();  // Refresh desaWisataList
        })
        .catch((error) => console.error("Error deleting evaluation:", error));
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEvaluasi();
    fetchDesaWisata();
  }, []);

  return (
    <>
      <SecondaryHeader
        sectitle="PENILAIAN"
        secdesc="Yuk, masukkan nilai dengan cermat sesuai kriteria yang ada untuk memastikan objektivitas dan keakuratan dalam proses analisis! Di sini, Anda dapat memberikan penilaian terhadap masing-masing kriteria yang telah ditetapkan untuk setiap desa wisata. Penilaian yang Anda masukkan akan digunakan untuk mengevaluasi dan menentukan desa wisata yang layak menerima dukungan pengembangan."
      />
      <section id="evaluasi" className="evaluasi">
        <div className="container section-title text-center" data-aos="fade-up">
          <button className="btn_all btn-sm col-sm-2 col-4" onClick={toggleModal}>
            Tambah Penilaian
          </button>
        </div>

        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Update Penilaian Desa Wisata" : "Input Penilaian Desa Wisata"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="desaWisata" className="form-label">Pilih Desa Wisata</label>
                <select
                  id="desaWisata"
                  className="form-select"
                  value={selectedDesa}
                  onChange={(e) => setSelectedDesa(e.target.value)}
                >
                  <option value="">Pilih Desa Wisata</option>
                  {desaWisataList.map((desa) => (
                    <option key={desa.id} value={desa.id}>
                      {desa.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Menambahkan informasi maksimal bobot penilaian */}
              <div className="alert alert-info">
                Bobot penilaian yang diinputkan maksimal <strong>33.5</strong> untuk setiap kriteria.
              </div>

              {/* Grid untuk input kriteria */}
              <div className="row">
                {["kelembagaan", "amenitas", "digital", "dayaTarik", "resiliensi"].map((item, index) => (
                  <div key={item} className="col-md-6 mb-3">
                    <label className="form-label">{item.charAt(0).toUpperCase() + item.slice(1)}</label>
                    <input
                      type="float"
                      className="form-control"
                      name={item}
                      value={nilaiKriteria[item]}
                      onChange={handleChange}
                      // min="0"
                      // max="33.5" 
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-outline-primary">
                {isEditing ? "Update" : "Submit"}
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <div className="container mt-4">
          <table className="table">
            <thead>
              <tr>
                {/* <th>No</th> */}
                <th>Nama Desa Wisata</th>
                <th>Kelembagaan & SDM</th>
                <th>Amenitas</th>
                <th>Digital</th>
                <th>Daya Tarik Wisata</th>
                <th>Resiliensi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {evaluasiList.map((evaluasi) => (
                <tr key={evaluasi.id_alternatif}>
                  { }
                  {/* <td>{index + 1}</td> */}
                  <td>{evaluasi.nama}</td>
                  <td>{evaluasi.C1}</td>
                  <td>{evaluasi.C2}</td>
                  <td>{evaluasi.C3}</td>
                  <td>{evaluasi.C4}</td>
                  <td>{evaluasi.C5}</td>
                  <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(evaluasi)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(evaluasi.id_alternatif)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Evaluasi;
