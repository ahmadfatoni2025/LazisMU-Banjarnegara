import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    config = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', ''),
        'database': os.getenv('DB_NAME', 'db_lazis')
    }
    
    try:
        conn = mysql.connector.connect(**config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def test_connection():
    conn = get_db_connection()
    if conn and conn.is_connected():
        print("Database connected")
        conn.close()
    else:
        print("Database connection failed")

if __name__ == "__main__":
    test_connection()
