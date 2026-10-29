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
# MODULE: CONTACT US & SALES ENQUIRIES (MySQL Dual-Engine)
# =========================================================================

def init_inquiries_db():
    """
    Initializes the inquiries table in MySQL.
    Falls back to SQLite if MySQL is not currently configured/reachable.
    Also migrates any existing SQLite inquiries over to MySQL.
    """
    is_mysql_ok, err_msg = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("""
                CREATE TABLE IF NOT EXISTS inquiries (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(255) NOT NULL,
                    company VARCHAR(255) DEFAULT '',
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50) NOT NULL,
                    category VARCHAR(255) DEFAULT 'General Enquiry',
                    product_name VARCHAR(255) DEFAULT '',
                    message TEXT NOT NULL,
                    status VARCHAR(50) DEFAULT 'New',
                    assigned_to VARCHAR(255) DEFAULT 'Unassigned',
                    followup_notes TEXT,
                    last_contacted_at VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_inq_status (status),
                    INDEX idx_inq_email (email),
                    INDEX idx_inq_category (category)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                """)
            conn.close()
            print(f"[OK] MySQL inquiries table initialized successfully for database '{DB_NAME}'")
            sync_sqlite_inquiries_to_mysql()
            return {"engine": "mysql", "status": "connected", "database": DB_NAME}
        except Exception as e:
            print(f"[WARN] Error initializing MySQL inquiries table: {e}")

    # Fallback initialization in SQLite
    try:
        sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
        sq_cursor = sq_conn.cursor()
        sq_cursor.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            company TEXT DEFAULT '',
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            category TEXT DEFAULT 'General Enquiry',
            product_name TEXT DEFAULT '',
            message TEXT NOT NULL,
            status TEXT DEFAULT 'New',
            assigned_to TEXT DEFAULT 'Unassigned',
            followup_notes TEXT DEFAULT '',
            last_contacted_at TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        sq_conn.commit()
        sq_conn.close()
        print(f"[INFO] SQLite fallback initialized for inquiries (MySQL notice: {err_msg})")
        return {"engine": "sqlite_fallback", "status": "fallback", "error": err_msg}
    except Exception as sq_err:
        print(f"[ERROR] Failed SQLite fallback init for inquiries: {sq_err}")
        return {"engine": "none", "error": str(sq_err)}

def sync_sqlite_inquiries_to_mysql():
    """Migrates any existing inquiries stored in SQLite fallback over to MySQL."""
    try:
        if not SQLITE_FALLBACK_PATH.exists():
            return
        sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
        sq_conn.row_factory = sqlite3.Row
        sq_cur = sq_conn.cursor()
        sq_cur.execute("SELECT * FROM inquiries;")
        sq_rows = sq_cur.fetchall()
        sq_conn.close()

        if not sq_rows:
            return

        conn = get_mysql_connection()
        with conn.cursor() as cur:
            for r in sq_rows:
                cur.execute(
                    "SELECT id FROM inquiries WHERE email = %s AND phone = %s AND full_name = %s AND message = %s;",
                    (r['email'], r['phone'], r['full_name'], r['message'])
                )
                if not cur.fetchone():
                    cur.execute("""
                    INSERT INTO inquiries 
                    (full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes, last_contacted_at, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        r['full_name'],
                        r['company'] if 'company' in r.keys() and r['company'] else '',
                        r['email'],
                        r['phone'],
                        r['category'] if 'category' in r.keys() and r['category'] else 'General Enquiry',
                        r['product_name'] if 'product_name' in r.keys() and r['product_name'] else '',
                        r['message'],
                        r['status'] if 'status' in r.keys() and r['status'] else 'New',
                        r['assigned_to'] if 'assigned_to' in r.keys() and r['assigned_to'] else 'Unassigned',
                        r['followup_notes'] if 'followup_notes' in r.keys() and r['followup_notes'] else '',
                        r['last_contacted_at'] if 'last_contacted_at' in r.keys() else None,
                        r['created_at'] if 'created_at' in r.keys() and r['created_at'] else None
                    ))
        conn.close()
    except Exception as e:
        print(f"[WARN] Sync SQLite inquiries to MySQL notice: {e}")

def get_inquiries_db_status():
    """Returns current health and configuration of MySQL connection for inquiries."""
    is_ok, msg = test_mysql_connectivity()
    return {
        "configured_engine": "mysql",
        "is_connected": is_ok,
        "host": DB_HOST,
        "port": DB_PORT,
        "user": DB_USER,
        "database": DB_NAME,
        "table": "inquiries",
        "message": msg if not is_ok else "MySQL 8.0 connected and operational"
    }

def insert_inquiry(data: dict):
    """
    Inserts a new Contact Us / Website enquiry into MySQL, falling back to SQLite if needed.
    """
    full_name = data.get("full_name") or data.get("name") or "Website Visitor"
    company = data.get("company") or ""
    email = data.get("email") or ""
    phone = data.get("phone") or ""
    category = data.get("category") or data.get("area_of_interest") or "General Enquiry"
    product_name = data.get("product_name") or category
    message = data.get("message") or data.get("project_details") or ""
    status = data.get("status") or "New"
    assigned_to = data.get("assigned_to") or "Unassigned"
    followup_notes = data.get("followup_notes") or data.get("notes") or ""

    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO inquiries 
                (full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes
                ))
                inserted_id = cursor.lastrowid
                cursor.execute("SELECT * FROM inquiries WHERE id = %s", (inserted_id,))
                row = cursor.fetchone()
            conn.close()
            if row:
                if row.get("created_at"):
                    row["created_at"] = str(row["created_at"])
                if row.get("updated_at"):
                    row["updated_at"] = str(row["updated_at"])
            # Mirror to SQLite fallback for consistency
            try:
                sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
                sq_cur = sq_conn.cursor()
                sq_cur.execute("""
                INSERT INTO inquiries (full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes))
                sq_conn.commit()
                sq_conn.close()
            except Exception:
                pass
            return {"data": row, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL inquiry insert failed, routing to SQLite: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("""
    INSERT INTO inquiries 
    (full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        full_name, company, email, phone, category, product_name, message, status, assigned_to, followup_notes
    ))
    sq_id = sq_cursor.lastrowid
    sq_conn.commit()
    sq_cursor.execute("SELECT * FROM inquiries WHERE id = ?", (sq_id,))
    row = dict(sq_cursor.fetchone())
    sq_conn.close()
    return {"data": row, "engine": "sqlite"}

def fetch_inquiries(status_filter=None, search=None, category=None):
    """
    Fetches inquiries from MySQL, falling back to SQLite if needed.
    """
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                query = "SELECT * FROM inquiries WHERE 1=1"
                params = []
                if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
                    if status_filter.lower() == "closed":
                        query += " AND LOWER(status) IN ('closed', 'resolved', 'in review')"
                    else:
                        query += " AND LOWER(status) = LOWER(%s)"
                        params.append(status_filter)
                if category and isinstance(category, str) and category.lower() != "all":
                    query += " AND (category = %s OR product_name = %s)"
                    params.extend([category, category])
                if search and isinstance(search, str) and search.strip():
                    pattern = f"%{search.strip().lower()}%"
                    query += " AND (LOWER(full_name) LIKE %s OR LOWER(company) LIKE %s OR LOWER(email) LIKE %s OR LOWER(phone) LIKE %s OR LOWER(category) LIKE %s OR LOWER(product_name) LIKE %s OR LOWER(message) LIKE %s)"
                    params.extend([pattern, pattern, pattern, pattern, pattern, pattern, pattern])

                query += " ORDER BY id DESC"
                cursor.execute(query, tuple(params))
                rows = cursor.fetchall()
            conn.close()
            for r in rows:
                if r.get("created_at"):
                    r["created_at"] = str(r["created_at"])
                if r.get("updated_at"):
                    r["updated_at"] = str(r["updated_at"])
                if not r.get("company"):
                    r["company"] = "Enterprise Customer"
                if not r.get("category"):
                    r["category"] = "General Enquiry"
            return {"items": rows, "engine": "mysql"}
        except Exception as e:
            print(f"[WARN] MySQL inquiries fetch failed, routing to SQLite: {e}")

    # Fallback to SQLite
    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_conn.row_factory = sqlite3.Row
    sq_cursor = sq_conn.cursor()
    query = "SELECT * FROM inquiries WHERE 1=1"
    params = []
    if status_filter and isinstance(status_filter, str) and status_filter.lower() != "all":
        if status_filter.lower() == "closed":
            query += " AND LOWER(status) IN ('closed', 'resolved', 'in review')"
        else:
            query += " AND LOWER(status) = LOWER(?)"
            params.append(status_filter)
    if category and isinstance(category, str) and category.lower() != "all":
        query += " AND (category = ? OR product_name = ?)"
        params.extend([category, category])
    if search and isinstance(search, str) and search.strip():
        pattern = f"%{search.strip().lower()}%"
        query += " AND (LOWER(full_name) LIKE ? OR LOWER(company) LIKE ? OR LOWER(email) LIKE ? OR LOWER(phone) LIKE ? OR LOWER(category) LIKE ? OR LOWER(product_name) LIKE ? OR LOWER(message) LIKE ?)"
        params.extend([pattern, pattern, pattern, pattern, pattern, pattern, pattern])

    query += " ORDER BY id DESC"
    sq_cursor.execute(query, tuple(params))
    rows = [dict(r) for r in sq_cursor.fetchall()]
    sq_conn.close()
    for r in rows:
        if not r.get("company"):
            r["company"] = "Enterprise Customer"
        if not r.get("category"):
            r["category"] = "General Enquiry"
    return {"items": rows, "engine": "sqlite"}

def update_inquiry_status(inquiry_id: int, new_status: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE inquiries SET status = %s WHERE id = %s", (new_status, inquiry_id))
            conn.close()
        except Exception as e:
            print(f"[WARN] MySQL update inquiry status failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE inquiries SET status = ? WHERE id = ?", (new_status, inquiry_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def update_inquiry_notes(inquiry_id: int, notes: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE inquiries SET followup_notes = %s WHERE id = %s", (notes, inquiry_id))
            conn.close()
        except Exception as e:
            print(f"[WARN] MySQL update inquiry notes failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE inquiries SET followup_notes = ? WHERE id = ?", (notes, inquiry_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def update_inquiry_assigned(inquiry_id: int, assigned_to: str):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("UPDATE inquiries SET assigned_to = %s WHERE id = %s", (assigned_to, inquiry_id))
            conn.close()
        except Exception as e:
            print(f"[WARN] MySQL update inquiry assignment failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("UPDATE inquiries SET assigned_to = ? WHERE id = ?", (assigned_to, inquiry_id))
    sq_conn.commit()
    sq_conn.close()
    return True

def update_inquiry_details(inquiry_id: int, data: dict):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("""
                UPDATE inquiries 
                SET full_name = %s, email = %s, phone = %s, company = %s, category = %s, product_name = %s, message = %s, status = %s, assigned_to = %s
                WHERE id = %s
                """, (
                    data.get("full_name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("company", ""),
                    data.get("category", "General Enquiry"),
                    data.get("product_name", ""),
                    data.get("message", ""),
                    data.get("status", "New"),
                    data.get("assigned_to", "Unassigned"),
                    inquiry_id
                ))
            conn.close()
        except Exception as e:
            print(f"[WARN] MySQL update inquiry details failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("""
    UPDATE inquiries 
    SET full_name = ?, email = ?, phone = ?, company = ?, category = ?, product_name = ?, message = ?, status = ?, assigned_to = ?
    WHERE id = ?
    """, (
        data.get("full_name"),
        data.get("email"),
        data.get("phone"),
        data.get("company", ""),
        data.get("category", "General Enquiry"),
        data.get("product_name", ""),
        data.get("message", ""),
        data.get("status", "New"),
        data.get("assigned_to", "Unassigned"),
        inquiry_id
    ))
    sq_conn.commit()
    sq_conn.close()
    return True

def delete_inquiry(inquiry_id: int):
    is_mysql_ok, _ = test_mysql_connectivity()
    if is_mysql_ok:
        try:
            conn = get_mysql_connection()
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM inquiries WHERE id = %s", (inquiry_id,))
            conn.close()
        except Exception as e:
            print(f"[WARN] MySQL delete inquiry failed: {e}")

    sq_conn = sqlite3.connect(SQLITE_FALLBACK_PATH)
    sq_cursor = sq_conn.cursor()
    sq_cursor.execute("DELETE FROM inquiries WHERE id = ?", (inquiry_id,))
    sq_conn.commit()
    sq_conn.close()
    return True

