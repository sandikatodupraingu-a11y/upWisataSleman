import React from 'react';

const NormalisasiTerbobot = ({ weightedMatrix, criteria, alternatives }) => {
  return (
    <div>
      <h3 className="section-title">Matriks Normalisasi Terbobot (D)</h3>
      <div className="container section-description">
        <p className="table-description">
          Matriks Normalisasi Terbobot adalah langkah ketiga dalam metode ARAS, di mana nilai-nilai dalam matriks normalisasi dikalikan dengan bobot masing-masing kriteria, untuk mencerminkan pentingnya setiap kriteria dalam perbandingan alternatif.
        </p>
      </div>
      <div className="container">
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
            {weightedMatrix.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex === 0 ? "a0-row" : ""}>
                <td>
                  {rowIndex === 0 ? (
                    <>
                      A<sub>0</sub>
                    </>
                  ) : (
                    alternatives[rowIndex - 1] || `A${rowIndex}` // Menampilkan A0 untuk baris pertama, alternatif untuk baris lainnya
                  )}
                </td>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>{value.toFixed(3)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NormalisasiTerbobot;
