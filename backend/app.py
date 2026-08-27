import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_restful import Resource, Api
# from models import Alternatif, Penilaian  # Adjust according to your actual models


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/db_upwisatasleman'  # Ensure correct DB URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)  # Allow CORS for all domains
api = Api(app)  # Initialize Flask-RESTful API

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR(50), unique=True, nullable=False)  # Changed to VARCHAR
    password = db.Column(db.VARCHAR(200), nullable=False)  # Changed to VARCHAR

    def serialize(self):
        return {'id': self.id, 'username': self.username}

class Alternatif(db.Model):
    __tablename__ = 'alternatif'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.VARCHAR(50), nullable=False)  # Changed to VARCHAR
    klasifikasi = db.Column(db.Enum('Rintisan', 'Berkembang', 'Maju', 'Mandiri'), nullable=False)

    def serialize(self):
        return {'id': self.id, 'nama': self.nama, 'klasifikasi': self.klasifikasi}

class Kriteria(db.Model):
    __tablename__ = 'kriteria'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.VARCHAR(50), nullable=False)  # Changed to VARCHAR
    bobot = db.Column(db.Float, nullable=False)
    tipe = db.Column(db.Enum('Benefit', 'Cost'), nullable=False)

    def serialize(self):
        return {'id': self.id, 'nama': self.nama, 'bobot': self.bobot, 'tipe': self.tipe}

class Penilaian(db.Model):
    __tablename__ = 'penilaian'
    id = db.Column(db.Integer, primary_key=True)
    id_alternatif = db.Column(db.Integer, db.ForeignKey('alternatif.id'), nullable=False)
    id_kriteria = db.Column(db.Integer, db.ForeignKey('kriteria.id'), nullable=False)
    value = db.Column(db.Float, nullable=False)

    alternatif = db.relationship('Alternatif', backref='penilaian')
    kriteria = db.relationship('Kriteria', backref='penilaian')

    def serialize(self):
        return {'id': self.id, 'id_alternatif': self.id_alternatif, 'id_kriteria': self.id_kriteria, 'value': self.value}


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if not re.match("^[a-zA-Z0-9]+$", username):
            return jsonify({"message": "Nama pengguna hanya boleh mengandung huruf dan angka."}), 400

        if username.isdigit():
            return jsonify({"message": "Username cannot be only digits."}), 400

        if len(password) < 8:
            return jsonify({"message": "Password harus memiliki panjang minimal 8 karakter."}), 400

        if password != confirm_password:
            return jsonify({"message": "Password dan konfirmasi password tidak cocok."}), 400

        # Cek apakah username sudah terdaftar
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"message": "Username sudah terdaftar."}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Pengguna berhasil terdaftar."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Endpoint for Login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "Pengguna tidak ditemukan."}), 404

        if not check_password_hash(user.password, password):
            return jsonify({"message": "Kata sandi yang diberikan tidak valid"}), 401

        return jsonify({"message": "Login berhasil!", "username": user.username}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Endpoint for Alternatif
@app.route('/alternatif', methods=['POST'])
def create_alternatif():
    try:
        data = request.json
        new_alternatif = Alternatif(nama=data['nama'], klasifikasi=data['klasifikasi'])
        db.session.add(new_alternatif)
        db.session.commit()
        return jsonify(new_alternatif.serialize()), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/alternatif', methods=['GET'])
def get_alternatif():
    try:
        alternatif = Alternatif.query.all()
        return jsonify([alt.serialize() for alt in alternatif])
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/alternatif/<int:id>', methods=['PUT'])
def update_alternatif(id):
    try:
        data = request.json
        alternatif = Alternatif.query.get_or_404(id)

        alternatif.nama = data.get('nama', alternatif.nama)
        alternatif.klasifikasi = data.get('klasifikasi', alternatif.klasifikasi)

        db.session.commit()
        return jsonify({'message': 'Alternatif berhasil diupdate!'}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/alternatif/<int:id>', methods=['PATCH'])
def patch_alternatif(id):
    try:
        data = request.json
        alternatif = Alternatif.query.get_or_404(id)

        if 'nama' in data:
            alternatif.nama = data['nama']
        if 'klasifikasi' in data:
            alternatif.klasifikasi = data['klasifikasi']

        db.session.commit()
        return jsonify(alternatif.serialize()), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/alternatif/<int:id>', methods=['DELETE'])
def delete_alternatif(id):
    try:
        alternatif = Alternatif.query.get(id)
        if not alternatif:
            return jsonify({'message': 'Alternatif tidak tersedia.'}), 404

        db.session.delete(alternatif)
        db.session.commit()
        return jsonify({'message': 'Alternatif berhasil dihapus!'}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Endpoint for Kriteria
@app.route('/kriteria', methods=['GET'])
def get_kriteria():
    try:
        kriteria = Kriteria.query.all()
        return jsonify([kri.serialize() for kri in kriteria])
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Endpoint for Penilaian
@app.route('/penilaian', methods=['POST'])
def create_penilaian():
    try:
        data = request.json
        id_alternatif = data['id_alternatif']
        values = data['value']  # Pastikan 'value' adalah dictionary

        for kriteria, nilai in values.items():
           
            kriteria_obj = Kriteria.query.filter_by(id=kriteria).first()
            print(kriteria_obj)
            if not kriteria_obj:
                return jsonify({"message": f"Kriteria '{kriteria}' not found."}), 400
            new_penilaian = Penilaian(
                id_alternatif=id_alternatif,
                id_kriteria=kriteria_obj.id,
                value=nilai
            )
            db.session.add(new_penilaian)
        db.session.commit()
        return jsonify({"message": "Penilaian berhasil ditambahkan!!"}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/penilaian', methods=['GET'])
def get_penilaian():
    try:
        penilaian = Penilaian.query.with_entities(
            Penilaian.id, Penilaian.id_alternatif, Alternatif.nama.label('nama_alt'),
            Penilaian.id_kriteria, Kriteria.nama.label('nama_krt'), Penilaian.value
        ).join(Alternatif).join(Kriteria).order_by(
            Alternatif.id, Kriteria.id
        ).all()
        return jsonify([pen._asdict() for pen in penilaian])
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/penilaian/<int:id>', methods=['PUT'])
def update_penilaian(id):
    try:
        data = request.json
        penilaian = Penilaian.query.filter_by(id_alternatif=data['id_alternatif']).all()

        # Update each value based on the provided values
        for kriteria_id, value in data['value'].items():
            penilaian_item = Penilaian.query.filter_by(id_alternatif=data['id_alternatif'], id_kriteria=kriteria_id).first()
            if penilaian_item:
                penilaian_item.value = value
            else:
                # Jika penilaian tidak ada, Anda bisa memilih untuk menambahkannya
                new_penilaian = Penilaian(
                    id_alternatif=data['id_alternatif'],
                    id_kriteria=kriteria_id,
                    value=value
                )
                db.session.add(new_penilaian)

        db.session.commit()
        return jsonify({"message": "Penilaian berhasil diupdate!"})
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
@app.route('/penilaian/<int:id>', methods=['PATCH'])
def patch_penilaian(id):
    try:
        data = request.json
        penilaian = Penilaian.query.get_or_404(id)

        if 'id_alternatif' in data:
            penilaian.id_alternatif = data['id_alternatif']
        if 'id_kriteria' in data:
            penilaian.id_kriteria = data['id_kriteria']
        if 'value' in data:
            penilaian.value = data['value']

        db.session.commit()
        return jsonify(penilaian.serialize())
        # return jsonify({"message": "Penilaian updated successfully!"}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/penilaian/<int:id>', methods=['DELETE'])
def delete_penilaian(id):
    try:
        penilaian = Penilaian.query.filter_by(id_alternatif=id).all()  # Mengambil penilaian berdasarkan ID
        for nilai in penilaian:
            db.session.delete(nilai)
        db.session.commit()  # Menyimpan perubahan
        return jsonify({"message": "Penilaian berhasil dihapus!"}), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)
