import React from 'react';

const Pemeringkatan = ({ optimumValues, alternatives }) => {
  // Get the optimum value of A0 for Ki calculation
  const a0Value = optimumValues[0]; // Assuming A0 is the first element

  // Calculate Ki values and create a ranking array
  const rankings = optimumValues.map((value, index) => ({
    nama: alternatives[index - 1], // Use the alternatives array directly
    nilaiFungsiOptimum: value,
    ki: (value / a0Value).toFixed(3), // Calculate Ki
  }));

  // Sort rankings based on nilaiFungsiOptimum in descending order
  rankings.sort((a, b) => b.nilaiFungsiOptimum - a.nilaiFungsiOptimum);

  // Assign ranking starting from 1
  const rankedList = rankings.map((ranking, index) => ({
    ...ranking,
    rank: index // Assign rank starting from 1
  })).slice(1);

  const recommendedAlt = rankedList[0]?.nama;
  const utilityValue = rankedList[0]?.ki;
  return (
    <div>
      <h3 className="section-title">Rangkings</h3>
      <div className="container">
      <p>Berdasarkan perhitungan, Desa Wisata yang paling layak menerima bantuan pengembangan objek pariwisata di Kabupaten Sleman adalah Desa Wisata <strong>{recommendedAlt}</strong> dengan nilai utilitas sebesar <strong>{utilityValue}</strong>. Desa ini menunjukkan kinerja terbaik sesuai dengan kriteria yang telah ditentukan.</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nama Desa Wisata</th>
              <th>Nilai Fungsi Optimum</th>
              <th>Utilitas</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {rankedList.map((ranking, index) => (
              <tr key={index}>
                <td>{ranking.nama}</td> {/* Menampilkan nama alternatif */}
                <td>{ranking.nilaiFungsiOptimum.toFixed(3)}</td>
                <td>{ranking.ki}</td>
                <td>{ranking.rank}</td> {/* Menampilkan ranking */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pemeringkatan;