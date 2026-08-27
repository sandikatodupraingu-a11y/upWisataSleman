import React from 'react';

const MatriksNormalisasi = ({ normalizedMatrix, alternatives, criteria }) => {
  if (!normalizedMatrix.length) {
    return <p>Data tidak tersedia.</p>;
  }

  // Hitung total untuk setiap kolom
  const totals = normalizedMatrix[0].map((_, colIndex) =>
    normalizedMatrix.reduce((acc, row) => acc + parseFloat(row[colIndex]), 0)
  );

  // Hitung nilai normalisasi untuk setiap alternatif
  const normalizedValues = normalizedMatrix.map(row => 
    row.map((value, colIndex) => (parseFloat(value) / totals[colIndex]).toFixed(3))
  );

  // Hitung nilai optimum (maksimum) untuk setiap kolom
  const optimumValues = normalizedValues[0].map((_, colIndex) =>
    Math.max(...normalizedValues.map(row => parseFloat(row[colIndex])))
  );

  return (
    <div>
      <h3 className="section-title">Matriks Normalisasi (R)</h3>
      <div className="container section-description">
        <p className="table-description">
          Matriks Normalisasi adalah langkah kedua dalam metode ARAS, di mana nilai-nilai dalam matriks keputusan dibagi dengan jumlah nilai pada kolom yang sesuai, agar skala nilai menjadi setara dan memudahkan perbandingan antar alternatif.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Alternatif</th>
              {criteria.map((criterion, index) => (
                <th key={index}>{criterion}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Baris untuk nilai optimum */}
            <tr className='a0-row'>
              <td>A<sub>0</sub></td>
              {optimumValues.map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
            {/* Matriks Normalisasi untuk Alternatif */}
            {normalizedValues.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex + 1}>
                <td>{alternatives[rowIndex]}</td> {/* Menampilkan nama alternatif */}
                {row.map((value, colIndex) => (
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

export default MatriksNormalisasi;
