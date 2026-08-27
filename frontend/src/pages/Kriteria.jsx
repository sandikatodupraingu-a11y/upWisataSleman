import React, { useState, useEffect } from "react";
import SecondaryHeader from "../components/SecondaryHeader";

function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  const fetchKriteria = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/kriteria");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setKriteria(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  return (
    <>
      <SecondaryHeader
        sectitle="Data Kriteria"
        secdesc="Kriteria berikut digunakan sebagai acuan utama dalam proses penilaian dan analisis desa wisata. Kriteria ini telah ditetapkan berdasarkan standar yang relevan dengan tujuan program pengembangan wisata dan tidak dapat diubah. Setiap desa wisata akan dievaluasi berdasarkan kriteria ini untuk memastikan keadilan dan konsistensi dalam proses penilaian."
      />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kriteria</th>
                  <th>Bobot</th>
                  <th>Tipe</th>
                </tr>
              </thead>
              <tbody>
                {kriteria.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.bobot}</td>
                    <td>{item.tipe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <tr>
              <td>
                <p>
                  <sup>*</sup> Tipe kriteria <strong>benefit</strong> adalah faktor yang semakin baik bila nilainya semakin besar.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                <sup>*</sup> Tipe kriteria <strong>cost</strong> adalah faktor yang semakin baik bila nilainya semakin kecil.
                </p>
              </td>
            </tr>
          </div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  );
}

export default Kriteria;
