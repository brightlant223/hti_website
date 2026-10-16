from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
import json
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
    description="Official REST API for HTI Automation & Security Systems Pvt. Ltd. product catalog and inquiries",
    version="1.0.0",
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

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "HTI Systems API", "version": "1.0.0"}

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

    conn.close()
    return {
        "total_products": total_products,
        "total_categories": total_categories,
        "total_partners": total_partners,
        "total_clients": total_clients,
        "total_inquiries": total_inquiries,
        "years_in_business": 12
    }

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
        raise HTTPException(status_code=404, detail="Product not found")

    return format_product_row(row)

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
