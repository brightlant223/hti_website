from fastapi import FastAPI, HTTPException, Query, status, Header, Response, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import json
import re
import os
import sys
import time
import shutil
import sqlite3
import datetime
import subprocess
from pathlib import Path
from contextlib import asynccontextmanager

from database import init_db, seed_db, get_connection, add_audit_log, DB_PATH
from mysql_db import (
    init_careers_db,
    get_careers_db_status,
    insert_career_application,
    fetch_career_applications,
    update_application_status,
    update_application_notes,
    delete_career_application
)

SERVER_START_TIME = time.time()

# Media and uploads directories
FRONTEND_UPLOAD_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "uploads"
FRONTEND_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
BACKEND_UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
BACKEND_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
RESUME_UPLOAD_DIR = FRONTEND_UPLOAD_DIR / "resumes"
RESUME_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
BACKEND_RESUME_DIR = BACKEND_UPLOAD_DIR / "resumes"
BACKEND_RESUME_DIR.mkdir(parents=True, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_db()
    init_careers_db()
    yield

app = FastAPI(
    title="HTI Automation & Security Systems API",
    description="Official Enterprise API for HTI website content, product catalogue, case studies, inquiries, and system administration",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded static media
app.mount("/uploads", StaticFiles(directory=str(FRONTEND_UPLOAD_DIR)), name="uploads")

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

# =========================================================================
# PYDANTIC SCHEMAS
# =========================================================================

class InquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=120)
    phone: str = Field(..., min_length=7, max_length=20)
    company: Optional[str] = Field(None, max_length=150)
    category: Optional[str] = Field(None, max_length=100)
    product_name: Optional[str] = Field(None, max_length=150)
    message: str = Field(..., min_length=5, max_length=2000)

class InquiryStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(New|Contacted|Qualified|Converted|Closed|In Review|Resolved)$")

class InquiryAssignUpdate(BaseModel):
    assigned_to: str = Field(..., min_length=2, max_length=100)

class InquiryNotesUpdate(BaseModel):
    notes: str = Field(..., max_length=3000)

class InquiryFullUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    category: Optional[str] = None
    product_name: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    followup_notes: Optional[str] = None

class ProductCreateUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    category: str = Field(..., min_length=2, max_length=100)
    subcategory: str = Field(..., min_length=1, max_length=150)
    tagline: Optional[str] = ""
    description: str = Field(..., min_length=5)
    features: List[str] = Field(default_factory=list)
    specs: Dict[str, str] = Field(default_factory=dict)
    applications: List[str] = Field(default_factory=list)
    badge: Optional[str] = None
    is_featured: Optional[bool] = False
    image_url: Optional[str] = None
    gallery: Optional[List[str]] = Field(default_factory=list)
    brochure_url: Optional[str] = None
    datasheet_url: Optional[str] = None
    video_url: Optional[str] = None
    is_published: Optional[bool] = True
    display_order: Optional[int] = 0
    slug: Optional[str] = None

class BlogCreateUpdate(BaseModel):
    title: str = Field(..., min_length=3, max_length=250)
    category: str = Field(..., min_length=2, max_length=100)
    author: Optional[str] = "HTI Engineering Team"
    read_time: Optional[str] = "5 min read"
    excerpt: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=20)
    image_url: Optional[str] = None
    is_published: Optional[bool] = True
    tags: Optional[str] = ""
    seo_title: Optional[str] = None
    meta_description: Optional[str] = None
    scheduled_at: Optional[str] = None
    slug: Optional[str] = None

class ClientCreateUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    sector: str = Field(..., min_length=2, max_length=150)
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    is_active: Optional[bool] = True
    display_order: Optional[int] = 0
    is_authorized: Optional[bool] = True

class PartnerCreateUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    category: str = Field(..., min_length=2, max_length=150)
    tagline: Optional[str] = ""
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    is_active: Optional[bool] = True
    display_order: Optional[int] = 0
    is_authorized: Optional[bool] = True

class ProjectCreateUpdate(BaseModel):
    title: str = Field(..., min_length=3, max_length=250)
    client_name: Optional[str] = ""
    client_approved: Optional[bool] = True
    industry: str = Field(..., min_length=2, max_length=150)
    location: str = Field(..., min_length=2, max_length=150)
    completion_year: Optional[str] = "2024"
    description: str = Field(..., min_length=10)
    image_url: Optional[str] = None
    related_products: List[str] = Field(default_factory=list)
    is_published: Optional[bool] = True
    display_order: Optional[int] = 0
    slug: Optional[str] = None

class AdminLoginRequest(BaseModel):
    username: str = Field(..., min_length=2)
    password: str = Field(..., min_length=3)

class AdminUserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=4, max_length=100)
    full_name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=120)
    role: str = Field("Editor", pattern="^(Administrator|Editor|Viewer)$")
    is_active: Optional[bool] = True

class AdminUserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = Field(None, pattern="^(Administrator|Editor|Viewer)$")
    is_active: Optional[bool] = None
    password: Optional[str] = None

class WebsiteContentUpdate(BaseModel):
    data: Dict[str, Any]

class SystemSettingsUpdate(BaseModel):
    settings: Dict[str, str]

# =========================================================================
# HELPER ROW FORMATTERS
# =========================================================================

def format_product_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    gallery_val = []
    if "gallery" in keys and row["gallery"]:
        try:
            gallery_val = json.loads(row["gallery"])
        except Exception:
            gallery_val = []

    return {
        "id": row["id"],
        "slug": row["slug"],
        "name": row["name"],
        "category": row["category"],
        "subcategory": row["subcategory"],
        "tagline": row["tagline"] or "",
        "description": row["description"],
        "features": json.loads(row["features"]) if row["features"] else [],
        "specs": json.loads(row["specs"]) if row["specs"] else {},
        "applications": json.loads(row["applications"]) if ("applications" in keys and row["applications"]) else [],
        "badge": row["badge"] or "",
        "is_featured": bool(row["is_featured"]),
        "image_url": row["image_url"] if "image_url" in keys else "",
        "gallery": gallery_val,
        "brochure_url": row["brochure_url"] if "brochure_url" in keys else "",
        "datasheet_url": row["datasheet_url"] if "datasheet_url" in keys else "",
        "video_url": row["video_url"] if ("video_url" in keys and row["video_url"]) else "",
        "is_published": bool(row["is_published"]) if "is_published" in keys else True,
        "display_order": row["display_order"] if "display_order" in keys else 0
    }

def format_blog_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    return {
        "id": row["id"],
        "slug": row["slug"],
        "title": row["title"],
        "category": row["category"],
        "author": row["author"] or "HTI Engineering Team",
        "read_time": row["read_time"] or "5 min read",
        "excerpt": row["excerpt"],
        "content": row["content"],
        "image_url": row["image_url"] or "",
        "is_published": bool(row["is_published"]),
        "tags": row["tags"] if "tags" in keys else "",
        "seo_title": row["seo_title"] if "seo_title" in keys else "",
        "meta_description": row["meta_description"] if "meta_description" in keys else "",
        "scheduled_at": row["scheduled_at"] if "scheduled_at" in keys else "",
        "created_at": row["created_at"]
    }

def format_client_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    return {
        "id": row["id"],
        "name": row["name"],
        "sector": row["sector"],
        "logo_url": row["logo_url"] if "logo_url" in keys else "",
        "website_url": row["website_url"] if "website_url" in keys else "",
        "is_active": bool(row["is_active"]) if "is_active" in keys else True,
        "display_order": row["display_order"] if "display_order" in keys else 0,
        "is_authorized": bool(row["is_authorized"]) if "is_authorized" in keys else True
    }

def format_partner_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    return {
        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "tagline": row["tagline"] or "",
        "logo_url": row["logo_url"] if "logo_url" in keys else "",
        "website_url": row["website_url"] if "website_url" in keys else "",
        "is_active": bool(row["is_active"]) if "is_active" in keys else True,
        "display_order": row["display_order"] if "display_order" in keys else 0,
        "is_authorized": bool(row["is_authorized"]) if "is_authorized" in keys else True
    }

def format_inquiry_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    return {
        "id": row["id"],
        "full_name": row["full_name"],
        "email": row["email"],
        "phone": row["phone"],
        "company": row["company"] or "",
        "category": row["category"] or "",
        "product_name": row["product_name"] or "",
        "message": row["message"],
        "status": row["status"],
        "assigned_to": row["assigned_to"] if "assigned_to" in keys and row["assigned_to"] else "Unassigned",
        "followup_notes": row["followup_notes"] if "followup_notes" in keys and row["followup_notes"] else "",
        "last_contacted_at": row["last_contacted_at"] if "last_contacted_at" in keys else "",
        "created_at": row["created_at"]
    }

def format_project_row(row: sqlite3.Row) -> Dict[str, Any]:
    keys = row.keys()
    return {
        "id": row["id"],
        "slug": row["slug"],
        "title": row["title"],
        "client_name": row["client_name"] or "",
        "client_approved": bool(row["client_approved"]) if "client_approved" in keys else True,
        "industry": row["industry"],
        "location": row["location"],
        "completion_year": row["completion_year"] or "",
        "description": row["description"],
        "image_url": row["image_url"] or "",
        "related_products": json.loads(row["related_products"]) if ("related_products" in keys and row["related_products"]) else [],
        "is_published": bool(row["is_published"]) if "is_published" in keys else True,
        "display_order": row["display_order"] if "display_order" in keys else 0,
        "created_at": row["created_at"]
    }

def format_user_row(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "username": row["username"],
        "full_name": row["full_name"],
        "email": row["email"],
        "role": row["role"],
        "is_active": bool(row["is_active"]),
        "created_at": row["created_at"]
    }

# =========================================================================
# SYSTEM & HEALTH ENDPOINTS (Module 1 & 9)
# =========================================================================

@app.get("/api/health")
def health():
    return {
        "status": "operational",
        "app": "HTI Systems API",
        "version": "2.0.0",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/api/system/health")
def get_system_health():
    conn = get_connection()
    cursor = conn.cursor()

    # Table counts
    counts = {}
    tables = ["products", "inquiries", "partners", "clients", "blogs", "projects", "admin_users", "audit_logs"]
    for t in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) as count FROM {t}")
            counts[t] = cursor.fetchone()["count"]
        except Exception:
            counts[t] = 0

    # Unanswered / New inquiries
    cursor.execute("SELECT COUNT(*) as count FROM inquiries WHERE LOWER(status) = 'new'")
    counts["new_inquiries"] = cursor.fetchone()["count"]

    # System settings lookup
    settings = {}
    try:
        cursor.execute("SELECT key, value FROM system_settings")
        for r in cursor.fetchall():
            settings[r["key"]] = r["value"]
    except Exception:
        pass

    conn.close()

    # SQLite file telemetry
    db_size = os.path.getsize(DB_PATH) if os.path.exists(DB_PATH) else 0

    # Drive space telemetry
    try:
        total, used, free = shutil.disk_usage(str(DB_PATH.parent))
        disk_info = {
            "total_gb": round(total / (1024**3), 2),
            "free_gb": round(free / (1024**3), 2),
            "used_gb": round(used / (1024**3), 2)
        }
    except Exception:
        disk_info = {"total_gb": 0, "free_gb": 0, "used_gb": 0}

    uptime_sec = int(time.time() - SERVER_START_TIME)

    return {
        "status": "healthy",
        "database": {
            "engine": "SQLite 3",
            "path": str(DB_PATH),
            "file_size_bytes": db_size,
            "file_size_mb": round(db_size / (1024*1024), 2),
            "connection_status": "Connected & Operational"
        },
        "disk": disk_info,
        "runtime": {
            "uptime_seconds": uptime_sec,
            "uptime_formatted": f"{uptime_sec // 3600}h {(uptime_sec % 3600) // 60}m {uptime_sec % 60}s",
            "python_version": sys.version.split()[0],
            "os": sys.platform
        },
        "table_counts": counts,
        "last_backup": {
            "timestamp": settings.get("last_backup_time", "2026-10-17 13:53:00"),
            "file": settings.get("last_backup_file", "hti_website_git_bundle_20261017.bundle"),
            "status": settings.get("backup_status", "Verified Complete")
        }
    }

@app.get("/api/system/backups")
def list_backups():
    backups_dir = DB_PATH.parent.parent.parent / "backups"
    if not backups_dir.exists():
        # check parent
        backups_dir = DB_PATH.parent.parent / "backups"
    
    backup_list = []
    if backups_dir.exists():
        for item in backups_dir.iterdir():
            if item.is_file():
                stat = item.stat()
                backup_list.append({
                    "name": item.name,
                    "size_mb": round(stat.st_size / (1024*1024), 2),
                    "created_at": datetime.datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M:%S"),
                    "type": item.suffix.replace('.', '').upper() or "FILE"
                })
    
    backup_list.sort(key=lambda x: x["created_at"], reverse=True)
    return backup_list

@app.post("/api/system/backup")
def trigger_backup(admin_user: Optional[str] = Query("admin")):
    timestamp_str = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backups_dir = DB_PATH.parent.parent.parent / "backups"
    if not backups_dir.exists():
        backups_dir.mkdir(parents=True, exist_ok=True)
    
    backup_filename = f"hti_db_snapshot_{timestamp_str}.sqlite"
    target_path = backups_dir / backup_filename
    
    try:
        # Perform safe SQLite backup
        src_conn = sqlite3.connect(DB_PATH)
        dst_conn = sqlite3.connect(target_path)
        with dst_conn:
            src_conn.backup(dst_conn)
        src_conn.close()
        dst_conn.close()

        file_size = os.path.getsize(target_path)
        readable_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Update settings
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT OR REPLACE INTO system_settings (key, value) VALUES ('last_backup_time', ?)", (readable_time,))
        cursor.execute("INSERT OR REPLACE INTO system_settings (key, value) VALUES ('last_backup_file', ?)", (backup_filename,))
        cursor.execute("INSERT OR REPLACE INTO system_settings (key, value) VALUES ('backup_status', 'Verified Complete')")
        conn.commit()
        conn.close()

        add_audit_log(admin_user, "BACKUP_DATABASE", "System Health", f"Created live verified snapshot: {backup_filename} ({round(file_size/1024, 1)} KB)")

        return {
            "success": True,
            "message": f"Verified database snapshot created successfully: {backup_filename}",
            "backup": {
                "name": backup_filename,
                "path": str(target_path),
                "size_mb": round(file_size / (1024*1024), 3),
                "timestamp": readable_time
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backup operation failed: {str(e)}")

@app.get("/api/company-info")
def get_company_info():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT data_json FROM website_content WHERE section_key = 'contact_details'")
    row = cursor.fetchone()
    conn.close()
    if row and row["data_json"]:
        return json.loads(row["data_json"])
    return {
        "company_name": "HTI Automation & Security Systems Pvt. Ltd.",
        "tagline": "Innovative Automation, Hygiene & Security Solutions Since 2014",
        "established_year": 2014,
        "address": {
            "street": "Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate",
            "locality": "Turbhe MIDC, Turbhe",
            "city": "Navi Mumbai",
            "pincode": "400703",
            "state": "Maharashtra",
            "country": "India"
        },
        "phones": ["+91 9892756077", "+91 9594917010"],
        "emails": {
            "general": "hti@htisystems.in",
            "sales": "sales@htisystems.in"
        },
        "website": "www.htisystems.in",
        "working_hours": "Monday - Saturday: 9:00 AM - 6:30 PM"
    }

@app.get("/api/stats")
def get_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as count FROM products WHERE is_published = 1")
    total_products = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(DISTINCT category) as count FROM products")
    total_categories = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM blogs WHERE is_published = 1")
    total_blogs = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM clients WHERE is_active = 1")
    total_clients = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM partners WHERE is_active = 1")
    total_partners = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM inquiries")
    total_inquiries = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM inquiries WHERE LOWER(status) = 'new'")
    new_inquiries = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM projects WHERE is_published = 1")
    total_projects = cursor.fetchone()["count"]

    conn.close()

    return {
        "total_products": total_products,
        "total_categories": total_categories,
        "total_blogs": total_blogs,
        "total_clients": total_clients,
        "total_partners": total_partners,
        "total_inquiries": total_inquiries,
        "new_inquiries": new_inquiries,
        "total_projects": total_projects,
        "years_in_business": 12
    }

# =========================================================================
# PRODUCT MANAGEMENT (Module 2)
# =========================================================================

@app.get("/api/products/summary")
def get_products_summary():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total FROM products")
    total = cursor.fetchone()["total"]
    cursor.execute("SELECT COUNT(*) as published FROM products WHERE is_published = 1")
    published = cursor.fetchone()["published"]
    cursor.execute("SELECT COUNT(*) as drafts FROM products WHERE is_published = 0")
    drafts = cursor.fetchone()["drafts"]
    cursor.execute("SELECT COUNT(*) as featured FROM products WHERE is_featured = 1")
    featured = cursor.fetchone()["featured"]
    cursor.execute("SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC")
    cat_rows = cursor.fetchall()
    categories = [{"name": r["category"], "count": r["count"]} for r in cat_rows]
    conn.close()
    return {
        "total": total,
        "published": published,
        "drafts": drafts,
        "featured": featured,
        "categories": categories
    }

@app.get("/api/categories")
def get_categories():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT category, COUNT(*) as total_count, SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published_count FROM products GROUP BY category ORDER BY category ASC")
    rows = cursor.fetchall()
    conn.close()
    return [{"category": r["category"], "total": r["total_count"], "published": r["published_count"] or 0} for r in rows]

@app.post("/api/upload")
async def upload_media(file: UploadFile = File(...), admin_user: Optional[str] = Query("admin")):
    safe_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', file.filename or "upload.jpg")
    timestamp = int(time.time())
    unique_filename = f"{timestamp}_{safe_name}"
    
    frontend_target = FRONTEND_UPLOAD_DIR / unique_filename
    backend_target = BACKEND_UPLOAD_DIR / unique_filename
    
    content = await file.read()
    with open(frontend_target, "wb") as f:
        f.write(content)
    try:
        with open(backend_target, "wb") as f:
            f.write(content)
    except Exception:
        pass
        
    add_audit_log(admin_user, "UPLOAD_MEDIA", "Products", f"Uploaded media asset '{unique_filename}' ({len(content)} bytes)")
    
    return {
        "success": True,
        "url": f"/uploads/{unique_filename}",
        "filename": unique_filename,
        "size": len(content),
        "content_type": file.content_type
    }

@app.get("/api/products")
def get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    featured_only: bool = Query(False),
    include_unpublished: bool = Query(False)
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if status == "published":
        query += " AND is_published = 1"
    elif status == "draft":
        query += " AND is_published = 0"
    elif not include_unpublished:
        query += " AND (is_published IS NULL OR is_published = 1)"

    if category and category.lower() != "all":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category)

    if featured_only:
        query += " AND is_featured = 1"

    if search:
        query += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(subcategory) LIKE ? OR LOWER(tagline) LIKE ?)"
        like_term = f"%{search.lower()}%"
        params.extend([like_term, like_term, like_term, like_term])

    query += " ORDER BY display_order ASC, is_featured DESC, id ASC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [format_product_row(r) for r in rows]

@app.get("/api/products/{identifier}")
def get_product(identifier: str):
    conn = get_connection()
    cursor = conn.cursor()

    if identifier.isdigit():
        cursor.execute("SELECT * FROM products WHERE id = ?", (int(identifier),))
    else:
        cursor.execute("SELECT * FROM products WHERE slug = ?", (identifier,))

    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Product not found")

    return format_product_row(row)

@app.post("/api/products", status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    slug = payload.slug or slugify(payload.name)
    cursor.execute("SELECT id FROM products WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(time.time())}"

    cursor.execute("""
    INSERT INTO products (
        slug, name, category, subcategory, tagline, description,
        features, specs, applications, badge, is_featured,
        image_url, gallery, brochure_url, datasheet_url, video_url, is_published, display_order
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        slug,
        payload.name,
        payload.category,
        payload.subcategory,
        payload.tagline or "",
        payload.description,
        json.dumps(payload.features),
        json.dumps(payload.specs),
        json.dumps(payload.applications),
        payload.badge or "",
        1 if payload.is_featured else 0,
        payload.image_url or "",
        json.dumps(payload.gallery or []),
        payload.brochure_url or "",
        payload.datasheet_url or "",
        payload.video_url or "",
        1 if payload.is_published else 0,
        payload.display_order or 0
    ))

    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM products WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    status_str = "Published" if payload.is_published else "Draft"
    add_audit_log(admin_user, "CREATE_PRODUCT", "Products", f"Created product '{payload.name}' ({status_str}) in category '{payload.category}'")

    return {
        "success": True,
        "message": f"Product '{payload.name}' created successfully ({status_str})",
        "product": format_product_row(row)
    }

@app.put("/api/products/{product_id}")
def update_product(product_id: int, payload: ProductCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug FROM products WHERE id = ?", (product_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")

    slug = payload.slug or existing["slug"] or slugify(payload.name)

    cursor.execute("""
    UPDATE products
    SET slug = ?, name = ?, category = ?, subcategory = ?, tagline = ?,
        description = ?, features = ?, specs = ?, applications = ?,
        badge = ?, is_featured = ?, image_url = ?, gallery = ?, brochure_url = ?,
        datasheet_url = ?, video_url = ?, is_published = ?, display_order = ?
    WHERE id = ?
    """, (
        slug,
        payload.name,
        payload.category,
        payload.subcategory,
        payload.tagline or "",
        payload.description,
        json.dumps(payload.features),
        json.dumps(payload.specs),
        json.dumps(payload.applications),
        payload.badge or "",
        1 if payload.is_featured else 0,
        payload.image_url or "",
        json.dumps(payload.gallery or []),
        payload.brochure_url or "",
        payload.datasheet_url or "",
        payload.video_url or "",
        1 if payload.is_published else 0,
        payload.display_order or 0,
        product_id
    ))

    conn.commit()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    conn.close()

    status_str = "Published" if payload.is_published else "Draft"
    add_audit_log(admin_user, "UPDATE_PRODUCT", "Products", f"Updated product #{product_id} '{payload.name}' ({status_str})")

    return {
        "success": True,
        "message": f"Product '{payload.name}' updated successfully",
        "product": format_product_row(row)
    }

@app.patch("/api/products/{product_id}/toggle-publish")
def toggle_publish_product(product_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, is_published FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")

    new_status = 0 if row["is_published"] else 1
    cursor.execute("UPDATE products SET is_published = ? WHERE id = ?", (new_status, product_id))
    conn.commit()
    conn.close()

    status_str = "Published" if new_status == 1 else "Unpublished (Draft)"
    add_audit_log(admin_user, "TOGGLE_PRODUCT_PUBLISH", "Products", f"Set product '{row['name']}' to {status_str}")

    return {"success": True, "id": product_id, "is_published": bool(new_status), "status": status_str}

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")

    name = row["name"]
    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_PRODUCT", "Products", f"Deleted product '{name}' (#{product_id})")

    return {"success": True, "message": f"Product '{name}' permanently removed"}

# =========================================================================
# BLOGS & TECHNICAL PUBLICATIONS (Module 3)
# =========================================================================

@app.get("/api/blogs")
def get_blogs(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    include_drafts: bool = Query(False)
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM blogs WHERE 1=1"
    params = []

    if not include_drafts:
        query += " AND is_published = 1"

    if category and category.lower() != "all":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category)

    if search:
        query += " AND (LOWER(title) LIKE ? OR LOWER(excerpt) LIKE ? OR LOWER(content) LIKE ?)"
        like_term = f"%{search.lower()}%"
        params.extend([like_term, like_term, like_term])

    query += " ORDER BY id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [format_blog_row(r) for r in rows]

@app.get("/api/blogs/{identifier}")
def get_blog(identifier: str):
    conn = get_connection()
    cursor = conn.cursor()

    if identifier.isdigit():
        cursor.execute("SELECT * FROM blogs WHERE id = ?", (int(identifier),))
    else:
        cursor.execute("SELECT * FROM blogs WHERE slug = ?", (identifier,))

    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Blog article not found")

    return format_blog_row(row)

@app.post("/api/blogs", status_code=status.HTTP_201_CREATED)
def create_blog(payload: BlogCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    slug = payload.slug or slugify(payload.title)
    cursor.execute("SELECT id FROM blogs WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(time.time())}"

    cursor.execute("""
    INSERT INTO blogs (
        slug, title, category, author, read_time, excerpt, content,
        image_url, is_published, tags, seo_title, meta_description, scheduled_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        slug,
        payload.title,
        payload.category,
        payload.author or "HTI Engineering Team",
        payload.read_time or "5 min read",
        payload.excerpt,
        payload.content,
        payload.image_url or "",
        1 if payload.is_published else 0,
        payload.tags or "",
        payload.seo_title or payload.title,
        payload.meta_description or payload.excerpt,
        payload.scheduled_at or ""
    ))

    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM blogs WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "CREATE_BLOG", "Blogs", f"Published article '{payload.title}'")

    return {
        "success": True,
        "message": f"Article '{payload.title}' saved successfully",
        "blog": format_blog_row(row)
    }

@app.put("/api/blogs/{blog_id}")
def update_blog(blog_id: int, payload: BlogCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug FROM blogs WHERE id = ?", (blog_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Blog article not found")

    slug = payload.slug or existing["slug"] or slugify(payload.title)

    cursor.execute("""
    UPDATE blogs
    SET slug = ?, title = ?, category = ?, author = ?, read_time = ?,
        excerpt = ?, content = ?, image_url = ?, is_published = ?,
        tags = ?, seo_title = ?, meta_description = ?, scheduled_at = ?
    WHERE id = ?
    """, (
        slug,
        payload.title,
        payload.category,
        payload.author or "HTI Engineering Team",
        payload.read_time or "5 min read",
        payload.excerpt,
        payload.content,
        payload.image_url or "",
        1 if payload.is_published else 0,
        payload.tags or "",
        payload.seo_title or payload.title,
        payload.meta_description or payload.excerpt,
        payload.scheduled_at or "",
        blog_id
    ))

    conn.commit()
    cursor.execute("SELECT * FROM blogs WHERE id = ?", (blog_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "UPDATE_BLOG", "Blogs", f"Updated article #{blog_id} '{payload.title}'")

    return {
        "success": True,
        "message": f"Article '{payload.title}' updated successfully",
        "blog": format_blog_row(row)
    }

@app.patch("/api/blogs/{blog_id}/toggle-publish")
def toggle_publish_blog(blog_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT title, is_published FROM blogs WHERE id = ?", (blog_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Blog not found")

    new_status = 0 if row["is_published"] else 1
    cursor.execute("UPDATE blogs SET is_published = ? WHERE id = ?", (new_status, blog_id))
    conn.commit()
    conn.close()

    status_str = "Published" if new_status == 1 else "Draft"
    add_audit_log(admin_user, "TOGGLE_BLOG_PUBLISH", "Blogs", f"Set blog '{row['title']}' to {status_str}")

    return {"success": True, "id": blog_id, "is_published": bool(new_status), "status": status_str}

@app.delete("/api/blogs/{blog_id}")
def delete_blog(blog_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT title FROM blogs WHERE id = ?", (blog_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Blog article not found")

    title = row["title"]
    cursor.execute("DELETE FROM blogs WHERE id = ?", (blog_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_BLOG", "Blogs", f"Deleted article '{title}' (#{blog_id})")

    return {"success": True, "message": f"Article '{title}' deleted successfully"}

# =========================================================================
# CLIENTS & TECHNOLOGY PARTNERS (Module 4)
# =========================================================================

@app.get("/api/clients")
def get_clients(active_only: bool = Query(False)):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM clients"
    if active_only:
        query += " WHERE is_active = 1"
    query += " ORDER BY display_order ASC, id DESC"
    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()
    return [format_client_row(r) for r in rows]

@app.post("/api/clients", status_code=status.HTTP_201_CREATED)
def create_client(payload: ClientCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO clients (name, sector, logo_url, website_url, is_active, display_order, is_authorized)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        payload.name,
        payload.sector,
        payload.logo_url or "",
        payload.website_url or "",
        1 if payload.is_active else 0,
        payload.display_order or 0,
        1 if payload.is_authorized else 0
    ))
    new_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM clients WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "CREATE_CLIENT", "Clients", f"Added enterprise client '{payload.name}'")

    return {
        "success": True,
        "message": f"Client '{payload.name}' added successfully",
        "client": format_client_row(row)
    }

@app.put("/api/clients/{client_id}")
def update_client(client_id: int, payload: ClientCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM clients WHERE id = ?", (client_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Client not found")

    cursor.execute("""
    UPDATE clients
    SET name = ?, sector = ?, logo_url = ?, website_url = ?,
        is_active = ?, display_order = ?, is_authorized = ?
    WHERE id = ?
    """, (
        payload.name,
        payload.sector,
        payload.logo_url or "",
        payload.website_url or "",
        1 if payload.is_active else 0,
        payload.display_order or 0,
        1 if payload.is_authorized else 0,
        client_id
    ))
    conn.commit()
    cursor.execute("SELECT * FROM clients WHERE id = ?", (client_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "UPDATE_CLIENT", "Clients", f"Updated client #{client_id} '{payload.name}'")

    return {
        "success": True,
        "message": f"Client '{payload.name}' updated successfully",
        "client": format_client_row(row)
    }

@app.delete("/api/clients/{client_id}")
def delete_client(client_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM clients WHERE id = ?", (client_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Client not found")

    name = row["name"]
    cursor.execute("DELETE FROM clients WHERE id = ?", (client_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_CLIENT", "Clients", f"Removed client '{name}' (#{client_id})")

    return {"success": True, "message": f"Client '{name}' removed successfully"}

@app.get("/api/partners")
def get_partners(active_only: bool = Query(False)):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM partners"
    if active_only:
        query += " WHERE is_active = 1"
    query += " ORDER BY display_order ASC, id ASC"
    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()
    return [format_partner_row(r) for r in rows]

@app.post("/api/partners", status_code=status.HTTP_201_CREATED)
def create_partner(payload: PartnerCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO partners (name, category, tagline, logo_url, website_url, is_active, display_order, is_authorized)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        payload.name,
        payload.category,
        payload.tagline or "",
        payload.logo_url or "",
        payload.website_url or "",
        1 if payload.is_active else 0,
        payload.display_order or 0,
        1 if payload.is_authorized else 0
    ))
    new_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM partners WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "CREATE_PARTNER", "Partners", f"Added partner '{payload.name}'")

    return {
        "success": True,
        "message": f"Partner '{payload.name}' added successfully",
        "partner": format_partner_row(row)
    }

@app.put("/api/partners/{partner_id}")
def update_partner(partner_id: int, payload: PartnerCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM partners WHERE id = ?", (partner_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Partner not found")

    cursor.execute("""
    UPDATE partners
    SET name = ?, category = ?, tagline = ?, logo_url = ?, website_url = ?,
        is_active = ?, display_order = ?, is_authorized = ?
    WHERE id = ?
    """, (
        payload.name,
        payload.category,
        payload.tagline or "",
        payload.logo_url or "",
        payload.website_url or "",
        1 if payload.is_active else 0,
        payload.display_order or 0,
        1 if payload.is_authorized else 0,
        partner_id
    ))
    conn.commit()
    cursor.execute("SELECT * FROM partners WHERE id = ?", (partner_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "UPDATE_PARTNER", "Partners", f"Updated partner #{partner_id} '{payload.name}'")

    return {
        "success": True,
        "message": f"Partner '{payload.name}' updated successfully",
        "partner": format_partner_row(row)
    }

@app.delete("/api/partners/{partner_id}")
def delete_partner(partner_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM partners WHERE id = ?", (partner_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Partner not found")

    name = row["name"]
    cursor.execute("DELETE FROM partners WHERE id = ?", (partner_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_PARTNER", "Partners", f"Removed partner '{name}' (#{partner_id})")

    return {"success": True, "message": f"Partner '{name}' removed successfully"}

# =========================================================================
# ENQUIRIES & LEAD MANAGEMENT (Module 5)
# =========================================================================

@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def create_inquiry(inquiry: InquiryCreate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO inquiries (full_name, email, phone, company, category, product_name, message, status, assigned_to, followup_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'New', 'Unassigned', '')
    """, (
        inquiry.full_name,
        inquiry.email,
        inquiry.phone,
        inquiry.company or "N/A",
        inquiry.category or "General",
        inquiry.product_name or "General Inquiry",
        inquiry.message
    ))

    inquiry_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM inquiries WHERE id = ?", (inquiry_id,))
    row = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": "Thank you for contacting HTI Automation & Security Systems. Our engineering team will review your inquiry shortly.",
        "inquiry": format_inquiry_row(row)
    }

@app.get("/api/inquiries")
def get_inquiries(status_filter: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM inquiries WHERE 1=1"
    params = []

    if status_filter and status_filter.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status_filter)

    if search:
        query += " AND (LOWER(full_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(company) LIKE ? OR LOWER(product_name) LIKE ? OR LOWER(phone) LIKE ?)"
        like_term = f"%{search.lower()}%"
        params.extend([like_term, like_term, like_term, like_term, like_term])

    query += " ORDER BY id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [format_inquiry_row(r) for r in rows]

@app.patch("/api/inquiries/{inquiry_id}/status")
def update_inquiry_status(inquiry_id: int, payload: InquiryStatusUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, full_name, company FROM inquiries WHERE id = ?", (inquiry_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    now_iso = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("UPDATE inquiries SET status = ?, updated_at = ? WHERE id = ?", (payload.status, now_iso, inquiry_id))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "UPDATE_INQUIRY_STATUS", "Inquiries", f"Changed status of inquiry #{inquiry_id} ({row['full_name']}) to '{payload.status}'")

    return {"success": True, "id": inquiry_id, "status": payload.status}

@app.patch("/api/inquiries/{inquiry_id}/assign")
def assign_inquiry(inquiry_id: int, payload: InquiryAssignUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM inquiries WHERE id = ?", (inquiry_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    cursor.execute("UPDATE inquiries SET assigned_to = ? WHERE id = ?", (payload.assigned_to, inquiry_id))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "ASSIGN_INQUIRY", "Inquiries", f"Assigned inquiry #{inquiry_id} to '{payload.assigned_to}'")

    return {"success": True, "id": inquiry_id, "assigned_to": payload.assigned_to}

@app.patch("/api/inquiries/{inquiry_id}/notes")
def update_inquiry_notes(inquiry_id: int, payload: InquiryNotesUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM inquiries WHERE id = ?", (inquiry_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    now_iso = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("UPDATE inquiries SET followup_notes = ?, last_contacted_at = ?, updated_at = ? WHERE id = ?", (payload.notes, now_iso, now_iso, inquiry_id))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "UPDATE_INQUIRY_NOTES", "Inquiries", f"Updated follow-up notes for inquiry #{inquiry_id}")

    return {"success": True, "id": inquiry_id, "followup_notes": payload.notes, "last_contacted_at": now_iso}

@app.get("/api/inquiries/export")
def export_inquiries_csv():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inquiries ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()

    import csv
    import io
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Full Name", "Email", "Phone", "Company", "Category", "Product/Service", "Status", "Assigned To", "Follow-up Notes", "Received Date"])

    for r in rows:
        keys = r.keys()
        writer.writerow([
            r["id"],
            r["full_name"],
            r["email"],
            r["phone"],
            r["company"] or "",
            r["category"] or "",
            r["product_name"] or "",
            r["status"],
            r["assigned_to"] if "assigned_to" in keys else "Unassigned",
            r["followup_notes"] if "followup_notes" in keys else "",
            r["created_at"]
        ])

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=HTI_Sales_Enquiries.csv"}
    )

@app.put("/api/inquiries/{inquiry_id}")
def update_inquiry_full(inquiry_id: int, payload: InquiryFullUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, full_name FROM inquiries WHERE id = ?", (inquiry_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    data = payload.dict(exclude_unset=True)
    if not data:
        conn.close()
        return {"success": True, "id": inquiry_id}

    now_iso = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    fields = []
    params = []
    for k, v in data.items():
        fields.append(f"{k} = ?")
        params.append(v)
    fields.append("updated_at = ?")
    params.append(now_iso)
    params.append(inquiry_id)

    cursor.execute(f"UPDATE inquiries SET {', '.join(fields)} WHERE id = ?", params)
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "EDIT_INQUIRY", "Inquiries", f"Updated details for lead #{inquiry_id} ({row['full_name']})")
    return {"success": True, "id": inquiry_id}

@app.delete("/api/inquiries/{inquiry_id}")
def delete_inquiry(inquiry_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM inquiries WHERE id = ?", (inquiry_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    cursor.execute("DELETE FROM inquiries WHERE id = ?", (inquiry_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_INQUIRY", "Inquiries", f"Deleted inquiry #{inquiry_id}")

    return {"success": True, "message": f"Inquiry #{inquiry_id} removed"}

# =========================================================================
# CAREERS & TALENT ACQUISITION (Module 5B - MySQL Connected)
# =========================================================================

class CareerStatusPayload(BaseModel):
    status: str

class CareerNotesPayload(BaseModel):
    notes: str

@app.get("/api/careers/db-status")
def get_career_database_status():
    """Returns the live connection status of the MySQL database used for careers."""
    return get_careers_db_status()

@app.post("/api/careers/apply", status_code=status.HTTP_201_CREATED)
async def submit_career_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    position: str = Form(...),
    experience: Optional[str] = Form(""),
    notice_period: Optional[str] = Form(""),
    cover_letter: Optional[str] = Form(""),
    step_saved: Optional[int] = Form(3),
    resume: Optional[UploadFile] = File(None)
):
    # Field validations
    if not full_name or len(full_name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Valid candidate full name is required.")
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Valid email address is required.")
    if not phone or len(re.sub(r"\D", "", phone)) < 10:
        raise HTTPException(status_code=400, detail="Valid 10-digit phone number is required.")
    if not position or not position.strip():
        raise HTTPException(status_code=400, detail="Position applied for is required.")

    resume_filename = ""
    resume_url = ""

    # Process and save uploaded resume if provided
    if resume and resume.filename:
        original_name = resume.filename
        ext = os.path.splitext(original_name)[1].lower()
        if ext not in [".pdf", ".doc", ".docx"]:
            raise HTTPException(status_code=400, detail="Invalid file format. Only PDF, DOC, or DOCX files are allowed.")
        
        # Safe unique filename
        safe_base = re.sub(r'[^a-zA-Z0-9_\-]', '_', os.path.splitext(original_name)[0])[:30]
        timestamp = int(time.time())
        saved_filename = f"{safe_base}_{timestamp}{ext}"

        dest_frontend = RESUME_UPLOAD_DIR / saved_filename
        dest_backend = BACKEND_RESUME_DIR / saved_filename

        try:
            content = await resume.read()
            with open(dest_frontend, "wb") as f_out:
                f_out.write(content)
            with open(dest_backend, "wb") as f_out:
                f_out.write(content)

            resume_filename = original_name
            resume_url = f"/uploads/resumes/{saved_filename}"
        except Exception as e:
            print(f"Error saving uploaded resume: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to process and store resume file: {e}")

    app_data = {
        "full_name": full_name.strip(),
        "email": email.strip().lower(),
        "phone": phone.strip(),
        "position": position.strip(),
        "experience": experience.strip() if experience else "Not specified",
        "notice_period": notice_period.strip() if notice_period else "Immediate",
        "resume_filename": resume_filename,
        "resume_url": resume_url,
        "cover_letter": cover_letter.strip() if cover_letter else "",
        "step_saved": step_saved or 3,
        "status": "New",
        "notes": ""
    }

    result = insert_career_application(app_data)
    created_record = result.get("data", {})
    engine_used = result.get("engine", "mysql")

    add_audit_log(
        "system",
        "CAREER_APPLICATION_SUBMITTED",
        "Careers",
        f"New application received from {full_name} for position '{position}' [DB: {engine_used}]"
    )

    return {
        "success": True,
        "message": "Thank you! Your career application has been securely submitted to HTI Talent Acquisition.",
        "application": created_record,
        "engine": engine_used
    }

@app.post("/api/careers/draft")
async def save_career_draft(payload: Dict[str, Any]):
    """Saves intermediate candidate details at Step 1 or Step 2 to prevent data loss."""
    full_name = payload.get("full_name") or payload.get("fullName") or "Candidate Draft"
    email = payload.get("email") or "draft@applicant.local"
    phone = payload.get("phone") or "0000000000"
    position = payload.get("position") or "General Inquiry"
    step_saved = payload.get("step_saved", 1)

    app_data = {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "position": position,
        "experience": payload.get("experience", ""),
        "notice_period": payload.get("noticePeriod", ""),
        "resume_filename": payload.get("resume_filename", ""),
        "resume_url": payload.get("resume_url", ""),
        "cover_letter": payload.get("cover_letter", ""),
        "step_saved": step_saved,
        "status": "Draft",
        "notes": f"Saved at Step {step_saved}"
    }

    result = insert_career_application(app_data)
    return {"success": True, "draft_id": result.get("data", {}).get("id"), "engine": result.get("engine")}

@app.get("/api/careers/applications")
def get_career_applications(
    status_filter: Optional[str] = None,
    search: Optional[str] = None,
    position: Optional[str] = None
):
    result = fetch_career_applications(status_filter=status_filter, search=search, position=position)
    return {
        "success": True,
        "applications": result.get("items", []),
        "engine": result.get("engine", "mysql"),
        "total": len(result.get("items", []))
    }

@app.patch("/api/careers/applications/{app_id}/status")
def patch_career_status(app_id: int, payload: CareerStatusPayload, admin_user: Optional[str] = "admin"):
    user_str = admin_user if isinstance(admin_user, str) else "admin"
    success = update_application_status(app_id, payload.status)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update application status")
    
    add_audit_log(user_str, "UPDATE_CAREER_STATUS", "Careers", f"Changed status of application #{app_id} to '{payload.status}'")
    return {"success": True, "message": f"Application #{app_id} status updated to {payload.status}"}

@app.patch("/api/careers/applications/{app_id}/notes")
def patch_career_notes(app_id: int, payload: CareerNotesPayload, admin_user: Optional[str] = "admin"):
    user_str = admin_user if isinstance(admin_user, str) else "admin"
    success = update_application_notes(app_id, payload.notes)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update notes")

    add_audit_log(user_str, "UPDATE_CAREER_NOTES", "Careers", f"Updated recruiter notes for application #{app_id}")
    return {"success": True, "message": f"Notes for application #{app_id} saved"}

@app.delete("/api/careers/applications/{app_id}")
def remove_career_application(app_id: int, admin_user: Optional[str] = "admin"):
    user_str = admin_user if isinstance(admin_user, str) else "admin"
    success = delete_career_application(app_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete application")

    add_audit_log(user_str, "DELETE_CAREER_APPLICATION", "Careers", f"Deleted job application #{app_id}")
    return {"success": True, "message": f"Job application #{app_id} deleted"}

@app.get("/api/careers/applications/export")
def export_career_applications_csv():
    result = fetch_career_applications()
    items = result.get("items", [])

    output = []
    headers = ["ID", "Full Name", "Email", "Phone", "Position", "Experience", "Notice Period", "Resume URL", "Status", "Notes", "Applied At"]
    output.append(",".join(f'"{h}"' for h in headers))

    for item in items:
        row = [
            str(item.get("id", "")),
            str(item.get("full_name", "")).replace('"', '""'),
            str(item.get("email", "")).replace('"', '""'),
            str(item.get("phone", "")).replace('"', '""'),
            str(item.get("position", "")).replace('"', '""'),
            str(item.get("experience", "")).replace('"', '""'),
            str(item.get("notice_period", "")).replace('"', '""'),
            str(item.get("resume_url", "")).replace('"', '""'),
            str(item.get("status", "")).replace('"', '""'),
            str(item.get("notes", "")).replace('"', '""').replace('\n', ' '),
            str(item.get("created_at", ""))
        ]
        output.append(",".join(f'"{val}"' for val in row))

    csv_data = "\n".join(output)
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=hti_job_applications_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        }
    )

# =========================================================================
# PROJECTS & INSTALLATIONS (Module 6)
# =========================================================================

@app.get("/api/projects")
def get_projects(
    industry: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    published_only: bool = Query(False)
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM projects WHERE 1=1"
    params = []

    if published_only:
        query += " AND is_published = 1"

    if industry and industry.lower() != "all":
        query += " AND LOWER(industry) = LOWER(?)"
        params.append(industry)

    if search:
        query += " AND (LOWER(title) LIKE ? OR LOWER(client_name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(location) LIKE ?)"
        like_term = f"%{search.lower()}%"
        params.extend([like_term, like_term, like_term, like_term])

    query += " ORDER BY display_order ASC, id DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [format_project_row(r) for r in rows]

@app.get("/api/projects/{identifier}")
def get_project(identifier: str):
    conn = get_connection()
    cursor = conn.cursor()

    if identifier.isdigit():
        cursor.execute("SELECT * FROM projects WHERE id = ?", (int(identifier),))
    else:
        cursor.execute("SELECT * FROM projects WHERE slug = ?", (identifier,))

    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Project case study not found")

    return format_project_row(row)

@app.post("/api/projects", status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    slug = payload.slug or slugify(payload.title)
    cursor.execute("SELECT id FROM projects WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(time.time())}"

    cursor.execute("""
    INSERT INTO projects (
        slug, title, client_name, client_approved, industry, location,
        completion_year, description, image_url, related_products,
        is_published, display_order
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        slug,
        payload.title,
        payload.client_name or "",
        1 if payload.client_approved else 0,
        payload.industry,
        payload.location,
        payload.completion_year or "",
        payload.description,
        payload.image_url or "",
        json.dumps(payload.related_products),
        1 if payload.is_published else 0,
        payload.display_order or 0
    ))

    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM projects WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "CREATE_PROJECT", "Projects", f"Added case study '{payload.title}' for '{payload.client_name}'")

    return {
        "success": True,
        "message": f"Project case study '{payload.title}' published successfully",
        "project": format_project_row(row)
    }

@app.put("/api/projects/{project_id}")
def update_project(project_id: int, payload: ProjectCreateUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug FROM projects WHERE id = ?", (project_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Project not found")

    slug = payload.slug or existing["slug"] or slugify(payload.title)

    cursor.execute("""
    UPDATE projects
    SET slug = ?, title = ?, client_name = ?, client_approved = ?,
        industry = ?, location = ?, completion_year = ?, description = ?,
        image_url = ?, related_products = ?, is_published = ?, display_order = ?
    WHERE id = ?
    """, (
        slug,
        payload.title,
        payload.client_name or "",
        1 if payload.client_approved else 0,
        payload.industry,
        payload.location,
        payload.completion_year or "",
        payload.description,
        payload.image_url or "",
        json.dumps(payload.related_products),
        1 if payload.is_published else 0,
        payload.display_order or 0,
        project_id
    ))

    conn.commit()
    cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "UPDATE_PROJECT", "Projects", f"Updated case study #{project_id} '{payload.title}'")

    return {
        "success": True,
        "message": f"Project case study '{payload.title}' updated successfully",
        "project": format_project_row(row)
    }

@app.patch("/api/projects/{project_id}/toggle-publish")
def toggle_publish_project(project_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT title, is_published FROM projects WHERE id = ?", (project_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Project not found")

    new_status = 0 if row["is_published"] else 1
    cursor.execute("UPDATE projects SET is_published = ? WHERE id = ?", (new_status, project_id))
    conn.commit()
    conn.close()

    status_str = "Published" if new_status == 1 else "Draft"
    add_audit_log(admin_user, "TOGGLE_PROJECT_PUBLISH", "Projects", f"Set project '{row['title']}' to {status_str}")

    return {"success": True, "id": project_id, "is_published": bool(new_status), "status": status_str}

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT title FROM projects WHERE id = ?", (project_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Project not found")

    title = row["title"]
    cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_PROJECT", "Projects", f"Deleted case study '{title}' (#{project_id})")

    return {"success": True, "message": f"Project case study '{title}' deleted successfully"}

# =========================================================================
# WEBSITE CONTENT MANAGEMENT (Module 7)
# =========================================================================

@app.get("/api/content")
def get_all_website_content():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT section_key, data_json, updated_at FROM website_content")
    rows = cursor.fetchall()
    conn.close()
    result = {}
    for r in rows:
        try:
            result[r["section_key"]] = {
                "data": json.loads(r["data_json"]),
                "updated_at": r["updated_at"]
            }
        except Exception:
            result[r["section_key"]] = {"data": {}, "updated_at": r["updated_at"]}
    return result

@app.get("/api/content/{section_key}")
def get_website_content_section(section_key: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT data_json, updated_at FROM website_content WHERE section_key = ?", (section_key,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail=f"Content section '{section_key}' not found")
    return {
        "section_key": section_key,
        "data": json.loads(row["data_json"]),
        "updated_at": row["updated_at"]
    }

@app.put("/api/content/{section_key}")
def update_website_content_section(section_key: str, payload: WebsiteContentUpdate, admin_user: Optional[str] = Query("admin")):
    now_iso = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO website_content (section_key, data_json, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(section_key) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at
    """, (section_key, json.dumps(payload.data), now_iso))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "UPDATE_CONTENT", "Website Content", f"Updated live content section '{section_key}'")

    return {
        "success": True,
        "message": f"Website content for '{section_key}' published live successfully",
        "section_key": section_key,
        "updated_at": now_iso
    }

# =========================================================================
# ADMIN USERS, PERMISSIONS & AUDIT LOGS (Module 8)
# =========================================================================

@app.post("/api/admin/login")
def admin_login(creds: AdminLoginRequest):
    username = creds.username.strip().lower()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM admin_users WHERE LOWER(username) = ? AND is_active = 1", (username,))
    user = cursor.fetchone()

    # Fallback to default hardcoded credentials if user table empty or for emergency break-glass
    if not user and username in ["admin", "htiadmin"]:
        if (username == "admin" and creds.password == "admin123") or (username == "htiadmin" and creds.password == "hti@2026"):
            token = f"hti_sec_token_{username}_{int(time.time())}"
            add_audit_log(username, "ADMIN_LOGIN", "Security", f"User '{username}' logged in successfully via super-admin credential.")
            conn.close()
            return {
                "success": True,
                "token": token,
                "username": username,
                "full_name": "Chief Administrator",
                "role": "Administrator",
                "permissions": ["all"],
                "message": "Authentication successful"
            }

    if not user or user["password_hash"] != creds.password:
        conn.close()
        add_audit_log(username, "FAILED_LOGIN", "Security", f"Failed login attempt for username '{username}'")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Please verify your administrative username and security key."
        )

    token = f"hti_sec_token_{user['username']}_{int(time.time())}"
    add_audit_log(user["username"], "ADMIN_LOGIN", "Security", f"User '{user['username']}' ({user['role']}) logged in.")
    conn.close()

    permissions = ["all"] if user["role"] == "Administrator" else (
        ["products", "blogs", "clients", "partners", "projects", "content"] if user["role"] == "Editor" else ["inquiries", "read_only"]
    )

    return {
        "success": True,
        "token": token,
        "username": user["username"],
        "full_name": user["full_name"],
        "role": user["role"],
        "permissions": permissions,
        "message": "Authentication successful"
    }

@app.get("/api/admin/users")
def get_admin_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admin_users ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()
    return [format_user_row(r) for r in rows]

@app.post("/api/admin/users", status_code=status.HTTP_201_CREATED)
def create_admin_user(payload: AdminUserCreate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    username = payload.username.strip().lower()
    cursor.execute("SELECT id FROM admin_users WHERE LOWER(username) = ?", (username,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail=f"Username '{username}' already exists")

    cursor.execute("""
    INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        username,
        payload.password,
        payload.full_name,
        payload.email,
        payload.role,
        1 if payload.is_active else 0
    ))
    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM admin_users WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "CREATE_USER", "Admin Users", f"Created administrative account '{username}' with role '{payload.role}'")

    return {
        "success": True,
        "message": f"User '{username}' created successfully",
        "user": format_user_row(row)
    }

@app.put("/api/admin/users/{user_id}")
def update_admin_user(user_id: int, payload: AdminUserUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM admin_users WHERE id = ?", (user_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

    full_name = payload.full_name if payload.full_name is not None else existing["full_name"]
    email = payload.email if payload.email is not None else existing["email"]
    role = payload.role if payload.role is not None else existing["role"]
    is_active = (1 if payload.is_active else 0) if payload.is_active is not None else existing["is_active"]
    password_hash = payload.password if (payload.password and len(payload.password) >= 3) else existing["password_hash"]

    cursor.execute("""
    UPDATE admin_users
    SET full_name = ?, email = ?, role = ?, is_active = ?, password_hash = ?
    WHERE id = ?
    """, (full_name, email, role, is_active, password_hash, user_id))
    conn.commit()

    cursor.execute("SELECT * FROM admin_users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()

    add_audit_log(admin_user, "UPDATE_USER", "Admin Users", f"Updated user #{user_id} '{existing['username']}'")

    return {
        "success": True,
        "message": f"User '{existing['username']}' updated successfully",
        "user": format_user_row(row)
    }

@app.delete("/api/admin/users/{user_id}")
def delete_admin_user(user_id: int, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM admin_users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

    if row["username"] == "admin":
        conn.close()
        raise HTTPException(status_code=400, detail="Cannot delete default primary administrator account 'admin'")

    username = row["username"]
    cursor.execute("DELETE FROM admin_users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "DELETE_USER", "Admin Users", f"Deleted user account '{username}'")

    return {"success": True, "message": f"User account '{username}' removed"}

@app.get("/api/admin/audit-logs")
def get_audit_logs(limit: int = Query(50), module: Optional[str] = Query(None)):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM audit_logs WHERE 1=1"
    params = []

    if module and module.lower() != "all":
        query += " AND LOWER(module) = LOWER(?)"
        params.append(module)

    query += " ORDER BY id DESC LIMIT ?"
    params.append(limit)

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r["id"],
            "timestamp": r["timestamp"],
            "username": r["username"],
            "action": r["action"],
            "module": r["module"],
            "details": r["details"]
        }
        for r in rows
    ]

# =========================================================================
# SYSTEM SETTINGS & CONFIGURATION (Module 9)
# =========================================================================

@app.get("/api/settings")
def get_system_settings():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM system_settings")
    rows = cursor.fetchall()
    conn.close()
    return {r["key"]: r["value"] for r in rows}

@app.put("/api/settings")
def update_system_settings(payload: SystemSettingsUpdate, admin_user: Optional[str] = Query("admin")):
    conn = get_connection()
    cursor = conn.cursor()
    for k, v in payload.settings.items():
        cursor.execute("""
        INSERT INTO system_settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
        """, (k, str(v)))
    conn.commit()
    conn.close()

    add_audit_log(admin_user, "UPDATE_SETTINGS", "Settings", f"Updated system configuration keys: {', '.join(payload.settings.keys())}")

    return {"success": True, "message": "System settings updated successfully"}
