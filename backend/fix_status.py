import database

def fix_status():
    conn = database.get_db_connection()
    if conn is None:
        print("DB fail")
        return
    try:
        cursor = conn.cursor()
        print("Updating all berita status to 'published'...")
        cursor.execute("UPDATE berita SET status = 'publish'")
        conn.commit()
        print(f"Updated {cursor.rowcount} rows.")
        
        cursor.execute("SELECT id, title, status FROM berita")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
            
    except Exception as e:
        print(e)
    finally:
        conn.close()

if __name__ == "__main__":
    fix_status()
