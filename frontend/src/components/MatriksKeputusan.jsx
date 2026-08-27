import React from "react";

const MatriksKeputusan = ({ alternatives, criteria, matrix }) => {
  if (!criteria.length || !matrix.length) {
    return <p>Data tidak tersedia.</p>;
  }

  const maxValues = matrix[0].map((_, colIndex) =>
    Math.max(...matrix.map(row => row[colIndex]))
  );

  return (
    <div>
      <h3 className="section-title">Matriks Keputusan (X)</h3>
      <div className="container section-description">
        <p className="table-description"><strong><sup>*</sup>A<sub>0</sub> adalah nilai terbaik atau ideal untuk setiap kriteria dalam proses perbandingan alternatif. Ini digunakan sebagai acuan untuk melihat seberapa baik setiap alternatif dibandingkan dengan nilai terbaik yang bisa dicapai.</strong></p>
        <p className="table-description">
        Matriks Keputusan adalah langkah awal dalam metode ARAS, di mana nilai kinerja setiap alternatif terhadap kriteria yang sudah ditentukan disusun untuk memudahkan perbandingan dan penilaian.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Nama Desa Wisata</th>
              {criteria.map((criterion, index) => (
                <th key={index}>{criterion}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="a0-row">
              <td>A<sub>0</sub></td>
              {maxValues.map((maxValue, colIndex) => (
                <td key={colIndex}>{maxValue}</td>
              ))}
            </tr>
            {alternatives.map((alternative, rowIndex) => (
              <tr key={rowIndex}>
                <td>{alternative}</td>
                {matrix[rowIndex].map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatriksKeputusan;