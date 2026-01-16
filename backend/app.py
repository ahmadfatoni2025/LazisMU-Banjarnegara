from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db_connection
import os
import random
import string
import jwt
import datetime
from functools import wraps
from dotenv import load_dotenv
from werkzeug.security import check_password_hash

load_dotenv()

app = Flask(__name__, static_folder='static')
CORS(app)
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'lazismu_secret_key_2024')
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static/uploads')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

from werkzeug.utils import secure_filename

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        # Add a timestamp to avoid name collisions
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{timestamp}_{filename}"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        return jsonify({'url': f'http://localhost:3000/static/uploads/{unique_filename}'})


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            if data.get('role') != 'admin':
                return jsonify({'message': 'Admin access required!'}), 403
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
            
        return f(*args, **kwargs)
    
    return decorated

def generate_transaction_id():
    chars = string.ascii_uppercase + string.digits
    return 'LZM' + ''.join(random.choice(chars) for _ in range(10))

@app.route('/', methods=['GET'])
def index():
    return "API LazisMU Aktif di Port 3000 (Python Flask)"

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({'message': 'Username and password required'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Gagal terhubung ke database"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (auth.get('username'),))
        user = cursor.fetchone()

        if user and check_password_hash(user['password_hash'], auth.get('password')):
            if user['role'] != 'admin':
                return jsonify({'message': 'Hanya admin yang bisa login ke panel ini'}), 403
                
            token = jwt.encode({
                'user_id': user['id'],
                'username': user['username'],
                'role': user['role'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm="HS256")

            return jsonify({
                'token': token,
                'user': {
                    'username': user['username'],
                    'role': user['role']
                }
            })

        return jsonify({'message': 'Username atau password salah'}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/statistik', methods=['GET'])
def get_statistik():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Gagal terhubung ke database"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        sql = "SELECT * FROM statistik_donasi"
        cursor.execute(sql)
        result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/statistik/<int:stat_id>', methods=['PUT', 'DELETE'])
@token_required
def modify_statistik(stat_id):
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        if request.method == 'PUT':
            data = request.json
            sql = "UPDATE statistik_donasi SET katgori=%s, total_jiwa=%s, total_donasi=%s WHERE id=%s"
            cursor.execute(sql, (data.get('katgori'), data.get('total_jiwa'), data.get('total_donasi'), stat_id))
            conn.commit()
            return jsonify({"message": "Statistik updated"})
        if request.method == 'DELETE':
            cursor.execute("DELETE FROM statistik_donasi WHERE id=%s", (stat_id,))
            conn.commit()
            return jsonify({"message": "Statistik deleted"})
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/campaigns', methods=['GET'])
def get_campaign_stats():
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        sql = "SELECT campaign_name, SUM(nominal) as total_collected FROM transaksi WHERE status='berhasil' GROUP BY campaign_name"
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/transaksi', methods=['GET', 'POST'])
def handle_transaksi():
    if request.method == 'GET':
        conn = get_db_connection()
        if conn is None: return jsonify({"error": "DB Error"}), 500
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM transaksi ORDER BY created_at DESC")
            return jsonify(cursor.fetchall())
        except Exception as e: return jsonify({"error": str(e)}), 500
        finally:
            if conn.is_connected():
                cursor.close()
                conn.close()

    data = request.json
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        transaction_id = generate_transaction_id()
        nominal = float(data.get('amount', 0))
        sql = """
            INSERT INTO transaksi 
            (transaction_id, nama_donatur, email, nomor_wa, program_utama, sub_program, campaign_name, nominal, pesan, metode_pembayaran, is_anonim, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'berhasil')
        """
        values = (transaction_id, data.get('name', 'Hamba Allah'), data.get('email'), data.get('phone'), data.get('program_utama'), data.get('sub_program'), data.get('campaign_name'), nominal, data.get('message'), data.get('payment_method'), data.get('is_anonymous', False))
        cursor.execute(sql, values)
        
        program_to_kategori = {'Beasiswa Pendidikan': 'Pendidikan', 'Infaq Umum': 'Sosial', 'Zakat Maal': 'Sosial', 'Pemberdayaan UMKM': 'Ekonomi', 'Layanan Kesehatan': 'Kesehatan'}
        kategori_db = program_to_kategori.get(data.get('program_utama'), 'Sosial')
        cursor.execute("UPDATE statistik_donasi SET total_donasi = total_donasi + %s, total_jiwa = total_jiwa + 1 WHERE katgori = %s", (nominal, kategori_db))
        if cursor.rowcount == 0:
            cursor.execute("INSERT INTO statistik_donasi (katgori, total_donasi, total_jiwa) VALUES (%s, %s, 1)", (kategori_db, nominal))
        conn.commit()
        return jsonify({"status": "success", "transaction_id": transaction_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/berita', methods=['GET', 'POST'])
def handle_berita():
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        if request.method == 'GET':
            # Jika admin (punya token), tampilkan semua. Jika tidak, hanya yang status='published'
            token = None
            if 'Authorization' in request.headers:
                auth_header = request.headers['Authorization']
                if auth_header.startswith('Bearer '):
                    token = auth_header.split(" ")[1]
            
            is_admin = False
            if token:
                try:
                    decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                    if decoded.get('role') == 'admin': is_admin = True
                except: pass
            
            if is_admin:
                cursor.execute("SELECT * FROM berita ORDER BY created_at DESC")
            else:
                cursor.execute("SELECT * FROM berita WHERE status = 'publish' ORDER BY created_at DESC")
            return jsonify(cursor.fetchall())
        
        if request.method == 'POST':
            # POST is protected by default by token_required or manual check
            # Use manual check here for flexibility with the same route
            # ... or just use @token_required if we split routes.
            pass
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/berita_admin', methods=['POST'])
@token_required
def create_berita():
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        data = request.json
        sql = """
            INSERT INTO berita (title, author, image_url, content, category, excerpt, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (data.get('title'), data.get('author', 'Administrator'), data.get('image_url'), data.get('content'), data.get('category'), data.get('excerpt'), data.get('status', 'publish'))
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({"message": "Berita created", "id": cursor.lastrowid}), 201
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/berita_admin/<int:news_id>', methods=['PUT', 'DELETE'])
@token_required
def modify_berita(news_id):
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        if request.method == 'PUT':
            data = request.json
            sql = """
                UPDATE berita SET title=%s, author=%s, image_url=%s, content=%s, category=%s, excerpt=%s, status=%s
                WHERE id=%s
            """
            values = (data.get('title'), data.get('author'), data.get('image_url'), data.get('content'), data.get('category'), data.get('excerpt'), data.get('status'), news_id)
            cursor.execute(sql, values)
            conn.commit()
            return jsonify({"message": "Berita updated"})
        if request.method == 'DELETE':
            cursor.execute("DELETE FROM berita WHERE id=%s", (news_id,))
            conn.commit()
            return jsonify({"message": "Berita deleted"})
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/berita/<int:news_id>', methods=['GET'])
def get_berita_detail(news_id):
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM berita WHERE id = %s", (news_id,))
        result = cursor.fetchone()
        return jsonify(result) if result else (jsonify({"error": "Not found"}), 404)
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/programs', methods=['GET'])
def get_programs():
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM donation_programs ORDER BY created_at ASC")
        return jsonify(cursor.fetchall())
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/programs_admin', methods=['POST'])
@token_required
def add_program():
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        data = request.json
        sql = "INSERT INTO donation_programs (id, title, `desc`, icon, color, gradient) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (data.get('id'), data.get('title'), data.get('desc'), data.get('icon'), data.get('color'), data.get('gradient')))
        conn.commit()
        return jsonify({"message": "Program added"})
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/programs_admin/<string:prog_id>', methods=['PUT', 'DELETE'])
@token_required
def modify_program(prog_id):
    conn = get_db_connection()
    if conn is None: return jsonify({"error": "DB Error"}), 500
    try:
        cursor = conn.cursor()
        if request.method == 'PUT':
            data = request.json
            sql = "UPDATE donation_programs SET title=%s, `desc`=%s, icon=%s, color=%s, gradient=%s WHERE id=%s"
            cursor.execute(sql, (data.get('title'), data.get('desc'), data.get('icon'), data.get('color'), data.get('gradient'), prog_id))
            conn.commit()
            return jsonify({"message": "Program updated"})
        if request.method == 'DELETE':
            cursor.execute("DELETE FROM donation_programs WHERE id=%s", (prog_id,))
            conn.commit()
            return jsonify({"message": "Program deleted"})
    except Exception as e: return jsonify({"error": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    port = int(os.getenv('PORT_PY', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
