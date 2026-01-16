-- Create database if not exists
CREATE DATABASE IF NOT EXISTS db_lazis;
USE db_lazis;

-- Table statistik_donasi
CREATE TABLE IF NOT EXISTS statistik_donasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katgori VARCHAR(50) NOT NULL,
    total_donasi DECIMAL(15, 2) DEFAULT 0.00,
    total_jiwa INT DEFAULT 0
);

-- Table transaksi
CREATE TABLE IF NOT EXISTS transaksi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    nama_donatur VARCHAR(100),
    email VARCHAR(100),
    nomor_wa VARCHAR(20),
    program_utama VARCHAR(100),
    sub_program VARCHAR(100),
    campaign_name VARCHAR(255),
    nominal DECIMAL(15, 2) DEFAULT 0.00,
    pesan TEXT,
    metode_pembayaran VARCHAR(50),
    is_anonim BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table berita
CREATE TABLE IF NOT EXISTS berita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) DEFAULT 'Administrator',
    image_url TEXT,
    content TEXT,
    category VARCHAR(50),
    excerpt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial data for statistik
INSERT INTO statistik_donasi (katgori, total_donasi, total_jiwa) 
SELECT * FROM (
    SELECT 'Pendidikan' as k, 0.0 as d, 0 as j
    UNION SELECT 'Kesehatan', 0.0, 0
    UNION SELECT 'Ekonomi', 0.0, 0
    UNION SELECT 'Sosial', 0.0, 0
) AS tmp
WHERE NOT EXISTS (
    SELECT katgori FROM statistik_donasi 
);
