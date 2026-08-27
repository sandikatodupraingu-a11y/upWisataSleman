import React, { useState, useEffect } from "react";
import SecondaryHeader from "../components/SecondaryHeader";
import Pemeringkatan from "../components/Pemeringkatan";
import Detail from "../components/Detail";

function Perhitungan() {
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [weights, setWeights] = useState([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);
  const [weightedMatrix, setWeightedMatrix] = useState([]);
  const [optimumValues, setOptimumValues] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/penilaian");
        if (!response.ok) {
          throw new Error("Failed to fetch evaluations");
        }
        const temp = await response.json();
        const data = [];
        let nama = "";
        let alt = null;

        for (const item of temp) {
          if (item.nama_alt !== nama) {
            if (alt) data.push(alt);
            nama = item.nama_alt;
            alt = { id: item.id, id_alternatif: item.id_alternatif, nama };
          }
          alt["C" + item.id_kriteria] = item.value;
        }
        if (alt) data.push(alt);

        const rawAlternatives = data.map((item) => item.nama);
        const rawMatrix = data.map((item) => [item.C1, item.C2, item.C3, item.C4, item.C5]);

        // const filteredAlternatives = rawAlternatives.filter((alt) => alt !== "A0");
        // const filteredMatrix = rawMatrix.filter((_, index) => rawAlternatives[index] !== "A0");

        setAlternatives(rawAlternatives);
        setMatrix(rawMatrix);

        const criteriaResponse = await fetch("http://localhost:5000/kriteria");
        if (!criteriaResponse.ok) throw new Error("Failed to fetch criteria data");
        const criteriaData = await criteriaResponse.json();

        setCriteria(criteriaData.map((item) => item.nama));
        setWeights(criteriaData.map((item) => item.bobot));
        setSelectedAlternatives(new Array(filteredAlternatives.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedSelection = [...selectedAlternatives];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedAlternatives(updatedSelection);
    setShowResults(false);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectedAlternatives(new Array(alternatives.length).fill(isChecked));
    setShowResults(false);
  };

  const handleHitungClick = () => {
    const filteredMatrix = matrix.filter((_, index) => selectedAlternatives[index]);
    const filteredAlternatives = alternatives.filter((_, index) => selectedAlternatives[index]);

    if (filteredMatrix.length === 0) {
      alert("Please select at least one alternative.");
      return;
    }

    const maxValues = filteredMatrix[0].map((_, colIndex) =>
      Math.max(...filteredMatrix.map(row => row[colIndex]))
    );
    const normalize = normalizeMatrix([maxValues, ...filteredMatrix]);
    setNormalizedMatrix(normalize);

    const weightedMatrix = weightedNormalization(normalize, weights);
    setWeightedMatrix(weightedMatrix);

    const optimumValues = calculateOptimum(weightedMatrix);
    setOptimumValues(optimumValues);

    const rankings = calculateRankings(optimumValues, filteredAlternatives);
    setRankings(rankings);

    setShowResults(true);
  };

  const normalizeMatrix = (matrix) => {
    const columnSums = matrix[0].map((_, colIndex) =>
      matrix.reduce((sum, row) => sum + (row[colIndex] || 0), 0)
    );

    return matrix.map((row) => row.map((val, colIndex) => (val || 0) / columnSums[colIndex]));
  };

  const weightedNormalization = (normalizedMatrix, weights) => {
    return normalizedMatrix.map((row) => row.map((val, i) => val * weights[i]));
  };

  const calculateOptimum = (weightedMatrix) => {
    return weightedMatrix.map((row) => row.reduce((sum, val) => sum + val, 0));
  };

  const calculateRankings = (optimumValues, alternatives) => {
    return optimumValues
      .map((value, index) => ({ alternative: alternatives[index], value }))
      .sort((a, b) => b.value - a.value);
  };

  const filteredAlternatives = alternatives.filter((_, index) => selectedAlternatives[index]);
  const filteredMatrix = matrix.filter((_, index) => selectedAlternatives[index]);

  return (
    <>
      <SecondaryHeader
        sectitle="Rekomendasi Pemberian Bantuan Pengembangan Desa Wisata"
        secdesc="Ayo, mulai evaluasi sekarang dan temukan rekomendasi yang tepat! Pilih desa wisata yang ingin Anda evaluasi untuk mendapatkan rekomendasi pemberian bantuan pengembangan. Sistem akan secara otomatis menghitung berdasarkan kriteria yang telah ditetapkan dan memberikan rekomendasi terbaik untuk pengembangan desa wisata."
      />
      <br />
      <div className="container section-title" data-aos="fade-up">
        <h3>Perhitungan menggunakan Metode ARAS</h3>
      </div>
      <div className="container section-description">
        <p className="table-description">Silakan pilih desa wisata yang akan dihitung untuk evaluasi.</p>
      </div>

      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">No</th>
              <th rowSpan="2">Nama Desa Wisata (Alternatif)</th>
              <th colSpan="5" className="text-center">Kriteria</th>
              <th rowSpan="2">
                <label>
                  Pilih Semua <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={selectedAlternatives.length > 0 && selectedAlternatives.every((selected) => selected)}
                  />
                </label>
              </th>
            </tr>
            <tr>
              <th>Kelembagaan & SDM</th>
              <th>Amenitas</th>
              <th>Digital</th>
              <th>Daya Tarik</th>
              <th>Resiliensi</th>
            </tr>
          </thead>
          <tbody>
            {alternatives.map((alt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{alt}</td>
                {matrix[index] && matrix[index].map((val, colIndex) => (
                  <td key={colIndex}>{val}</td>
                ))}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAlternatives[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container section-title" data-aos="fade-up">
          <button className="btn_all btn-sm col-sm-2 col-4" onClick={handleHitungClick}>
            Hitung
          </button>
        </div>
      </div>
      {showResults && optimumValues.length > 0 && (
        <div>
          <Pemeringkatan optimumValues={optimumValues} alternatives={filteredAlternatives} />
          <div className="container section-title">
            <button
              className="btn_all btn-sm col-sm-2 col-4"
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? "Tutup Detail" : "Lihat Detail"}
            </button>
          </div>
          {showDetail && (
            <Detail
              alternatives={filteredAlternatives}
              criteria={criteria}
              matrix={filteredMatrix}
              normalizedMatrix={normalizedMatrix}
              weightedMatrix={weightedMatrix}
              optimumValues={optimumValues}
              rankings={rankings}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Perhitungan;