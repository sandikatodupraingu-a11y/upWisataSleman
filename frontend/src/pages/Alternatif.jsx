import React, { useState, useEffect } from "react";
import SecondaryHeader from "../components/SecondaryHeader";
import { Modal } from "react-bootstrap";

function Alternatif() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [alternatifs, setAlternatifs] = useState([]);
  const [newAlternatif, setNewAlternatif] = useState({
    nama: "",
    klasifikasi: "rintisan",
  });
  const [updateAlternatif, setUpdateAlternatif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlternatifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/alternatif");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAlternatifs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlternatifs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/alternatif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlternatif),
      });
      if (!response.ok) {
        throw new Error("Failed to add alternatif");
      }
      await fetchAlternatifs();
      setShowModal(false);
      setNewAlternatif({
        nama: "",
        klasifikasi: "rintisan",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/alternatif/${updateAlternatif.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAlternatif),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update alternatif");
      }
      await fetchAlternatifs();
      setShowUpdateModal(false);
      setUpdateAlternatif(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus alternatif ini?")) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:5000/alternatif/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete alternatif");
        }
        await fetchAlternatifs();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const openUpdateModal = (alternatif) => {
    setUpdateAlternatif(alternatif);
    setShowUpdateModal(true);
  };

  return (
    <>
      <SecondaryHeader
        sectitle="Data Desa Wisata"
        secdesc="Yuk, lengkapi data Anda sekarang dan jadikan langkah ini sebagai awal dalam menentukan prioritas bantuan pengembangan objek wisata! Anda dapat dengan mudah menambahkan desa wisata baru, memperbarui informasi yang sudah ada, atau menghapus data yang tidak relevan. "
      />
      <section id="alternatif" className="alternatif">
        <div className="container section-title" data-aos="fade-up">
          <button
            className="btn_all btn-sm col-sm-2 col-4"
            onClick={() => setShowModal(true)}
          >
            Tambah Desa Wisata
          </button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Input Desa Wisata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="namaDesa" className="form-label">
                  Nama Desa Wisata
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaDesa"
                  value={newAlternatif.nama}
                  onChange={(e) =>
                    setNewAlternatif({ ...newAlternatif, nama: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="klasifikasi" className="form-label">
                  Klasifikasi
                </label>
                <select
                  className="form-select"
                  id="klasifikasi"
                  value={newAlternatif.klasifikasi}
                  onChange={(e) =>
                    setNewAlternatif({
                      ...newAlternatif,
                      klasifikasi: e.target.value,
                    })
                  }
                >
                  <option value="rintisan">Rintisan</option>
                  <option value="berkembang">Berkembang</option>
                  <option value="maju">Maju</option>
                  <option value="mandiri">Mandiri</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Desa Wisata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {updateAlternatif && (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="updateNamaDesa" className="form-label">
                    Nama Desa Wisata
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateNamaDesa"
                    value={updateAlternatif.nama}
                    onChange={(e) =>
                      setUpdateAlternatif({
                        ...updateAlternatif,
                        nama: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updateKlasifikasi" className="form-label">
                    Klasifikasi
                  </label>
                  <select
                    className="form-select"
                    id="updateKlasifikasi"
                    value={updateAlternatif.klasifikasi}
                    onChange={(e) =>
                      setUpdateAlternatif({
                        ...updateAlternatif,
                        klasifikasi: e.target.value,
                      })
                    }
                  >
                    <option value="rintisan">Rintisan</option>
                    <option value="berkembang">Berkembang</option>
                    <option value="maju">Maju</option>
                    <option value="mandiri">Mandiri</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                {error && (
                  <div className="alert alert-danger mt-2">{error}</div>
                )}
              </form>
            )}
          </Modal.Body>
        </Modal>

        <div className="container mt-4">
          {loading ? (
            <div class="d-flex align-items-center">
              <strong>Loading...</strong>
              <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Desa Wisata</th>
                  <th>Klasifikasi</th>
                  <th className="text-nowrap w-10">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {alternatifs.map((alternatif, index) => (
                  <tr key={alternatif.id}>
                    <td>{index + 1}</td> {/* Display the index as the nomor */}
                    <td>{alternatif.nama}</td>
                    <td>{alternatif.klasifikasi}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => openUpdateModal(alternatif)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(alternatif.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

export default Alternatif;
