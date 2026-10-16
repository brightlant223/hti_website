from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import json
import re
import sqlite3
from contextlib import asynccontextmanager

from database import init_db, seed_db, get_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_db()
    yield

app = FastAPI(
    title="HTI Automation & Security Systems API",
    description="Official REST API for HTI Automation & Security Systems Pvt. Ltd. product catalog, blogs, and inquiries",
    version="1.1.0",
    lifespan=lifespan
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

# --- Pydantic Models ---

class InquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=120)
    phone: str = Field(..., min_length=7, max_length=20)
    company: Optional[str] = Field(None, max_length=150)
    category: Optional[str] = Field(None, max_length=100)
    product_name: Optional[str] = Field(None, max_length=150)
    message: str = Field(..., min_length=5, max_length=2000)

class InquiryStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(New|In Review|Contacted|Resolved)$")

class ProductCreateUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    category: str = Field(..., min_length=2, max_length=100)
    subcategory: str = Field(..., min_length=2, max_length=150)
    tagline: Optional[str] = ""
    description: str = Field(..., min_length=5)
    features: List[str] = Field(default_factory=list)
    specs: Dict[str, str] = Field(default_factory=dict)
    applications: List[str] = Field(default_factory=list)
    badge: Optional[str] = None
    is_featured: Optional[bool] = False
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
    slug: Optional[str] = None

# --- Helper Formatters ---

def format_product_row(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "slug": row["slug"],
        "name": row["name"],
        "category": row["category"],
        "subcategory": row["subcategory"],
        "tagline": row["tagline"],
        "description": row["description"],
        "features": json.loads(row["features"]) if row["features"] else [],
        "specs": json.loads(row["specs"]) if row["specs"] else {},
        "applications": json.loads(row["applications"]) if row["applications"] else [],
        "badge": row["badge"],
        "is_featured": bool(row["is_featured"])
    }

def format_blog_row(row: sqlite3.Row) -> Dict[str, Any]:
    return {
        "id": row["id"],
        "slug": row["slug"],
        "title": row["title"],
        "category": row["category"],
        "author": row["author"],
        "read_time": row["read_time"],
        "excerpt": row["excerpt"],
        "content": row["content"],
        "image_url": row["image_url"],
        "is_published": bool(row["is_published"]),
        "created_at": row["created_at"]
    }

# --- Base & Info Endpoints ---

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "HTI Systems API", "version": "1.1.0"}

@app.get("/api/company-info")
def get_company_info():
    return {
        "company_name": "HTI Automation & Security Systems Pvt. Ltd.",
        "tagline": "Innovative Automation, Hygiene & Security Solutions Since 2014",
        "established_year": 2014,
        "address": {
            "street": "407 DR-4 Ram Mandir Road",
            "locality": "Goregaon (West)",
            "city": "Mumbai",
            "pincode": "400104",
            "state": "Maharashtra",
            "country": "India"
        },
        "phones": ["+91 9892756077", "+91 9594917010"],
        "emails": {
            "general": "hti@htisystems.in",
            "sales": "sales@htisystems.in"
        },
        "website": "www.htisystems.in",
        "working_hours": "Monday - Saturday: 9:00 AM - 6:30 PM",
        "core_values": ["Innovation", "Perfection", "Commitment to Quality", "Customer Satisfaction"]
    }

@app.get("/api/stats")
def get_stats():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM products")
    total_products = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(DISTINCT category) as count FROM products")
    total_categories = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM partners")
    total_partners = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM clients")
    total_clients = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM inquiries")
    total_inquiries = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM blogs WHERE is_published = 1")
    total_blogs = cursor.fetchone()["count"]

    conn.close()
    return {
        "total_products": total_products,
        "total_categories": total_categories,
        "total_partners": total_partners,
        "total_clients": total_clients,
        "total_inquiries": total_inquiries,
        "total_blogs": total_blogs,
        "years_in_business": 12
    }

# --- Products / Services Endpoints (CRUD) ---

@app.get("/api/products")
def get_products(
    category: Optional[str] = Query(None, description="Filter by category: Automation, Security System, Hygiene"),
    search: Optional[str] = Query(None, description="Search keyword in name or description"),
    featured_only: bool = Query(False, description="Filter only featured showcase products")
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if category and category.lower() != "all":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category)

    if featured_only:
        query += " AND is_featured = 1"

    if search:
        query += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(subcategory) LIKE ?)"
        like_term = f"%{search.lower()}%"
        params.extend([like_term, like_term, like_term])

    query += " ORDER BY is_featured DESC, id ASC"

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
        raise HTTPException(status_code=404, detail="Product/Service not found")

    return format_product_row(row)

@app.post("/api/products", status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreateUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    slug = payload.slug or slugify(payload.name)
    # Check slug collision
    cursor.execute("SELECT id FROM products WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(sqlite3.time.time())}"

    cursor.execute("""
    INSERT INTO products (slug, name, category, subcategory, tagline, description, features, specs, applications, badge, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        payload.badge,
        1 if payload.is_featured else 0
    ))

    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM products WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": f"Service '{payload.name}' added successfully",
        "product": format_product_row(row)
    }

@app.put("/api/products/{product_id}")
def update_product(product_id: int, payload: ProductCreateUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug FROM products WHERE id = ?", (product_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Product/Service not found")

    slug = payload.slug or existing["slug"] or slugify(payload.name)

    cursor.execute("""
    UPDATE products
    SET slug = ?, name = ?, category = ?, subcategory = ?, tagline = ?,
        description = ?, features = ?, specs = ?, applications = ?,
        badge = ?, is_featured = ?
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
        payload.badge,
        1 if payload.is_featured else 0,
        product_id
    ))

    conn.commit()

    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": f"Service '{payload.name}' updated successfully",
        "product": format_product_row(row)
    }

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Product/Service not found")

    name = row["name"]
    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()

    return {"success": True, "message": f"Service '{name}' removed successfully"}

# --- Blogs Endpoints (CRUD) ---

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
def create_blog(payload: BlogCreateUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    slug = payload.slug or slugify(payload.title)
    cursor.execute("SELECT id FROM blogs WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(sqlite3.time.time())}"

    cursor.execute("""
    INSERT INTO blogs (slug, title, category, author, read_time, excerpt, content, image_url, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        slug,
        payload.title,
        payload.category,
        payload.author or "HTI Engineering Team",
        payload.read_time or "5 min read",
        payload.excerpt,
        payload.content,
        payload.image_url or "",
        1 if payload.is_published else 0
    ))

    new_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM blogs WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": f"Blog '{payload.title}' published successfully",
        "blog": format_blog_row(row)
    }

@app.put("/api/blogs/{blog_id}")
def update_blog(blog_id: int, payload: BlogCreateUpdate):
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
        excerpt = ?, content = ?, image_url = ?, is_published = ?
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
        blog_id
    ))

    conn.commit()

    cursor.execute("SELECT * FROM blogs WHERE id = ?", (blog_id,))
    row = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": f"Blog '{payload.title}' updated successfully",
        "blog": format_blog_row(row)
    }

@app.delete("/api/blogs/{blog_id}")
def delete_blog(blog_id: int):
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

    return {"success": True, "message": f"Blog '{title}' deleted successfully"}

# --- Partners & Clients Endpoints ---

@app.get("/api/partners")
def get_partners():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM partners ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r["id"], "name": r["name"], "category": r["category"], "tagline": r["tagline"]} for r in rows]

@app.get("/api/clients")
def get_clients():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r["id"], "name": r["name"], "sector": r["sector"]} for r in rows]

# --- Inquiries Endpoints ---

@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def create_inquiry(inquiry: InquiryCreate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO inquiries (full_name, email, phone, company, category, product_name, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'New')
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
        "inquiry": {
            "id": row["id"],
            "full_name": row["full_name"],
            "email": row["email"],
            "phone": row["phone"],
            "company": row["company"],
            "category": row["category"],
            "product_name": row["product_name"],
            "message": row["message"],
            "status": row["status"],
            "created_at": row["created_at"]
        }
    }

@app.get("/api/inquiries")
def get_inquiries(status_filter: Optional[str] = Query(None)):
    conn = get_connection()
    cursor = conn.cursor()

    if status_filter:
        cursor.execute("SELECT * FROM inquiries WHERE LOWER(status) = LOWER(?) ORDER BY id DESC", (status_filter,))
    else:
        cursor.execute("SELECT * FROM inquiries ORDER BY id DESC")

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r["id"],
            "full_name": r["full_name"],
            "email": r["email"],
            "phone": r["phone"],
            "company": r["company"],
            "category": r["category"],
            "product_name": r["product_name"],
            "message": r["message"],
            "status": r["status"],
            "created_at": r["created_at"]
        }
        for r in rows
    ]

@app.patch("/api/inquiries/{inquiry_id}/status")
def update_inquiry_status(inquiry_id: int, payload: InquiryStatusUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM inquiries WHERE id = ?", (inquiry_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    cursor.execute("UPDATE inquiries SET status = ? WHERE id = ?", (payload.status, inquiry_id))
    conn.commit()
    conn.close()

    return {"success": True, "id": inquiry_id, "status": payload.status}

@app.delete("/api/inquiries/{inquiry_id}")
def delete_inquiry(inquiry_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM inquiries WHERE id = ?", (inquiry_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Inquiry not found")

    cursor.execute("DELETE FROM inquiries WHERE id = ?", (inquiry_id,))
    conn.commit()
    conn.close()

    return {"success": True, "message": f"Inquiry #{inquiry_id} removed"}
