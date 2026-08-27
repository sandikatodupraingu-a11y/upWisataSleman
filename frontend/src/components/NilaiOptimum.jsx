import React from "react";

const NilaiOptimum = ({ optimumValues, alternatives }) => {
  return (
    <div>
      <h3 className="section-title">Nilai Fungsi Optimum (S)</h3>
      <div className="container section-description">
        <p className="table-description">
          Nilai Fungsi Optimum adalah langkah keempat dalam metode ARAS, di mana dihitung nilai total untuk setiap alternatif berdasarkan hasil perkalian antara nilai normalisasi terbobot dan bobot kriteria.
        </p>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Alternatif</th>
              <th>Nilai Fungsi Optimum</th>
            </tr>
          </thead>
          <tbody>
            {/* Baris untuk A0 */}
            <tr className="a0-row">
              <td>A<sub>0</sub></td>
              <td>{optimumValues[0].toFixed(3)}</td>
            </tr>
            {/* Baris untuk alternatif lainnya */}
            {optimumValues.slice(1).map((value, index) => (
              <tr key={index + 1}>
                <td>{alternatives[index] || `A${index + 1}`}</td> {/* Menampilkan nama alternatif atau fallback ke A1, A2, dst */}
                <td>{value.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NilaiOptimum;
