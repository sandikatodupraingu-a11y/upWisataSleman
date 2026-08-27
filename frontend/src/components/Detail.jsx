import React from "react";
import MatriksKeputusan from "../components/MatriksKeputusan";
import MatriksNormalisasi from "../components/MatriksNormalisasi";
import NormalisasiTerbobot from "../components/NormalisasiTerbobot";
import NilaiOptimum from "../components/NilaiOptimum";

const Detail = ({
  alternatives,
  criteria,
  matrix,
  normalizedMatrix,
  weightedMatrix,
  optimumValues,
  rankings
}) => {
  return (
    <div>
      
      {/* Matriks Keputusan */}
      <div className="detail-section">
        <MatriksKeputusan 
          alternatives={alternatives} 
          criteria={criteria} 
          matrix={matrix} 
        />
      </div>
      
      {/* Matriks Normalisasi */}
      <div className="detail-section">
        <MatriksNormalisasi 
          normalizedMatrix={normalizedMatrix}
          alternatives={alternatives} 
          criteria={criteria} 
        />
      </div>
      
      {/* Matriks Normalisasi Terbobot */}
      <div className="detail-section">
        <NormalisasiTerbobot 
          weightedMatrix={weightedMatrix} 
          alternatives={alternatives} 
          criteria={criteria} 
        />
      </div>
      
      {/* Nilai Optimum */}
      <div className="detail-section">
        <NilaiOptimum 
          optimumValues={optimumValues} 
          alternatives={alternatives} 
        />
      </div>
      
    </div>
  );
};

export default Detail;
