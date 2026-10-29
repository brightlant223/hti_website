import os
import sqlite3
from pathlib import Path

try:
    import pymysql
except ImportError:
    pymysql = None

try:
    from dotenv import load_dotenv
    BACKEND_DIR = Path(__file__).resolve().parent
    ENV_PATH = BACKEND_DIR / ".env"
    load_dotenv(dotenv_path=ENV_PATH)
    load_dotenv()
except ImportError:
    BACKEND_DIR = Path(__file__).resolve().parent
    ENV_PATH = BACKEND_DIR / ".env"

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "hti_careers_db")

SQLITE_FALLBACK_PATH = BACKEND_DIR / "hti.db"

def test_mysql_connectivity():
    """
    Tests if local MySQL server is reachable with the provided credentials.
    Returns (True, "Connected") or (False, error_message).
    """
    if pymysql is None:
        return False, "PyMySQL module not installed"
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            charset="utf8mb4",
            connect_timeout=3
        )
        conn.close()
        return True, "MySQL Connection Successful"
    except Exception as e:
        return False, str(e)

def get_mysql_connection():
    """
    Establishes connection to MySQL and ensures the database exists.
    """
    # 1. Connect without database first to ensure database exists
    root_conn = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        charset="utf8mb4",
        connect_timeout=4
    )
    with root_conn.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    root_conn.commit()
    root_conn.close()

    # 2. Connect to the specific database
    conn = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )
    return conn

def init_careers_db():
    """
    Initializes the career_applications table in MySQL.
    Falls back to SQLite if MySQL is not currently configured/reachable.
    """
    is_mysql_ok, err_msg = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("""
                CREATE TABLE IF NOT EXISTS career_applications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50) NOT NULL,
                    position VARCHAR(255) NOT NULL,
                    experience VARCHAR(100) DEFAULT '',
                    notice_period VARCHAR(100) DEFAULT '',
                    resume_filename VARCHAR(255) DEFAULT '',
                    resume_url VARCHAR(500) DEFAULT '',
                    cover_letter TEXT,
                    step_saved INT DEFAULT 3,
                    status VARCHAR(50) DEFAULT 'New',
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_status (status),
                    INDEX idx_position (position),
                    INDEX idx_email (email)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                """)
            conn.close()
            print(f"[OK] MySQL initialized successfully for database '{DB_NAME}' on {DB_HOST}:{DB_PORT}")
            sync_sqlite_to_mysql()
            return {"engine": "mysql", "status": "connected", "database": DB_NAME}
        except Exception as e:
            print(f"[WARN] Error initializing MySQL career table: {e}")

    # Fallback initialization in SQLite so applications never fail even if MySQL password is being updated
    try:
        sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
        sq_cursor = sq_conn.cursor()
        sq_cursor.execute("""
        CREATE TABLE IF NOT EXISTS career_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            position TEXT NOT NULL,
            experience TEXT DEFAULT '',
            notice_period TEXT DEFAULT '',
            resume_filename TEXT DEFAULT '',
            resume_url TEXT DEFAULT '',
            cover_letter TEXT DEFAULT '',
            step_saved INTEGER DEFAULT 3,
            status TEXT DEFAULT 'New',
            notes TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        sq_conn.commit()
        sq_conn.close()
        print(f"[INFO] SQLite fallback initialized for career_applications (MySQL pending credentials: {err_msg})")
        return {"engine": "sqlite_fallback", "status": "fallback", "error": err_msg}
    except Exception as sq_err:
        print(f"[ERROR] Failed SQLite fallback init: {sq_err}")
        return {"engine": "none", "error": str(sq_err)}

def sync_sqlite_to_mysql():
    """Migrates any applications stored in SQLite fallback over to MySQL."""
    try:
        if not SQLITE_FALLBACK_PATH.exists():
            return
        sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
        sq_conn.row_factory = sqlite3.Row
        sq_cur = sq_conn.cursor()
        sq_cur.execute("SELECT * FROM career_applications;")
        sq_rows = sq_cur.fetchall()
        sq_conn.close()

        if not sq_rows:
            return

        conn = get_mysql_connection()
        with conn.cursor() as cur:
            for r in sq_rows:
                cur.execute(
                    "SELECT id FROM career_applications WHERE email = %s AND phone = %s AND full_name = %s;",
                    (r['email'], r['phone'], r['full_name'])
                )
                if not cur.fetchone():
                    cur.execute("""
                    INSERT INTO career_applications 
                    (full_name, email, phone, position, experience, notice_period, resume_filename, resume_url, cover_letter, step_saved, status, notes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        r['full_name'], r['email'], r['phone'], r['position'],
                        r['experience'] or '', r['notice_period'] or '',
                        r['resume_filename'] or '', r['resume_url'] or '',
                        r['cover_letter'] or '', r['step_saved'] or 3,
                        r['status'] or 'New', r['notes'] or ''
                    ))
        conn.close()
    except Exception as e:
        print(f"[WARN] Sync SQLite to MySQL notice: {e}")

def get_careers_db_status():
    """
    Returns current health and configuration of MySQL connection.
    """
    is_ok, msg = test_mysql_connectivity()
    return {
        "configured_engine": "mysql",
        "is_connected": is_ok,
        "host": DB_HOST,
        "port": DB_PORT,
        "user": DB_USER,
        "database": DB_NAME,
        "message": msg if not is_ok else "MySQL 8.0 connected and operational"
    }

def insert_career_application(data: dict):
    """
    Inserts a new job application into MySQL, falling back to SQLite if MySQL fails.
    """
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO career_applications 
                (full_name, email, phone, position, experience, notice_period, resume_filename, resume_url, cover_letter, step_saved, status, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    data.get("full_name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("position"),
                    data.get("experience", ""),
                    data.get("notice_period", ""),
                    data.get("resume_filename", ""),
                    data.get("resume_url", ""),
                    data.get("cover_letter", ""),
                    data.get("step_saved", 3),
                    data.get("status", "New"),
                    data.get("notes", "")
                ))
                inserted_id = cursor.lastrowid
                cursor.execute("SELECT * FROM career_applications WHERE id = %s", (inserted_id,))
                row = cursor.fetchone()
            conn.close()
            return {"data": row, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL insert failed, routing to SQLite: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("""
    INSERT INTO career_applications 
    (full_name, email, phone, position, experience, notice_period, resume_filename, resume_url, cover_letter, step_saved, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("full_name"),
        data.get("email"),
        data.get("phone"),
        data.get("position"),
        data.get("experience", ""),
        data.get("notice_period", ""),
        data.get("resume_filename", ""),
        data.get("resume_url", ""),
        data.get("cover_letter", ""),
        data.get("step_saved", 3),
        data.get("status", "New"),
        data.get("notes", "")
    ))
    sq_id = sq_cursor.lastrowid
    sq_conn.commit()
    sq_cursor.execute("SELECT * FROM career_applications WHERE id = ?", (sq_id,))
    row = dict(sq_cursor.fetchone())
    sq_conn.close()
    return {"data": row, "engine": "sqlite"}

def fetch_career_applications(status_filter=None, search=None, position=None):
    """
    Fetches job applications from MySQL, falling back to SQLite if needed.
    """
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                query = "SELECT * FROM career_applications WHERE 1=1"
                params = []
                if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
                    query += " AND LOWER(status) = LOWER(%s)"
                    params.append(status_filter)
                if position and isinstance(position, str) and position.lower() != "all":
                    query += " AND position = %s"
                    params.append(position)
                if search and isinstance(search, str) and search.strip():
                    pattern = f"%{search.strip()}%"
                    query += " AND (full_name LIKE %s OR email LIKE %s OR phone LIKE %s OR position LIKE %s)"
                    params.extend([pattern, pattern, pattern, pattern])

                query += " ORDER BY id DESC"
                cursor.execute(query, tuple(params))
                rows = cursor.fetchall()
            conn.close()
            # Convert datetime objects to string
            for r in rows:
                if r.get("created_at"):
                    r["created_at"] = str(r["created_at"])
                if r.get("updated_at"):
                    r["updated_at"] = str(r["updated_at"])
            return {"items": rows, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL fetch failed, routing to SQLite: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    query = "SELECT * FROM career_applications WHERE 1=1"
    params = []
    if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status_filter)
    if position and isinstance(position, str) and position.lower() != "all":
        query += " AND position = ?"
        params.append(position)
    if search and isinstance(search, str) and search.strip():
        pattern = f"%{search.strip()}%"
        query += " AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR position LIKE ?)"
        params.extend([pattern, pattern, pattern, pattern])

    query += " ORDER BY id DESC"
    sq_cursor.execute(query, tuple(params))
    rows = [dict(r) for r in sq_cursor.fetchall()]
    sq_conn.close()
    return {"items": rows, "engine": "sqlite"}

def update_application_status(app_id: int, new_status: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE career_applications SET status = %s WHERE id = %s", (new_status, app_id))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL update status failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE career_applications SET status = ? WHERE id = ?", (new_status, app_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def update_application_notes(app_id: int, notes: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE career_applications SET notes = %s WHERE id = %s", (notes, app_id))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL update notes failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE career_applications SET notes = ? WHERE id = ?", (notes, app_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def delete_career_application(app_id: int):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM career_applications WHERE id = %s", (app_id,))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL delete failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("DELETE FROM career_applications WHERE id = ?", (app_id,))
    sq_conn.commit()
    sq_conn.close()
    return True

# =========================================================================
# USER ENQUIRIES - CONTACT US DESK (MySQL Powered)
# =========================================================================

def init_user_enquiries_db():
    """
    Initializes the user_enquiries table in MySQL.
    Falls back to SQLite if MySQL is not reachable.
    Seeds realistic sample inquiries if table is empty.
    """
    is_mysql_ok, err_msg = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("""
                CREATE TABLE IF NOT EXISTS user_enquiries (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(255) NOT NULL,
                    company VARCHAR(255) DEFAULT 'Not Specified',
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50) NOT NULL,
                    area_of_interest VARCHAR(255) DEFAULT 'General Enquiry',
                    project_details TEXT NOT NULL,
                    status VARCHAR(50) DEFAULT 'New',
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_status (status),
                    INDEX idx_email (email),
                    INDEX idx_area (area_of_interest)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                """)
                # Check count, if 0 seed sample records
                cursor.execute("SELECT COUNT(*) AS total FROM user_enquiries;")
                res = cursor.fetchone()
                if res and res.get("total", 0) == 0:
                    seed_sql = """
                    INSERT INTO user_enquiries (full_name, company, email, phone, area_of_interest, project_details, status, notes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    sample_enquiries = [
                        (
                            "Rajesh Sharma",
                            "Glenmark Pharmaceuticals",
                            "rajesh.s@glenmarkpharma.example.com",
                            "+91 98201 12345",
                            "Cleanroom Interlocks",
                            "Looking for 8-door flameproof clean room interlocking system with pressure monitoring for our new formulation facility in Navi Mumbai. Need USFDA compliance documents and technical diagram.",
                            "New",
                            "Initial website inquiry submitted via Contact Us form."
                        ),
                        (
                            "Dr. Hiren Patel",
                            "Sun Pharma Cleanroom Div",
                            "hiren.patel@sunpharma.example.com",
                            "+91 98205 99881",
                            "Access Automation",
                            "Need quotation for 6 clean room airlock interlock panels with emergency key override for formulation unit in Gujarat.",
                            "In Review",
                            "Phone call made. Technical datasheet shared."
                        ),
                        (
                            "Sunil Deshmukh",
                            "Reliance Life Sciences",
                            "sunil.d@relbio.example.com",
                            "+91 98192 33445",
                            "Perimeter Defense",
                            "Requirement of 4 automatic electro-hydraulic boom barriers with fast 1.5s opening speed and integrated RFID reader tags for corporate campus.",
                            "Contacted",
                            "Site inspection scheduled with Mumbai engineering desk."
                        ),
                        (
                            "Pooja Kulkarni",
                            "Cipla Bio-Research",
                            "pooja.k@cipla.example.com",
                            "+91 97654 11223",
                            "CCTV Surveillance & Biometrics",
                            "Upgrading to 4K AI video surveillance and face recognition biometric turnstiles for our R&D facility in Vikhroli, Mumbai.",
                            "Qualified",
                            "Approved in preliminary design review."
                        ),
                        (
                            "Amitabh Sen",
                            "Serum Institute of India",
                            "amitabh.sen@serum.example.com",
                            "+91 98230 45678",
                            "Server Room Monitoring",
                            "Server room environment monitoring system (temperature, humidity, water leak detection, rodent repellent) for Pune data center.",
                            "Resolved",
                            "Proposal accepted, awaiting purchase order release."
                        )
                    ]
                    for item in sample_enquiries:
                        cursor.execute(seed_sql, item)
            conn.close()
            print(f"[OK] MySQL user_enquiries table verified in '{DB_NAME}' on {DB_HOST}:{DB_PORT}")
            return {"engine": "mysql", "status": "connected", "database": DB_NAME}
        except Exception as e:
            print(f"[WARN] Error initializing MySQL user_enquiries table: {e}")

    # Fallback to SQLite
    try:
        sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
        sq_cursor = sq_conn.cursor()
        sq_cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            company TEXT DEFAULT 'Not Specified',
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            area_of_interest TEXT DEFAULT 'General Enquiry',
            project_details TEXT NOT NULL,
            status TEXT DEFAULT 'New',
            notes TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        sq_conn.commit()
        sq_conn.close()
        return {"engine": "sqlite_fallback", "status": "fallback", "error": err_msg}
    except Exception as sq_err:
        return {"engine": "none", "error": str(sq_err)}

def get_user_enquiries_db_status():
    is_ok, msg = test_mysql_connectivity()
    return {
        "configured_engine": "mysql",
        "is_connected": is_ok,
        "host": DB_HOST,
        "port": DB_PORT,
        "user": DB_USER,
        "database": DB_NAME,
        "table": "user_enquiries",
        "message": msg if not is_ok else "MySQL 8.0 Live & Connected"
    }

def insert_user_enquiry(data: dict):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO user_enquiries 
                (full_name, company, email, phone, area_of_interest, project_details, status, notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    data.get("full_name") or data.get("fullName") or "",
                    data.get("company") or "Not Specified",
                    data.get("email") or "",
                    data.get("phone") or "",
                    data.get("area_of_interest") or data.get("category") or "General Enquiry",
                    data.get("project_details") or data.get("message") or "",
                    data.get("status", "New"),
                    data.get("notes", "")
                ))
                inserted_id = cursor.lastrowid
                cursor.execute("SELECT * FROM user_enquiries WHERE id = %s", (inserted_id,))
                row = cursor.fetchone()
            conn.close()
            if row:
                if row.get("created_at"):
                    row["created_at"] = str(row["created_at"])
                if row.get("updated_at"):
                    row["updated_at"] = str(row["updated_at"])
            return {"data": row, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL insert user_enquiry failed, falling back: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("""
    INSERT INTO user_enquiries 
    (full_name, company, email, phone, area_of_interest, project_details, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("full_name") or data.get("fullName") or "",
        data.get("company") or "Not Specified",
        data.get("email") or "",
        data.get("phone") or "",
        data.get("area_of_interest") or data.get("category") or "General Enquiry",
        data.get("project_details") or data.get("message") or "",
        data.get("status", "New"),
        data.get("notes", "")
    ))
    sq_id = sq_cursor.lastrowid
    sq_conn.commit()
    sq_cursor.execute("SELECT * FROM user_enquiries WHERE id = ?", (sq_id,))
    row = dict(sq_cursor.fetchone())
    sq_conn.close()
    return {"data": row, "engine": "sqlite"}

def fetch_user_enquiries(status_filter=None, search=None, area_of_interest=None):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                query = "SELECT * FROM user_enquiries WHERE 1=1"
                params = []
                if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
                    query += " AND LOWER(status) = LOWER(%s)"
                    params.append(status_filter)
                if area_of_interest and isinstance(area_of_interest, str) and area_of_interest.lower() != "all":
                    query += " AND area_of_interest = %s"
                    params.append(area_of_interest)
                if search and isinstance(search, str) and search.strip():
                    pattern = f"%{search.strip()}%"
                    query += " AND (full_name LIKE %s OR company LIKE %s OR email LIKE %s OR phone LIKE %s OR area_of_interest LIKE %s OR project_details LIKE %s)"
                    params.extend([pattern, pattern, pattern, pattern, pattern, pattern])

                query += " ORDER BY id DESC"
                cursor.execute(query, tuple(params))
                rows = cursor.fetchall()
            conn.close()
            for r in rows:
                if r.get("created_at"):
                    r["created_at"] = str(r["created_at"])
                if r.get("updated_at"):
                    r["updated_at"] = str(r["updated_at"])
            return {"items": rows, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL fetch user_enquiries failed: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    query = "SELECT * FROM user_enquiries WHERE 1=1"
    params = []
    if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status_filter)
    if area_of_interest and isinstance(area_of_interest, str) and area_of_interest.lower() != "all":
        query += " AND area_of_interest = ?"
        params.append(area_of_interest)
    if search and isinstance(search, str) and search.strip():
        pattern = f"%{search.strip()}%"
        query += " AND (full_name LIKE ? OR company LIKE ? OR email LIKE ? OR phone LIKE ? OR area_of_interest LIKE ? OR project_details LIKE ?)"
        params.extend([pattern, pattern, pattern, pattern, pattern, pattern])

    query += " ORDER BY id DESC"
    sq_cursor.execute(query, tuple(params))
    rows = [dict(r) for r in sq_cursor.fetchall()]
    sq_conn.close()
    return {"items": rows, "engine": "sqlite"}

def update_user_enquiry_status(enquiry_id: int, new_status: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE user_enquiries SET status = %s WHERE id = %s", (new_status, enquiry_id))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL update status failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE user_enquiries SET status = ? WHERE id = ?", (new_status, enquiry_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def update_user_enquiry_notes(enquiry_id: int, notes: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE user_enquiries SET notes = %s WHERE id = %s", (notes, enquiry_id))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL update notes failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE user_enquiries SET notes = ? WHERE id = ?", (notes, enquiry_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def delete_user_enquiry(enquiry_id: int):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM user_enquiries WHERE id = %s", (enquiry_id,))
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] MySQL delete user_enquiry failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("DELETE FROM user_enquiries WHERE id = ?", (enquiry_id,))
    sq_conn.commit()
    sq_conn.close()
    return True

