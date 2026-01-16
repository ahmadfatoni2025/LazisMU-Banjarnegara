import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_config():
    return {
        'host': os.getenv('DB_HOST', 'localhost'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', ''),
        'database': os.getenv('DB_NAME', 'db_lazis')
    }

def create_tables():
    config = get_db_config()
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        
        # Tabel Users (Admin)
        print("Checking table: users...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Tabel Berita
        print("Checking table: berita...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS berita (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255),
                author VARCHAR(100) DEFAULT 'Administrator',
                image_url TEXT,
                excerpt TEXT,
                content LONGTEXT,
                category VARCHAR(50),
                status ENUM('draft', 'published') DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """)

        # Tabel Statistik Donasi
        print("Checking table: statistik_donasi...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS statistik_donasi (
                id INT AUTO_INCREMENT PRIMARY KEY,
                katgori VARCHAR(50) NOT NULL,
                total_jiwa INT DEFAULT 0,
                total_donasi DECIMAL(15, 2) DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """)

        # Tabel Transaksi
        print("Checking table: transaksi...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS transaksi (
                id INT AUTO_INCREMENT PRIMARY KEY,
                transaction_id VARCHAR(50) NOT NULL UNIQUE,
                nama_donatur VARCHAR(100),
                email VARCHAR(100),
                nomor_wa VARCHAR(20),
                program_utama VARCHAR(100),
                sub_program VARCHAR(100),
                campaign_name VARCHAR(100),
                nominal DECIMAL(15, 2) NOT NULL,
                pesan TEXT,
                metode_pembayaran VARCHAR(50),
                is_anonim BOOLEAN DEFAULT FALSE,
                status ENUM('pending', 'berhasil', 'gagal') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Tabel Donation Programs
        print("Checking table: donation_programs...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS donation_programs (
                id VARCHAR(50) PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                `desc` TEXT,
                icon VARCHAR(50),
                color VARCHAR(50),
                gradient VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.commit()
        print("All tables created or verified successfully!")
        
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    create_tables()
