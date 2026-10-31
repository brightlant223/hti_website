import sqlite3
import json
import os
import base64
import hashlib
import secrets
from pathlib import Path

DB_PATH = Path(__file__).parent / "hti.db"
PASSWORD_HASH_ITERATIONS = 310_000

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PASSWORD_HASH_ITERATIONS
    )
    return (
        f"pbkdf2_sha256${PASSWORD_HASH_ITERATIONS}$"
        f"{base64.urlsafe_b64encode(salt).decode()}$"
        f"{base64.urlsafe_b64encode(digest).decode()}"
    )

def get_connection():
    conn = sqlite3.connect(DB_PATH, timeout=20.0)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.row_factory = sqlite3.Row
    return conn

def migrate_columns(cursor):
    tables = {
        "products": [
            ("image_url", "TEXT"),
            ("gallery", "TEXT DEFAULT '[]'"),
            ("brochure_url", "TEXT"),
            ("datasheet_url", "TEXT"),
            ("video_url", "TEXT DEFAULT ''"),
            ("is_published", "INTEGER DEFAULT 1"),
            ("display_order", "INTEGER DEFAULT 0"),
        ],
        "inquiries": [
            ("assigned_to", "TEXT DEFAULT 'Unassigned'"),
            ("followup_notes", "TEXT DEFAULT ''"),
            ("last_contacted_at", "TEXT"),
            ("updated_at", "TEXT")
        ],
        "clients": [
            ("logo_url", "TEXT"),
            ("website_url", "TEXT"),
            ("is_active", "INTEGER DEFAULT 1"),
            ("display_order", "INTEGER DEFAULT 0"),
            ("is_authorized", "INTEGER DEFAULT 1"),
        ],
        "partners": [
            ("logo_url", "TEXT"),
            ("website_url", "TEXT"),
            ("is_active", "INTEGER DEFAULT 1"),
            ("display_order", "INTEGER DEFAULT 0"),
            ("is_authorized", "INTEGER DEFAULT 1"),
        ],
        "blogs": [
            ("tags", "TEXT DEFAULT ''"),
            ("seo_title", "TEXT"),
            ("meta_description", "TEXT"),
            ("scheduled_at", "TEXT"),
        ]
    }
    for table, cols in tables.items():
        try:
            cursor.execute(f"PRAGMA table_info({table})")
            existing_cols = {row[1] for row in cursor.fetchall()}
            for col_name, col_def in cols:
                if col_name not in existing_cols:
                    cursor.execute(f"ALTER TABLE {table} ADD COLUMN {col_name} {col_def}")
        except Exception as e:
            print(f"Migration notice for {table}: {e}")

def add_audit_log(username: str, action: str, module: str, details: str):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO audit_logs (username, action, module, details)
        VALUES (?, ?, ?, ?)
        """, (username or "system", action, module, details))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Failed to record audit log: {e}")

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Create products table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT NOT NULL,
        tagline TEXT,
        description TEXT NOT NULL,
        features TEXT NOT NULL, -- JSON array
        specs TEXT NOT NULL,    -- JSON object
        applications TEXT,     -- JSON array
        badge TEXT,
        is_featured INTEGER DEFAULT 0,
        image_url TEXT,
        brochure_url TEXT,
        datasheet_url TEXT,
        is_published INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0
    );
    """)

    # Create inquiries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT,
        category TEXT,
        product_name TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'New',
        assigned_to TEXT DEFAULT 'Unassigned',
        followup_notes TEXT DEFAULT '',
        last_contacted_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Create partners table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS partners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        tagline TEXT,
        logo_url TEXT,
        website_url TEXT,
        is_active INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        is_authorized INTEGER DEFAULT 1
    );
    """)

    # Create clients table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sector TEXT NOT NULL,
        logo_url TEXT,
        website_url TEXT,
        is_active INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        is_authorized INTEGER DEFAULT 1
    );
    """)

    # Create blogs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL DEFAULT 'HTI Engineering Team',
        read_time TEXT DEFAULT '5 min read',
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        is_published INTEGER DEFAULT 1,
        tags TEXT DEFAULT '',
        seo_title TEXT,
        meta_description TEXT,
        scheduled_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Create projects table (Module 6: Projects & Installations)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        client_name TEXT,
        client_approved INTEGER DEFAULT 1,
        industry TEXT NOT NULL,
        location TEXT NOT NULL,
        completion_year TEXT,
        description TEXT NOT NULL,
        image_url TEXT,
        related_products TEXT, -- JSON array
        is_published INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Create website_content table (Module 7: Website Content Management)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS website_content (
        section_key TEXT PRIMARY KEY,
        data_json TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Create admin_users table (Module 8: Admin Users & Roles)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Administrator',
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Create audit_logs table (Module 8: Audit Logs)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        username TEXT NOT NULL,
        action TEXT NOT NULL,
        module TEXT NOT NULL,
        details TEXT NOT NULL
    );
    """)

    # Create system_settings table (Module 9: Settings & System Health)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
    """)

    cursor.execute("""
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
        current_location TEXT DEFAULT '',
        job_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS job_postings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        job_category TEXT DEFAULT 'Full-time',
        employment_type TEXT DEFAULT 'Full-time',
        location TEXT DEFAULT 'Navi Mumbai HQ',
        openings INTEGER DEFAULT 1,
        experience TEXT DEFAULT '0-2 Years',
        salary_range TEXT DEFAULT '',
        skills TEXT DEFAULT '',
        description TEXT DEFAULT '',
        responsibilities TEXT DEFAULT '',
        qualifications TEXT DEFAULT '',
        additional_requirements TEXT DEFAULT '',
        deadline TEXT DEFAULT '',
        status TEXT DEFAULT 'Published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        company TEXT DEFAULT 'Not Specified',
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        area_of_interest TEXT DEFAULT 'General Enquiry',
        project_details TEXT NOT NULL,
        message TEXT DEFAULT '',
        status TEXT DEFAULT 'New',
        notes TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customer_reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        company TEXT DEFAULT '',
        location TEXT DEFAULT '',
        email TEXT DEFAULT '',
        rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
        review_text TEXT NOT NULL,
        client_id TEXT DEFAULT '',
        client_name TEXT DEFAULT '',
        status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
        is_published INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Run safe column migration for any existing tables
    migrate_columns(cursor)

    # Complete schemas for tables introduced by earlier database adapters.
    migrate_columns_for_unified_tables(cursor)

    conn.commit()
    migrate_legacy_testimonials(conn)
    conn.commit()
    conn.close()

def seed_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as count FROM products")
    if cursor.fetchone()["count"] == 0:
        products = [
        # AUTOMATION
        {
            "slug": "door-interlock-system",
            "name": "Door Interlock System",
            "category": "Automation",
            "subcategory": "Clean Room & Controlled Access",
            "tagline": "Multi-door airlock management for cleanrooms & critical laboratories",
            "description": "The door interlocking system is engineered to control personnel entry into sensitive, controlled environments such as pharmaceutical clean rooms, biotechnology labs, and healthcare suites where air pressure and contamination prevention are paramount. Composed of 2 to 12 electrically interlocked doors, it ensures that adjacent doors cannot be opened simultaneously, safeguarding clean air balance.",
            "features": json.dumps([
                "Supports 2 to 12 doors electrically interlocked",
                "Available in Flameproof and Non-Flameproof variants",
                "Programmable delay timer between door openings to preserve differential pressure",
                "Emergency override key switch / push button module for instant evacuation",
                "Multi-credential triggering: Biometric, RFID Proximity, Push Button or Sensor",
                "Audible and visual LED status indicators on each door station"
            ]),
            "specs": json.dumps({
                "Door Support": "2 to 12 Doors per Controller",
                "Enclosure Options": "Flameproof Ex-d / Non-Flameproof MS Powder Coated",
                "Operating Voltage": "12V / 24V DC Internal Linear Power Supply",
                "Interlocking Logic": "Sequential / First-Come-First-Serve",
                "Emergency Modes": "Fire Alarm Trigger Auto-Release & Key Switch"
            }),
            "applications": json.dumps([
                "Pharma Clean Rooms (ISO 5 - ISO 8)",
                "Bio-safety Labs & Containment Zones",
                "Hospitals & Surgical Theatres",
                "Semiconductor & Electronic Manufacturing"
            ]),
            "badge": "Flagship Product",
            "is_featured": 1
        },
        {
            "slug": "automatic-sliding-swing-door",
            "name": "Automatic Sliding & Swing Doors",
            "category": "Automation",
            "subcategory": "Pedestrian Access",
            "tagline": "Architectural grade touchless automatic entrance solutions",
            "description": "Precision engineered automatic sliding and swing doors providing hands-free, energy-efficient access for corporate headquarters, pharmaceutical entryways, hospitals, and commercial facilities. Available with micro-processed brushless DC motors, safety sensors, and silent operation.",
            "features": json.dumps([
                "Heavy-duty brushless DC motor with high-efficiency gearbox",
                "Microwave motion sensors and active infrared safety presence detection",
                "Options for frameless toughened glass or insulated hollow metal frames",
                "Battery backup for emergency fail-safe opening during power outage",
                "Programmable opening/closing speeds and hold-open durations"
            ]),
            "specs": json.dumps({
                "Door Weight Capacity": "Up to 150 kg per leaf (Single) / 120 kg x 2 (Bi-parting)",
                "Opening Speed": "100 - 550 mm/sec (Adjustable)",
                "Power Supply": "230V AC ± 10%, 50Hz",
                "Activation": "Microwave Radar, Foot Sensor, Push Button, Access Control"
            }),
            "applications": json.dumps([
                "Corporate Offices & IT Parks",
                "Pharma Entry Airlocks",
                "Hospitals & Healthcare Facilities",
                "Airports & Retail Complexes"
            ]),
            "badge": "High Demand",
            "is_featured": 1
        },
        {
            "slug": "automatic-sliding-swing-gate",
            "name": "Automatic Sliding & Swing Gates",
            "category": "Automation",
            "subcategory": "Perimeter Security",
            "tagline": "Rugged, high-torque motorized gates for corporate and industrial perimeters",
            "description": "Heavy-duty perimeter security entrance gates manufactured with high-tensile steel and automated with oil-bath electro-mechanical or hydraulic operators. Engineered to resist unauthorized forced entry while providing seamless vehicle throughput.",
            "features": json.dumps([
                "High-torque oil bath gear motor designed for continuous duty cycles",
                "Obstacle detection with safety photocells and mechanical safety edges",
                "Remote control, RFID tag, and automatic loop detector integration",
                "Manual release mechanism with personalized key in case of power loss",
                "Hot-dip galvanized, rust-resistant powder-coated construction"
            ]),
            "specs": json.dumps({
                "Gate Weight": "500 kg to 3000 kg capacity options",
                "Operating Speed": "12 to 20 meters per minute",
                "Duty Cycle": "Heavy-Duty 100% Continuous rating",
                "Weather Protection": "IP55 / IP65 weather-sealed enclosures"
            }),
            "applications": json.dumps([
                "Industrial Plants & Manufacturing Hubs",
                "Corporate Campuses & Tech Parks",
                "Warehousing & Logistics Parks",
                "Gated Communities & Defense Premises"
            ]),
            "badge": "Heavy Duty",
            "is_featured": 0
        },
        {
            "slug": "telescopic-cantilever-gate",
            "name": "Telescopic & Cantilever Gates",
            "category": "Automation",
            "subcategory": "Perimeter Security",
            "tagline": "Trackless and space-saving solutions for extra-wide openings",
            "description": "Telescopic gates utilize overlapping leafs that move synchronously, reducing the required back-run parking area by up to 50%. Cantilever gates eliminate ground tracks entirely, floating over uneven, sloping, or debris-prone ground without track maintenance.",
            "features": json.dumps([
                "Telescopic sliding gate saves critical back-run area on tight site boundaries",
                "Cantilever system requires zero track on the driveway—no debris clogging",
                "Smooth synchronous multi-panel cable/chain drive system",
                "Heavy-duty internal roller carriage assemblies for silent traversal",
                "Integrated optical safety beams and soft stop electronics"
            ]),
            "specs": json.dumps({
                "Clear Opening": "Up to 25 meters clear span",
                "Drive Type": "Trackless Cantilever / Multi-leaf Telescopic Wire Drive",
                "Leaf Thickness": "High grade structural tubular steel",
                "Controls": "PLC / Microprocessor based with soft start and soft stop"
            }),
            "applications": json.dumps([
                "Railway crossings and intermodal hubs",
                "Sites with sloping driveways or heavy sediment",
                "Wide logistic yard access points",
                "Security sensitive restricted areas"
            ]),
            "badge": "Engineered Solution",
            "is_featured": 1
        },
        {
            "slug": "pvc-rapid-roll-up-door",
            "name": "PVC Rapid Roll Up Door",
            "category": "Automation",
            "subcategory": "Industrial Doors",
            "tagline": "High-speed flexible curtains for climate control, hygiene & dust isolation",
            "description": "PVC Rapid Roll Up Doors provide rapid opening and closing cycles (up to 1.5 m/s) to isolate temperature, humidity, and airborne contaminants between different zones. Fitted with high-tech rust-proof frames, self-repairing zipper guides, and transparent vision windows.",
            "features": json.dumps([
                "Rapid operating cycle up to 1.5 m/s minimizes air exchange",
                "High-tech rust proof galvanized or stainless steel frame",
                "Heavy-duty reinforced polyester PVC fabric with high tensile strength",
                "Anti-wind aluminum reinforcement profiles and transparent vision window",
                "Safety bottom wireless edge and dual infrared curtain safety"
            ]),
            "specs": json.dumps({
                "Opening Speed": "Up to 1.5 m/sec (Frequency inverter controlled)",
                "Curtain Material": "900 g/m² PVC polyester fabric (Flame retardant DIN 4102 B1)",
                "Wind Resistance": "Class 2 (EN 12424)",
                "Vision Panel": "Transparent PVC window 2mm thick at eye level"
            }),
            "applications": json.dumps([
                "Pharma Packaging & Formulation Halls",
                "Cold Storage & Food Processing Plants",
                "Clean Manufacturing & Electronics",
                "High Traffic Logistics Warehouses"
            ]),
            "badge": "Energy Saving",
            "is_featured": 1
        },
        {
            "slug": "sectional-overhead-door",
            "name": "Sectional Overhead Door",
            "category": "Automation",
            "subcategory": "Industrial Doors",
            "tagline": "Robust insulated panels sliding under the roof to maximize bay space",
            "description": "Automated industrial overhead doors crafted from double-skinned insulated polyurethane sandwich panels. Designed to glide upward and tuck under the ceiling structure, leaving the entire loading threshold and exterior roadway unobstructed.",
            "features": json.dumps([
                "Double-wall insulated steel sandwich panels filled with CFC-free PU foam",
                "Exceptional thermal and acoustic insulation (thermal break seals)",
                "Heavy-duty torsion spring balancing system with cable break safety devices",
                "Available with acrylic double-glazed viewing windows and pass doors",
                "Motorized with chain hoist manual override"
            ]),
            "specs": json.dumps({
                "Panel Thickness": "40 mm / 50 mm Polyurethane insulated steel",
                "Balancing": "High cycle torsion springs (up to 50,000 cycles)",
                "Operating Speed": "0.25 m/sec with soft-start inverter motor",
                "Safety Features": "Spring break device, cable failure brake, bottom safety edge"
            }),
            "applications": json.dumps([
                "Dock Loading Bays",
                "Automotive Assembly Plants",
                "Distribution Centers",
                "Aircraft & Transit Maintenance Hangars"
            ]),
            "badge": "Space Maximizer",
            "is_featured": 0
        },
        {
            "slug": "fire-rated-door-shutter",
            "name": "Fire Rated Doors & Shutters",
            "category": "Automation",
            "subcategory": "Industrial Doors",
            "tagline": "Certified life-safety barrier preventing the spread of fire and toxic smoke",
            "description": "Constructed from heavy gauge hollow metal steel with specialized fire-resistant mineral core insulation. Tested and certified to resist flames for 60, 120, or 240 minutes, conforming to national and international building fire codes.",
            "features": json.dumps([
                "Certified 1-hour, 2-hour, and 4-hour fire ratings (IS 3614 / BS 476)",
                "High density ceramic wool / mineral core insulation",
                "Intumescent fire seals that expand under heat to block smoke",
                "Automatic gravity-drop or motorized release upon fire alarm trigger",
                "Heavy-duty fire-rated hardware, panic exit bars, and door closers"
            ]),
            "specs": json.dumps({
                "Fire Ratings": "60 min / 120 min / 240 min certified",
                "Sheet Gauge": "1.2 mm / 1.6 mm Galvanized Steel",
                "Infill Material": "Honeycomb core / Rockwool insulation (96 kg/m³)",
                "Integration": "Direct link to Building Fire Alarm Control Panel (FACP)"
            }),
            "applications": json.dumps([
                "Fire Exit Stairwells & Corridors",
                "Electrical Sub-stations & Transformer Rooms",
                "Industrial Chemical Storage",
                "Commercial High-Rises & IT Parks"
            ]),
            "badge": "Life Safety Certified",
            "is_featured": 0
        },
        {
            "slug": "boom-barrier",
            "name": "Automatic Boom Barrier",
            "category": "Automation",
            "subcategory": "Vehicle Access Control",
            "tagline": "Electromechanical & hydraulic barriers for heavy-duty traffic toll & parking control",
            "description": "High-frequency automatic boom barriers offering rapid and dependable vehicle access restriction. Engineered for high cycle rates at factory gates, corporate houses, toll plazas, and commercial parking complexes.",
            "features": json.dumps([
                "Available in precision electro-mechanical and high-cycle hydraulic drives",
                "Boom lengths from 3 meters up to 8 meters (telescopic / folding options)",
                "High speed opening from 1.5 to 6 seconds depending on boom length",
                "Integrated LED boom illumination strips for maximum night visibility",
                "Seamless integration with RFID long-range readers, ANPR, and loop detectors"
            ]),
            "specs": json.dumps({
                "Boom Length": "3m to 8m (Round, Octagonal or Articulated)",
                "Operating Time": "1.5s to 6.0s (Adjustable speed)",
                "Duty Cycle": "100% Continuous (Brushless DC / Hydraulic)",
                "Housing": "2mm cold-rolled steel with epoxy polyester powder coating"
            }),
            "applications": json.dumps([
                "Corporate Office Campuses",
                "Highway Toll Plazas & Weighbridges",
                "Residential Gated Enclaves",
                "Logistics Yard Entry / Exit"
            ]),
            "badge": "High Speed",
            "is_featured": 1
        },
        {
            "slug": "dock-levellers-dock-shelter",
            "name": "Dock Levellers & Dock Shelters",
            "category": "Automation",
            "subcategory": "Material Handling",
            "tagline": "Heavy-duty hydraulic bridge systems for seamless loading bay logistics",
            "description": "Bridges the physical gap and elevation difference between the warehouse loading dock floor and the truck trailer bed. Handles forklifts up to 8000 kg capacity smoothly, reducing shocks, tire wear, and cargo damage.",
            "features": json.dumps([
                "Heavy-duty capacity options: 4,000 kg, 6,000 kg, and 8,000 kg dynamic loads",
                "Hydraulic lip with smooth tapered transition to truck bed",
                "Twin hydraulic cylinders with emergency velocity fuses against truck drive-away",
                "Lateral soft PVC front single and double frame dock shelter",
                "Strong aluminum profile mounting, weather sealing against dust and rain"
            ]),
            "specs": json.dumps({
                "Load Capacity": "4000 kg, 6000 kg, 8000 kg Dynamic",
                "Lip Length": "400 mm / 500 mm Telescopic or Hinged Lip",
                "Platform Sheet": "Chequered tear-drop anti-skid high-tensile steel",
                "Shelter Material": "3mm lateral tear-proof PVC curtains with aluminum extrusion"
            }),
            "applications": json.dumps([
                "FMCG & Retail Distribution Centers",
                "Cold Chain Warehouses",
                "Manufacturing Export Depots",
                "Container Freight Stations"
            ]),
            "badge": "Industrial Grade",
            "is_featured": 0
        },
        {
            "slug": "flap-barrier-turnstile",
            "name": "Turnstiles & Flap Barriers",
            "category": "Automation",
            "subcategory": "Pedestrian Access",
            "tagline": "High-throughput pedestrian access control with biometric & RFID compatibility",
            "description": "Compact and sleek pedestrian speed gates engineered to regulate high-density foot traffic into secured zones. Provides fast throughput of up to 45 people per minute with anti-tailgating infrared sensor arrays.",
            "features": json.dumps([
                "High passage frequency up to 45 people per minute",
                "Precision optical anti-tailgating sensors prevent unauthorized following",
                "Compatible with Biometric Fingerprint, Facial Recognition, and RFID Readers",
                "Automatic opening upon fire alarm activation for rapid safe evacuation",
                "Brushed SUS304 stainless steel cabinet with LED directional indicators"
            ]),
            "specs": json.dumps({
                "Throughput": "35 - 45 persons per minute",
                "Passage Width": "550 mm standard / 900 mm ADA handicap lane",
                "Material": "SUS304 Stainless Steel (1.5mm / 2.0mm thickness)",
                "Flap Wings": "Toughened Acrylic / Polyurethane soft wings"
            }),
            "applications": json.dumps([
                "Corporate Lobby Entrances",
                "Metro & Transit Stations",
                "Pharma Plant Floor Entry",
                "Educational Campuses & Research Labs"
            ]),
            "badge": "Smart Access",
            "is_featured": 1
        },
        {
            "slug": "automatic-bollard-tyre-killer-car-lift",
            "name": "Bollards, Tyre Killers & Car Lifts",
            "category": "Automation",
            "subcategory": "Vehicle Security",
            "tagline": "High-security anti-ram vehicle defense and hydraulic parking lifts",
            "description": "Crash-rated rising hydraulic bollards, electro-mechanical tyre killer spike barriers, and heavy-duty hydraulic car lifts for multi-level parking efficiency. Provides physical protection against hostile vehicle attacks.",
            "features": json.dumps([
                "Hydraulic automatic rising bollards with built-in LED warning crowns",
                "Heavy-duty hardened steel tyre killers shred pneumatic tires instantly",
                "Bi-directional or single directional access barrier configurations",
                "Scissor car lifts for underground vehicle storage and workshop elevation",
                "Sub-second emergency fast operation (EFO) available on anti-terror bollards"
            ]),
            "specs": json.dumps({
                "Bollard Impact Resistance": "K4 / K8 / K12 Crash-test equivalent ratings",
                "Bollard Rise Time": "2.5 to 4 seconds (1.5s with EFO)",
                "Tyre Killer Spike Height": "150 mm high-strength alloy spikes",
                "Car Lift Capacity": "3000 kg - 5000 kg electro-hydraulic scissor platform"
            }),
            "applications": json.dumps([
                "High Commission & Government Embassies",
                "Corporate Headquarters & IT Hubs",
                "Bank Vaults & Currency Chests",
                "Automotive Dealerships & Luxury Garages"
            ]),
            "badge": "Anti-Ram Defense",
            "is_featured": 0
        },
        {
            "slug": "rfid-long-range-barcode-reader",
            "name": "RFID Long Range Readers & Barcode Scanners",
            "category": "Automation",
            "subcategory": "Identification & Tracking",
            "tagline": "Ultra-high frequency identification for vehicles and industrial inventory",
            "description": "UHF long-range RFID readers for hands-free vehicle toll and parking access up to 12 meters, paired with high-durability 1D/2D QR/barcode scanners for material management in industrial assembly lines.",
            "features": json.dumps([
                "Long reading distance up to 12 meters for automatic boom barrier opening",
                "Multi-tag reading capability with anti-collision algorithms",
                "Wiegand 26/34, RS485, and TCP/IP Ethernet interfaces",
                "Rugged IP67 waterproof antenna enclosure for outdoor mounting",
                "Industrial handheld and fixed barcode / 2D QR scanners"
            ]),
            "specs": json.dumps({
                "Operating Frequency": "UHF 865-867 MHz (India / ETSI) / 902-928 MHz",
                "Read Distance": "6m to 12m (Dependent on windshield RFID tag)",
                "Interface": "Wiegand, RS232/485, RJ45 Ethernet",
                "Protection Rating": "IP67 Weatherproof outdoor grade"
            }),
            "applications": json.dumps([
                "Automated Parking Gates & Tolls",
                "Fleet Management & Logistics Yards",
                "Pharma Raw Material Tracking",
                "Cleanroom Inventory Verification"
            ]),
            "badge": "High Accuracy",
            "is_featured": 0
        },

        # SECURITY SYSTEMS
        {
            "slug": "cctv-surveillance-system",
            "name": "CCTV Surveillance System",
            "category": "Security System",
            "subcategory": "Video Surveillance",
            "tagline": "Full spectrum HD, IP, PTZ, intrusion, and intrinsically safe cameras",
            "description": "Comprehensive video surveillance systems ranging from crystal clear 4K Ultra HD IP cameras, optical zoom PTZ speed domes, thermal intrusion cameras, through to intrinsically safe explosion-proof cameras for hazardous chemical zones.",
            "features": json.dumps([
                "IP Cameras, Analogue HD, PTZ, and IP Speed Domes with optical zoom",
                "Audio-based IP cameras with two-way intercom and sound detection",
                "Intrinsically safe camera housings for chemical and explosive atmospheres",
                "AI powered video analytics: perimeter intrusion, line cross, and face capture",
                "Centralized Network Video Recorder (NVR) with remote cloud live streaming"
            ]),
            "specs": json.dumps({
                "Resolution Options": "2MP, 4MP, 8MP (4K) Ultra HD with WDR",
                "Sensors": "Sony Starvis low-light color night vision",
                "PTZ Zoom": "25x to 42x Optical Zoom with 360° endless pan",
                "Certifications": "ATEX / IECEx for Intrinsically Safe models"
            }),
            "applications": json.dumps([
                "Manufacturing Plants & Perimeter Fencing",
                "Pharma Clean Areas & Packaging Lines",
                "Refineries & Hazardous Chemical Zones",
                "Commercial Towers & Retail Centers"
            ]),
            "badge": "AI Powered",
            "is_featured": 1
        },
        {
            "slug": "biometric-access-control-time-attendance",
            "name": "Biometric Access Control & Time Attendance",
            "category": "Security System",
            "subcategory": "Access & Identity",
            "tagline": "Seamless fingerprint, RFID proximity, and multi-factor biometric systems",
            "description": "High-accuracy biometric identification and time-attendance terminals designed to work seamlessly with electric strikes, magnetic door locks, and HR payroll software. Provides verifiable audit trails of personnel movement.",
            "features": json.dumps([
                "Advanced optical and capacitive fingerprint sensors with anti-spoofing",
                "Integrated RFID / Proximity card reader (125kHz EM / 13.56MHz Mifare)",
                "Touchless facial recognition with live temperature screening options",
                "Direct connection to automated door strikes, electro-magnetic locks, and barriers",
                "Comprehensive software for shifts, overtime, and centralized payroll sync"
            ]),
            "specs": json.dumps({
                "User Capacity": "Up to 50,000 users / 500,000 transaction log storage",
                "Authentication Speed": "< 0.5 seconds",
                "Communication": "TCP/IP, Wi-Fi, RS485, USB, Wiegand Out",
                "Lock Relay": "Built-in door sensor and alarm output relay"
            }),
            "applications": json.dumps([
                "Corporate Offices & IT Parks",
                "Pharma R&D and Production Cleanrooms",
                "Educational Institutions",
                "Government and Defense Offices"
            ]),
            "badge": "High Accuracy",
            "is_featured": 1
        },
        {
            "slug": "fire-alarm-system",
            "name": "Fire Alarm System (Conventional & Addressable)",
            "category": "Security System",
            "subcategory": "Life Safety & Detection",
            "tagline": "Advanced fire detection panels, multi-sensors, hooters & AHU integration",
            "description": "A complete range of advanced conventional and addressable fire alarm systems, smoke/heat/multi detectors, manual call points, and signalling devices. Engineered for new installations or turnkey retrofits, with intelligent integration to door interlocks and AHU dampers.",
            "features": json.dumps([
                "Conventional and Addressable fire control panels with multi-loop scalability",
                "Full detector suite: Optical Smoke, Thermal Heat, Multi-Sensor, and Beam detectors",
                "Intrinsically safe detectors for hazardous and flame-risk areas",
                "Audio-visual electronic sounders, hooters, and flash strobe indicators",
                "Auto-trip integration with Door Interlock Systems, AHU dampers, and FAS relays"
            ]),
            "specs": json.dumps({
                "Loop Capacity": "1 to 8 Loops (Up to 254 devices per loop on Addressable)",
                "Compliance": "UL Listed / EN 54 / IS 2189 certified",
                "Detector Types": "Photoelectric Smoke, Rate-of-Rise Heat, Multi-Criteria",
                "Display": "Backlit LCD graphics display with zone mimic LEDs"
            }),
            "applications": json.dumps([
                "Pharmaceutical Complexes",
                "High-Rise Commercial Buildings",
                "Industrial Warehouses & Factories",
                "Hospitals & Hospitality Resorts"
            ]),
            "badge": "Life Safety",
            "is_featured": 1
        },
        {
            "slug": "fire-fighting-system",
            "name": "Turnkey Fire Fighting Systems",
            "category": "Security System",
            "subcategory": "Fire Protection",
            "tagline": "High-pressure fire hydrant infrastructure, pumps, landing valves & piping",
            "description": "A fire hydrant system is a critical component of a building's fire protection infrastructure. It enables prompt and effective firefighting by delivering high-pressure water to extinguish fires rapidly. HTI delivers end-to-end turnkey design, supply, installation, and commissioning.",
            "features": json.dumps([
                "Complete fire pump set: Main Electric Motor, Diesel Engine Standby, and Jockey Pump",
                "Heavy-duty ISI certified hydrant valves, landing valves, and branch pipes",
                "Reinforced canvas hose reels with instantaneous couplings and drum cabinets",
                "Dedicated underground / overhead water storage tank design and fire brigade inlets",
                "Calibrated industrial pressure gauges, flow meters, and air release valves"
            ]),
            "specs": json.dumps({
                "Pump Capacities": "450 GPM to 2500 GPM (Electric / Diesel / Jockey)",
                "Working Pressure": "7 kg/cm² to 14 kg/cm² operating range",
                "Piping Standard": "MS Heavy Class ERW pipes with anti-corrosion red coating",
                "Certifications": "Compliant with NBC 2016, TAC, and local CFO norms"
            }),
            "applications": json.dumps([
                "Industrial Manufacturing Facilities",
                "Pharma Formulation & API Plants",
                "Commercial Malls & Multiplexes",
                "Logistics Depots & Container Terminals"
            ]),
            "badge": "Turnkey Solution",
            "is_featured": 1
        },
        {
            "slug": "gas-detection-system",
            "name": "Gas Detection System",
            "category": "Security System",
            "subcategory": "Environmental Safety",
            "tagline": "Flameproof & non-flameproof monitoring for toxic, combustible & VOC gases",
            "description": "Continuous real-time gas monitoring instruments providing early detection of toxic, oxygen-depleting, and combustible gas leaks in industrial clean rooms, chemical plants, and manufacturing floors.",
            "features": json.dumps([
                "Certified Flameproof (Ex-d) and Non-Flameproof sensor enclosures",
                "Detects LEL combustible gases, CO, CO2, NH3, H2S, O2, and VOC solvents",
                "Bright local digital OLED/LCD display with dual-level audible/visual alarms",
                "Standard 4-20mA current loop and RS485 Modbus RTU communications",
                "Direct relay interlock with industrial exhaust blowers and gas shut-off valves"
            ]),
            "specs": json.dumps({
                "Gas Coverage": "Toxic, Combustible (% LEL), Oxygen, Refrigerants",
                "Sensor Principle": "Catalytic Pellistor, Electrochemical, NDIR Infrared",
                "Enclosure": "Cast Aluminum / Stainless Steel SS316 Flameproof",
                "Output": "4-20 mA Analog, RS485 Modbus, SPDT Relay Contacts"
            }),
            "applications": json.dumps([
                "Pharma Solvent Storage & Synthesis",
                "Chemical Processing Plants",
                "Gas Cylinder Manifolds & Boiler Rooms",
                "Underground Utility Basements"
            ]),
            "badge": "Flameproof Ex-d",
            "is_featured": 0
        },
        {
            "slug": "gps-digital-clock",
            "name": "Digital & GPS Synchronized Clocks",
            "category": "Security System",
            "subcategory": "Precision Timing",
            "tagline": "Master-slave synchronized digital clocks for pharma audit compliance",
            "description": "High-visibility master-slave digital clocks synchronized automatically via GPS satellite receiver or NTP Ethernet server. Essential for USFDA 21 CFR Part 11 and WHO-GMP compliance across pharmaceutical manufacturing batches.",
            "features": json.dumps([
                "GPS satellite wireless synchronization or Ethernet NTP network sync",
                "Available in Flameproof (Ex-d) cast enclosure and Non-Flameproof SS flush mount",
                "High-intensity 7-segment red/green LED digits visible from 30+ meters",
                "Standardized time across all clean room production blocks and QA/QC labs",
                "Internal RTC backup battery retains accurate time during power outages"
            ]),
            "specs": json.dumps({
                "Digit Height": "2-inch / 4-inch / 6-inch high-visibility LEDs",
                "Display Format": "HH:MM:SS (24-Hour / 12-Hour format)",
                "Time Source": "GPS Antenna (outdoor) / NTP Server via RJ45",
                "Enclosure": "Stainless Steel SS304 Flush Mount / Flameproof IIA, IIB"
            }),
            "applications": json.dumps([
                "Pharma Batch Manufacturing Cleanrooms",
                "Quality Assurance & Analytical Labs",
                "Hospital OT Suites & ICUs",
                "Corporate Dispatch and Board Rooms"
            ]),
            "badge": "USFDA Compliant",
            "is_featured": 0
        },
        {
            "slug": "public-address-system",
            "name": "Public Address (PA) System",
            "category": "Security System",
            "subcategory": "Acoustics & Mass Notification",
            "tagline": "Turnkey audio packages for paging, announcements & voice evacuation",
            "description": "PA systems engineered to reinforce voice and emergency notifications across expansive industrial plants, corporate auditoriums, and commercial complexes. HTI provides complete packages from ceiling speakers, horn speakers, amplifiers to multi-zone mixing consoles.",
            "features": json.dumps([
                "Turnkey packages: speakers, mixer amplifiers, stands, microphones, and cabling",
                "Zoned audio distribution allowing targeted announcements per floor or sector",
                "Integration with Fire Alarm Systems for automatic voice evacuation overrides",
                "High-clarity ceiling speakers, wall-mount cabinets, and IP-rated horn speakers",
                "Paging microphones with chime tones and priority override"
            ]),
            "specs": json.dumps({
                "Amplifier Power": "120W to 1000W multi-channel zone amplifiers",
                "Speaker Line": "70V / 100V distributed constant voltage line",
                "Frequency Response": "80 Hz - 18 kHz with low harmonic distortion",
                "Emergency Override": "Automatic 24V fire alarm trigger contact"
            }),
            "applications": json.dumps([
                "Plant Floor Announcements",
                "Corporate Auditoriums & Town Halls",
                "Hospital Emergency Voice Notification",
                "Malls & Commercial Buildings"
            ]),
            "badge": "Turnkey Audio",
            "is_featured": 0
        },
        {
            "slug": "ip-pbx-epabx",
            "name": "IP-PBX & EPABX Unified Communications",
            "category": "Security System",
            "subcategory": "Telephony",
            "tagline": "Enterprise VoIP and hybrid telephone exchanges for corporate connectivity",
            "description": "Next-generation IP-PBX communication platforms supporting SIP extensions, remote branch interconnection, multi-party conference calling, and unified mobile apps for modern enterprise collaboration.",
            "features": json.dumps([
                "Hybrid architecture supporting SIP VoIP, analog extensions, and PRI/ISDN trunks",
                "Scalable from 10 extensions up to 2000+ enterprise extensions",
                "Integrated IVR auto-attendant, voice mail to email, and call recording",
                "Seamless inter-branch calling across geographically dispersed offices",
                "Compatible with IP executive desk phones, video phones, and softphones"
            ]),
            "specs": json.dumps({
                "Protocols": "SIP (RFC3261), IAX2, H.323",
                "Concurrent Calls": "Up to 500 concurrent VoIP calls",
                "Network": "Gigabit Ethernet with PoE and redundant power supply",
                "Management": "Intuitive web GUI for user extension provisioning"
            }),
            "applications": json.dumps([
                "Corporate Headquarters & IT Centers",
                "Multi-location Pharma Factories",
                "Hospital Nurse Call & Doctor Paging",
                "Hotels & Residential Towers"
            ]),
            "badge": "Enterprise VoIP",
            "is_featured": 0
        },
        {
            "slug": "server-room-monitoring-system",
            "name": "Server Room Environmental Monitoring",
            "category": "Security System",
            "subcategory": "IT Infrastructure Protection",
            "tagline": "Room Alert multi-sensor protection against heat, water leak, power & smoke",
            "description": "Real-time continuous environmental monitoring hardware for data centers and server rooms. Tracks temperature, humidity, water flooding under raised floors, power loss, and airflow, instantly alerting network administrators via SMS, email, and mobile apps.",
            "features": json.dumps([
                "Tracks temperature, humidity, power failure, fluid leaks, and airflow",
                "Water leak detection sensor ropes installed beneath raised access floors",
                "Real-time SMS, email, and push notification alerts before hardware damage occurs",
                "Web-browser dashboard with historical logging, graph charts, and SNMP traps",
                "Relay outputs to trigger auxiliary fans, air conditioners, or siren beacons"
            ]),
            "specs": json.dumps({
                "Sensors Supported": "Up to 32 digital sensors + switch contact inputs",
                "Alert Channels": "Email, SMS, SNMP Traps, Audio-Visual Tower Light",
                "Power": "Power-over-Ethernet (PoE) with internal battery backup",
                "Compatibility": "Nagios, PRTG, Zabbix, Room Alert Manager"
            }),
            "applications": json.dumps([
                "Enterprise Data Centers",
                "Server Closets & Network Racks",
                "Pharma Temperature-controlled Cold Rooms",
                "Telecom Switching Rooms"
            ]),
            "badge": "24/7 Monitoring",
            "is_featured": 1
        },

        # HYGIENE PRODUCTS
        {
            "slug": "hand-dryers",
            "name": "Automatic High Speed Hand Dryers",
            "category": "Hygiene",
            "subcategory": "Washroom Automation",
            "tagline": "Dual-blower high-speed hygienic hand drying with thermal overload protection",
            "description": "Fully automatic high-speed touchless hand dryers available in single-blower and double-blower configurations. Equipped with Thermal Overload Protection (T.O.P.), automatic 1-minute safety cutoff, and a specialized spectrum of designer shades.",
            "features": json.dumps([
                "Available in powerful Single Blower and high-velocity Double Blower models",
                "Fully automatic touch-free optical sensor operation",
                "Internal motor protected by T.O.P. (Thermal Overload Protection)",
                "Heater element safeguarded by internal thermostat and thermo fuse",
                "Designer color range: White, Ivory, Royal Blue, Dark Brown, and Matte Black",
                "Automatic 1-minute safety auto-cutoff timer prevents energy waste"
            ]),
            "specs": json.dumps({
                "Air Velocity": "Up to 90 m/sec dual blade air curtain",
                "Drying Time": "8 to 12 seconds rapid dry",
                "Casing Material": "Impact resistant ABS / Stainless Steel Grade 304",
                "Power Rating": "1200W - 1800W with auto-heating element switch"
            }),
            "applications": json.dumps([
                "Pharma Personnel Entry Washrooms",
                "Corporate Office Restrooms",
                "Malls, Theatres & Food Courts",
                "Airports & Metro Restrooms"
            ]),
            "badge": "Fast Dry",
            "is_featured": 1
        },
        {
            "slug": "air-curtain",
            "name": "Industrial & Commercial Air Curtains",
            "category": "Hygiene",
            "subcategory": "Air Barriers",
            "tagline": "Flameproof & non-flameproof thermo-zone barriers keeping insects and dust out",
            "description": "Engineered air curtains that create an efficient, invisible aerodynamic barrier over doorways. Keeps conditioned air inside while blocking external heat, dust, fumes, and insects. Available in Flameproof and Non-Flameproof specifications specially designed for pharma and malls.",
            "features": json.dumps([
                "Low noise operation with dynamically balanced multi-blade blowers",
                "Available in Flameproof (Ex-d) and Non-Flameproof configurations",
                "Thermo zone technology with precisely calibrated air velocity for even protection",
                "Drastically cuts HVAC air conditioning energy loss at frequently opened doors",
                "Specially engineered for pharmaceutical facilities, CPG plants, and commercial malls"
            ]),
            "specs": json.dumps({
                "Sizes Available": "1 meter, 1.2 meter, 1.5 meter, 1.8 meter, 2.0 meter lengths",
                "Air Velocity": "18 m/sec to 24 m/sec at nozzle",
                "Motor Protection": "High insulation grade continuous rating motor",
                "Noise Level": "< 58 dBA low vibration acoustic dampening"
            }),
            "applications": json.dumps([
                "Pharma Formulation & Packaging Entrances",
                "CPG Food Processing Bays",
                "Cold Storage & Air Conditioned Malls",
                "Restaurant Entrances & Kitchen Pass-throughs"
            ]),
            "badge": "Thermo Zone",
            "is_featured": 1
        },
        {
            "slug": "auto-tap",
            "name": "Automatic Sensor Taps",
            "category": "Hygiene",
            "subcategory": "Touchless Water Management",
            "tagline": "Solid-cast brass touchless sensor taps avoiding water wastage",
            "description": "Heavy-duty, stylish touch-free sensor taps featuring solid-cast brass outer shell construction. Activated instantly upon detecting hands under the spout, eliminating cross-contamination and saving up to 70% in water usage.",
            "features": json.dumps([
                "Infrared proximity sensor delivers touchless, germ-free operation",
                "Solid-cast brass heavy outer body with multi-layer chrome electroplating",
                "Dual power supply support: Battery operated (4x AA) or AC electrical adapter",
                "Mounting variations: Pillar mounted, Basin mounted, and Wall mounted options",
                "Built-in ceramic cartridge and water-saving aerator reducing water consumption"
            ]),
            "specs": json.dumps({
                "Sensing Range": "10 to 18 cm (Factory calibrated with auto-adjustment)",
                "Water Pressure": "0.05 MPa to 0.7 MPa",
                "Power Source": "DC 6V (4x AA alkaline) or AC 220V 50Hz",
                "Shut-off Delay": "< 1 second after hands leave sensing zone"
            }),
            "applications": json.dumps([
                "Pharma Hand Scrub Cleanrooms",
                "Hospitals & Surgical Scrub Areas",
                "Corporate Restrooms & Luxury Hotels",
                "Food Preparation & Kitchen Counters"
            ]),
            "badge": "Water Saving",
            "is_featured": 0
        },
        {
            "slug": "auto-urinal-flush",
            "name": "Automatic Urinal Flush Valves",
            "category": "Hygiene",
            "subcategory": "Touchless Water Management",
            "tagline": "Smart infrared flushers in concealed and exposed brass configurations",
            "description": "Touchless sensor-driven urinal flushing systems engineered for pristine hygiene in corporate and commercial washrooms. Automatically performs a pre-flush and post-flush, keeping urinals sanitary and odor-free.",
            "features": json.dumps([
                "Dual flushing sequence: hygienic pre-rinse and thorough post-flush",
                "Available in both Concealed (flush wall box) and Exposed installation models",
                "Internal valve as well as External valve options to match plumbing architecture",
                "Battery operated (long-life alkaline) and AC mains electrical power options",
                "24-hour automatic trap freshener cycle if left unused"
            ]),
            "specs": json.dumps({
                "Installation Style": "Concealed Wall Box / Exposed Top Mount",
                "Sensor Technology": "Digital Active Infrared with anti-interference filter",
                "Valve Mechanism": "High reliability latching solenoid valve",
                "Operating Pressure": "0.5 bar to 6.0 bar dynamic water pressure"
            }),
            "applications": json.dumps([
                "Commercial Office Restrooms",
                "Pharma Staff Facilities",
                "Airports & Railway Terminals",
                "Cinemas, Malls & Stadiums"
            ]),
            "badge": "Odor Free",
            "is_featured": 0
        },
        {
            "slug": "auto-soap-dispenser",
            "name": "Automatic Liquid Soap & Sanitizer Dispenser",
            "category": "Hygiene",
            "subcategory": "Washroom Automation",
            "tagline": "Touchless sensor dispensers avoiding wastage with precise dosage",
            "description": "Precision infrared touch-free soap and sanitizer dispensers. Available in battery operated and self-closing electric models in pillar mounted, basin mounted, and wall mounted configurations.",
            "features": json.dumps([
                "Touch-free sensor actuation eliminates contact cross-infection",
                "Heavy-duty solid outer construction for high-traffic environments",
                "Adjustable liquid dosage volume per dispense to minimize soap wastage",
                "Compatible with liquid hand soap, antibacterial gel, and alcohol sanitizer",
                "Clear viewing reservoir window for quick fluid level check"
            ]),
            "specs": json.dumps({
                "Reservoir Capacity": "800 ml to 1200 ml bulk refill tank",
                "Dispense Volume": "0.8 ml to 1.5 ml (Adjustable dosage)",
                "Power Source": "4x AA batteries (up to 30,000 cycles) / DC adapter",
                "Mounting": "Wall Mounted / Countertop Basin Mounted"
            }),
            "applications": json.dumps([
                "Pharma Personnel Entry Airlocks",
                "Corporate Dining & Pantry Rooms",
                "Hospital Intensive Care Scrub Sinks",
                "Public Commercial Restrooms"
            ]),
            "badge": "Touchless",
            "is_featured": 0
        },
        {
            "slug": "auto-tissue-dispenser",
            "name": "Automatic Paper Tissue Dispenser",
            "category": "Hygiene",
            "subcategory": "Washroom Automation",
            "tagline": "Hygienic touch-free paper towel dispensing with lockable key housing",
            "description": "Touchless automatic roll paper towel dispensers manufactured in impact-resistant ABS and premium stainless steel. Delivers pre-measured single sheets upon sensor waving, reducing paper waste dramatically.",
            "features": json.dumps([
                "Touch-free infrared sensor dispenses clean paper on wave",
                "Constructed from high-grade ABS engineering plastic and Stainless Steel",
                "Lockable enclosure with safety key to prevent vandalism and pilferage",
                "Adjustable sheet length setting (20cm / 25cm / 30cm) for cost control",
                "Emergency manual tear bar ensures continuous availability"
            ]),
            "specs": json.dumps({
                "Paper Roll Size": "Up to 200 mm width x 200 mm diameter",
                "Casing Finish": "Impact-resistant ABS White / SS304 Brushed Satin",
                "Power Supply": "4x D-Cell batteries or AC 230V adapter",
                "Security": "Double-tumbler mechanical key lock"
            }),
            "applications": json.dumps([
                "Cleanroom Entry Antechambers",
                "Executive Washrooms",
                "Hospital Scrub Stations",
                "Five-star Hotel Restrooms"
            ]),
            "badge": "Waste Reducing",
            "is_featured": 0
        },
        {
            "slug": "shoe-shine-machine",
            "name": "Automatic Shoe Shine Machine",
            "category": "Hygiene",
            "subcategory": "Corporate Hospitality",
            "tagline": "Two-brush polishing machine with neutral cream canister and auto start/off",
            "description": "Automated electric shoe polishing machine providing rapid, effortless shoe cleaning. Features dual rotating polishing/cleaning brushes and an internal neutral polish dispenser that gives a brilliant shine to any colored leather shoe.",
            "features": json.dumps([
                "Two dedicated brushes: Stiff cleaning brush + Soft wool polishing brush",
                "Internal cream dispenser with neutral wax polish suitable for any leather color",
                "Touchless infrared foot sensor: automatic start on foot insertion, automatic stop",
                "Heavy-duty low-noise motor with rubber matting base for dust collection",
                "Compact, stylish finish ideal for hotel lobbies and executive offices"
            ]),
            "specs": json.dumps({
                "Polish Canister": "200 ml refillable neutral cream canister with roll-on ball",
                "Brush Speed": "1400 RPM silent motor",
                "Operation": "Optical Sensor Auto Start / Auto Stop (15 sec timer)",
                "Housing": "Wood Grain / Stainless Steel / MS Powder Coated"
            }),
            "applications": json.dumps([
                "Corporate Office Reception Areas",
                "Hotel Lobbies & VIP Lounges",
                "Boardrooms & Executive Suites",
                "Clubs & Commercial Towers"
            ]),
            "badge": "Executive Grade",
            "is_featured": 0
        },
        {
            "slug": "pvc-strip-curtain",
            "name": "PVC Strip Curtains (Grade A+)",
            "category": "Hygiene",
            "subcategory": "Thermal & Dust Barriers",
            "tagline": "UV stabilized 3mm Grade A+ transparent curtains with 99.2% clarity",
            "description": "High-clarity flexible PVC strip doors offering high chemical resistance to acids, alkalies, and harsh industrial environments. Prevents thermal leakage, airborne dust, insects, and noise between industrial zones while maintaining 99.2% visual transparency.",
            "features": json.dumps([
                "UV stabilized formulation preventing discoloration, yellowing, or brittleness",
                "High chemical resistance against corrosive acids, alkalies, and alcohols",
                "Superior 99.2% transparency index for complete driver and forklift safety",
                "Standard 3mm thickness Grade A+ with 200 mm individual strip width",
                "Stainless steel suspension hanger track with 50% or 100% overlap"
            ]),
            "specs": json.dumps({
                "Thickness": "3 mm quality Grade A+",
                "Width": "200 mm strip width",
                "Transparency Index": "99.2% optical transmission",
                "Temperature Range": "-15°C to +50°C (Polar freezer grade available to -40°C)"
            }),
            "applications": json.dumps([
                "Pharma Raw Material Warehouses",
                "Cold Storage & Deep Freezers",
                "Manufacturing Loading Docks",
                "Food Processing & Dairy Plants"
            ]),
            "badge": "Grade A+ Quality",
            "is_featured": 0
        },
        {
            "slug": "spot-fume-extractor-industrial-blower",
            "name": "Spot Extractor & Industrial Blowers",
            "category": "Hygiene",
            "subcategory": "Air Quality & Extraction",
            "tagline": "Flexible articulated arms and high-volume industrial air extraction blowers",
            "description": "Engineered spot extractors and industrial ventilation blowers designed to capture hazardous fumes, toxic solvent vapors, and fine dust particulates directly at their source before dispersing across the clean work environment.",
            "features": json.dumps([
                "360° rotating flexible articulated extraction arm with transparent capture hood",
                "Equipped with internal airflow regulation damper for calibrated suction",
                "Heavy-duty industrial centrifugal blower with spark-proof impeller options",
                "Chemical-resistant polypropylene joints and aluminum alloy duct tubes",
                "Ceiling, wall, or bench mounting versatility"
            ]),
            "specs": json.dumps({
                "Arm Reach": "1.5m to 3.0m articulated radius",
                "Airflow Capacity": "250 to 1200 m³/h per extraction point",
                "Blower Motor": "TEFC IP55 motor with flameproof Ex-d option",
                "Hood Material": "Chemical resistant Polypropylene / Polycarbonate"
            }),
            "applications": json.dumps([
                "Pharma QC Testing Labs",
                "Soldering and Electronics Assembly",
                "Chemical Sampling & Dispensing Booths",
                "Welding and Laser Cutting Stations"
            ]),
            "badge": "Clean Air Tech",
            "is_featured": 0
        }
    ]

        for p in products:
            cursor.execute("""
            INSERT INTO products (slug, name, category, subcategory, tagline, description, features, specs, applications, badge, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                p["slug"], p["name"], p["category"], p["subcategory"], p["tagline"],
                p["description"], p["features"], p["specs"], p["applications"],
                p["badge"], p["is_featured"]
            ))

    # Technology Partners from Page 4 of PDF
    cursor.execute("SELECT COUNT(*) as count FROM partners")
    if cursor.fetchone()["count"] == 0:
        partners = [
            ("Honeywell", "Fire & Automation", "Global leader in building controls and fire systems"),
            ("Bosch", "Security & Surveillance", "German precision CCTV, PA and access solutions"),
            ("Metaflex", "Doors & Cleanrooms", "Specialized airtight and medical door systems"),
            ("Cisco", "Networking & IP telephony", "Industry benchmark enterprise telecommunications"),
            ("Eaton", "Power & Safety", "Mission-critical electrical and safety management"),
            ("Hikvision", "CCTV & Video Analytics", "World leading smart video surveillance equipment"),
            ("L&T", "Electrical & Automation", "Trusted Indian engineering and switchgear giant"),
            ("FAAC", "Gate & Barrier Automation", "Italian high-speed hydraulic gate automation"),
            ("Ravel", "Fire Detection Systems", "Reliable micro-processed fire alarm control panels"),
            ("Dorma", "Door Hardware & Access", "Premium architectural door closers and operators"),
            ("Nice", "Gate Automation", "Italian smart home and gate automation technology"),
            ("Avtech", "Environment Monitoring", "Server room Room Alert environmental monitoring"),
            ("Johnson Controls", "HVAC & Building Security", "Enterprise building automation controls"),
            ("Siemens", "Industrial Automation & Fire", "German engineering excellence in safety & automation"),
            ("Zoloto Valves", "Fire Hydrant & Piping", "Standard certified brass & cast steel fire valves")
        ]
        for name, cat, tagline in partners:
            cursor.execute("INSERT INTO partners (name, category, tagline) VALUES (?, ?, ?)", (name, cat, tagline))

    # Prestigious Clients from Page 5 of PDF
    cursor.execute("SELECT COUNT(*) as count FROM clients")
    if cursor.fetchone()["count"] == 0:
        clients = [
            ("Glenmark", "Pharmaceuticals"),
            ("Indoco Remedies", "Pharmaceuticals"),
            ("Venus Remedies", "Pharmaceuticals"),
            ("Cadila Pharmaceuticals", "Pharmaceuticals"),
            ("Shreya Life Sciences", "Pharmaceuticals"),
            ("Pidilite", "Chemicals & Adhesives"),
            ("P&G", "Consumer Goods (FMCG)"),
            ("Alkem", "Pharmaceuticals"),
            ("FSC", "Supply Chain & Logistics"),
            ("IIT Bombay", "Premier Educational & Research Institution"),
            ("Alembic", "Pharmaceuticals (Touching Lives Over 100 Years)"),
            ("Ferrero", "Global Food & Confectionery")
        ]
        for name, sector in clients:
            cursor.execute("INSERT INTO clients (name, sector) VALUES (?, ?)", (name, sector))

    # Add initial sample inquiry
    cursor.execute("SELECT COUNT(*) as count FROM inquiries")
    if cursor.fetchone()["count"] == 0:
        cursor.execute("""
        INSERT INTO inquiries (full_name, email, phone, company, category, product_name, message, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "Rajesh Sharma", "rajesh.s@glenmarkpharma.example.com", "+91 98201 12345",
            "Glenmark Pharmaceuticals", "Automation", "Door Interlock System",
            "Looking for 8-door flameproof clean room interlocking system with pressure monitoring for our new formulation facility in Navi Mumbai.",
            "In Review"
        ))

    # Seed canonical technical articles if missing
    blogs = [
        (
            "optimizing-cleanroom-differential-pressure",
            "Optimizing Cleanroom Differential Pressure with Multi-Door Interlock Systems",
            "Cleanroom Engineering",
            "Er. H. Mishra, Lead Systems Engineer",
            "6 min read",
            "Understanding the role of 2-to-12 door electrical interlocking, air cascade pressure balancing, and programmable delay timers in maintaining air classification under USFDA and ISO 14644-1 guidelines.",
            "In sterile pharmaceutical manufacturing, preventing cross-contamination between adjacent processing blocks is the primary objective of facility engineering. When personnel move between grey areas and Grade A/B cleanrooms, opening a door creates an instantaneous pressure drop. Without an automated interlock controller, simultaneous opening of adjoining airlock doors causes turbulent particulate ingress.\n\nHTI's multi-door interlocking architecture incorporates programmable delays between door activations. This engineered pause gives the HVAC air handling unit (AHU) the requisite 3 to 5 seconds to re-establish the critical differential pressure barrier (+15 to +30 Pascals) before allowing the secondary door strike to release.\n\nFurthermore, for hazardous solvent storage areas, intrinsically safe and flameproof (Ex-d) door stations provide explosion protection while maintaining full integration with emergency evacuation override switches. In the event of a fire alarm trigger, all locks release immediately to enable unhindered egress.\n\nKey Engineering Formula:\n• ΔP = (Q / (Cd × A))² × (ρ / 2)\nWhere Q is air leakage rate through door gaps, Cd is discharge coefficient, A is crack perimeter area, and ρ is air density. Calibrated door perimeter silicone seals combined with HTI interlock synchronization reduce unintentional air loss by over 74%.",
            "/case-studies/case-cleanroom.jpg",
            1,
            "USFDA Compliance, ISO 14644-1, Differential Pressure, Flameproof Ex-d"
        ),
        (
            "turnkey-fire-hydrant-nbc-compliance",
            "Turnkey Fire Hydrant & FAS Compliance under National Building Code (NBC 2016)",
            "Fire & Life Safety",
            "HTI Technical Projects Directorate",
            "5 min read",
            "Key technical considerations for designing, installing, and commissioning high-pressure fire hydrant piping networks and addressable fire panels for industrial plants.",
            "A robust fire protection infrastructure is non-negotiable for industrial warehouses, corporate campuses, and pharmaceutical API synthesis blocks. Under Part 4 of NBC 2016, industrial occupancies require a dedicated fire water storage capacity coupled with electric main, diesel standby, and pressure-sustaining jockey pumps capable of delivering 7 to 14 kg/cm² pressure.\n\nHTI provides turnkey execution—from hydraulic pipe sizing calculations, installation of ISI-certified landing valves and canvas hose reels, to linking addressable fire alarm control panels (FACP) with automatic AHU trip dampers and emergency door releases.\n\nIntegrating the fire alarm system directly with door interlocks ensures that upon a validated smoke or heat detector trip, all electromagnetic access locks immediately drop power to enable unhindered personnel evacuation without relying on manual keys.\n\nPump Room Sizing Guidelines:\n• Main Electric Pump: 2850 LPM capacity @ 7.0 kg/cm² head (IS 1520 compliance)\n• Diesel Standby Engine: Direct mechanical drive with automatic 12V cranking sequence upon electric power phase failure.\n• Jockey Pump: 180 LPM @ 7.5 kg/cm² to maintain static line pressurization without running heavy main engines for trivial micro-leaks.",
            "/case-studies/case-fire-hydrant.jpg",
            1,
            "NBC 2016, Fire Hydrant, Addressable Fire Alarm, Industrial Safety"
        ),
        (
            "thermo-zone-air-curtains-energy-savings",
            "Thermo-Zone Air Curtains: Slashing HVAC Energy Losses in Pharmaceutical Facilities",
            "Hygiene & Energy Efficiency",
            "HTI Clean Environment Division",
            "4 min read",
            "How calibrated laminar air curtains prevent cold air escape, block flying insect ingress, and reduce corporate energy expenditures by up to 35%.",
            "Loading bays, staff entrances, and packaging corridors experience hundreds of door cycles daily. In air-conditioned and humidity-regulated spaces, each door opening allows chilled air to cascade out while humid, dusty outside air rushes in.\n\nHTI's industrial air curtains utilize precision Thermo-Zone aerodynamic nozzles with balanced centrifugal blowers generating an air velocity of 18 to 24 m/sec. This creates an invisible, impermeable pressure curtain that stops flying insects, outdoor particulate matter, and ambient summer heat from entering.\n\nAvailable in flameproof configurations for chemical atmospheres and whisper-quiet designs for corporate lobbies, air curtains typically pay for themselves within 8 to 14 months through HVAC electricity reduction alone.\n\nAerodynamic Discharge Geometry:\nThe air jet angle is calibrated at 15° outward tilt relative to the door opening plane. This angled jet deflects external headwind pressure vectors (up to 12 km/h ambient gusts) without entraining airborne floor dust into clean production rooms.",
            "/case-studies/case-air-curtain.jpg",
            1,
            "Energy Efficiency, HVAC Optimization, Cleanroom Hygiene, Insect Barrier"
        ),
        (
            "ai-video-analytics-boom-barriers-logistics",
            "AI Video Analytics & Dual-Loop Boom Barriers: Securing Industrial Gate Corridors",
            "Entrance Automation",
            "HTI Automation Engineering Team",
            "5 min read",
            "Integration of automatic number plate recognition (ANPR), radar anti-tailgating sensors, and brushless DC boom barriers for high-security industrial gate corridors.",
            "Modern multi-acre logistics hubs and manufacturing plants process upwards of 2,000 heavy commercial vehicles per shift. Manual guard inspection at entry gates creates vehicle queuing backlogs extending onto public highways.\n\nHTI deploys high-speed BLDC boom barrier systems paired with AI ANPR cameras capable of reading Indian state HSRP number plates at 98.4% accuracy even under torrential rain or headlight glare.\n\nSafety is paramount: HTI utilizes dual inductive loops embedded in concrete paired with a 24 GHz microwave radar sensor. Even if a vehicle stops directly under the descending boom arm, the anti-smash algorithm halts descent and auto-reverses the boom within 12 milliseconds, eliminating vehicle damage liability.",
            "/case-studies/case-boom-barrier.jpg",
            1,
            "ANPR Cameras, BLDC Motors, Anti-Tailgating, Logistics Automation"
        ),
        (
            "ss304-shoe-polishers-mist-air-showers",
            "Static Dissipative SS304 Shoe Polishers & Mist Air Showers in Sterile Pharma Production",
            "Hygiene & Energy Efficiency",
            "HTI Cleanroom Solutions Directorate",
            "4 min read",
            "Zero-particulate transfer in personnel change rooms (PCR) using electro-polished SS304 motorized shoe polishers and HEPA mist air shower tunnels.",
            "Over 80% of foreign contaminants in cleanrooms enter via the soles of personnel footwear. Traditional sticky mats quickly saturate after 10 to 15 footprints, losing adhesive capture efficacy and generating recurring consumable waste.\n\nHTI's SS304 Heavy-Duty Motorized Shoe Polishers utilize dual infrared optical sensors that trigger automatically when a cleanroom operative places their boot in the chamber. Counter-rotating antistatic nylon brushes scrub both sides and soles simultaneously, while an integrated vacuum extraction drawer traps debris inside a sealed HEPA chamber.\n\nConstructed without exposed screws or crevices, our hygiene units satisfy both USFDA cGMP and EU-GMP Annex 1 hygiene sanitation criteria.",
            "/case-studies/case-ss304-mist.jpg",
            1,
            "cGMP Annex 1, SS304 Hygiene, Shoe Polishers, Zero-Particulate"
        ),
        (
            "air-shower-pass-box-contamination-control",
            "Air Shower & Pass Box Integration for Contamination Control",
            "Cleanroom Engineering",
            "HTI Cleanroom Validation Cell",
            "6 min read",
            "Design and operational best practices for air showers, pass boxes, and personnel material flow in Grade B/C/D cleanrooms to minimize particulate transfer.",
            "In pharmaceutical manufacturing, semiconductor fabrication, and biotechnology laboratories, personnel and materials entering critical areas represent the largest source of particulate contamination. Air showers and pass boxes serve as essential engineering controls at the boundary between different cleanliness classifications.\n\nHTI air showers utilize adjustable stainless steel nozzles delivering HEPA-filtered air at velocities exceeding 25 m/s. This scrub action dislodges surface particulates from cleanroom garments, which are then captured by pre-filters and high-efficiency HEPA H14 filters recirculated through negative-pressure plenums.\n\nDynamic pass boxes equipped with HEPA filtration, magnehelic differential pressure gauges, and electronic door interlocking ensure that cleanroom grade classifications remain undisturbed during raw material and sampling transfer. Integrated UV-C germicidal lamps automatically cycle between door access events to maintain sterile contact surfaces.",
            "/hero-cleanroom-interlock-chamber.jpg",
            1,
            "Cleanroom Airlocks, Pass Box Systems, HEPA Filtration, ISO 14644-1"
        )
    ]
    for b in blogs:
        cursor.execute("SELECT id, image_url, tags FROM blogs WHERE slug = ?", (b[0],))
        existing = cursor.fetchone()
        if not existing:
            cursor.execute("""
            INSERT INTO blogs (slug, title, category, author, read_time, excerpt, content, image_url, is_published, tags)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, b)
        else:
            # Sync local image and tags if empty or using external unsplash fallback
            curr_img = existing["image_url"] or ""
            curr_tags = existing["tags"] or ""
            if not curr_img or "unsplash.com" in curr_img:
                cursor.execute("UPDATE blogs SET image_url = ? WHERE id = ?", (b[7], existing["id"]))
            if not curr_tags and b[9]:
                cursor.execute("UPDATE blogs SET tags = ? WHERE id = ?", (b[9], existing["id"]))

    # Admin Users (Module 8: Admin Users & Roles)
    cursor.execute("SELECT COUNT(*) as count FROM admin_users")
    if cursor.fetchone()["count"] == 0:
        initial_password = os.getenv("HTI_ADMIN_INITIAL_PASSWORD")
        if not initial_password:
            raise RuntimeError(
                "HTI_ADMIN_INITIAL_PASSWORD must be set before initializing administrator accounts"
            )
        users = [
            ("admin", hash_password(initial_password), "Chief Administrator", "admin@htisystems.in", "Administrator", 1)
        ]
        for u in users:
            cursor.execute("""
            INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
            VALUES (?, ?, ?, ?, ?, ?)
            """, u)
    else:
        # Convert legacy plaintext records once while preserving existing passwords.
        cursor.execute(
            "SELECT id, password_hash FROM admin_users WHERE password_hash NOT LIKE 'pbkdf2_sha256$%'"
        )
        for legacy_user in cursor.fetchall():
            cursor.execute(
                "UPDATE admin_users SET password_hash = ? WHERE id = ?",
                (hash_password(legacy_user["password_hash"]), legacy_user["id"]),
            )
        # Keep the administrator table aligned with the single-role model.
        cursor.execute(
            "DELETE FROM admin_users WHERE username IN ('editor', 'sales') OR role != 'Administrator'"
        )

    # Initial Audit Log entry
    cursor.execute("SELECT COUNT(*) as count FROM audit_logs")
    if cursor.fetchone()["count"] == 0:
        cursor.execute("""
        INSERT INTO audit_logs (username, action, module, details)
        VALUES ('system', 'SYSTEM_INITIALIZE', 'Core', 'HTI enterprise database schema initialized and operational.')
        """)

    # Projects / Case Studies (Module 6: Projects & Installations)
    cursor.execute("SELECT COUNT(*) as count FROM projects")
    if cursor.fetchone()["count"] == 0:
        projects = [
            (
                "glenmark-formulation-cleanroom-interlocks",
                "Turnkey 12-Door Cleanroom Interlocking Network",
                "Glenmark Pharmaceuticals",
                1,
                "Pharmaceutical Cleanroom",
                "Navi Mumbai, Maharashtra",
                "2025",
                "Engineered and commissioned an integrated 12-door optical-sensor interlock system with programmable pressure delays, magnetic locks, and emergency fire evacuation overrides for OSD formulation blocks.",
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
                json.dumps(["Door Interlock System", "Air Shower Automation", "Electromagnetic Locks"]),
                1,
                1
            ),
            (
                "sun-pharma-rnd-access-and-surveillance",
                "High-Security Access Control & Perimeter Surveillance",
                "Sun Pharmaceutical Industries",
                1,
                "Life Sciences & R&D",
                "Vadodara, Gujarat",
                "2024",
                "Complete installation of biometric multi-door controllers, optical turnstiles, and 4K IP surveillance cameras guarding specialized chemical synthesis and cold-storage holding rooms.",
                "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
                json.dumps(["IP Surveillance & CCTV", "Access Control Systems", "Biometric Attendance"]),
                1,
                2
            ),
            (
                "pidilite-flameproof-air-curtains",
                "Heavy Industrial Flameproof Air Curtain Barriers",
                "Pidilite Industries",
                1,
                "Chemical & Adhesive Manufacturing",
                "Vapi, Gujarat",
                "2024",
                "Supplied and installed certified explosion-proof (Ex-d) industrial air curtains across raw material transfer bays, preventing thermal energy loss and hazardous particulate contamination.",
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                json.dumps(["Industrial Air Curtains", "Flameproof Controllers", "PVC Strip Curtains"]),
                1,
                3
            ),
            (
                "iit-bombay-nanotech-cleanroom-automation",
                "Nanofabrication Facility Airlock Environmental Control",
                "IIT Bombay (Centre for Nano Science)",
                1,
                "Academic & Advanced Research",
                "Powai, Mumbai",
                "2023",
                "Designed customized interlocking logic with differential pressure integration and cleanroom status indicators meeting Class 100 / ISO 5 standards.",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
                json.dumps(["Door Interlock System", "Environmental Sensors", "Room Alert Monitor"]),
                1,
                4
            )
        ]
        for p in projects:
            cursor.execute("""
            INSERT INTO projects (slug, title, client_name, client_approved, industry, location, completion_year, description, image_url, related_products, is_published, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, p)

    # Website Content Management (Module 7: Website Content Management)
    cursor.execute("SELECT COUNT(*) as count FROM website_content")
    if cursor.fetchone()["count"] == 0:
        default_content = {
            "homepage_hero": json.dumps({
                "badge": "ISO 9001:2015 & CE Certified Cleanroom & Security Systems",
                "title": "Intelligent Cleanroom Automation, Fire Safety & Security Systems",
                "subtitle": "From multi-door cleanroom interlocks and touchless hygiene automation to turnkey fire hydrant networks and addressable alarms. Trusted by top pharmaceutical manufacturers, chemical plants, and institutions across India since 2014.",
                "cta_primary_text": "Explore Product Catalog",
                "cta_primary_link": "/#catalog",
                "cta_secondary_text": "Request Engineering Quote",
                "cta_secondary_link": "/#quote",
                "stat_installations": "450+",
                "stat_satisfaction": "99.8%",
                "stat_years": "12+"
            }),
            "company_profile": json.dumps({
                "headline": "Engineering Precision & Industrial Reliability",
                "description": "Headquartered in Mumbai, HTI Automation & Security Systems Pvt. Ltd. is an established engineering manufacturer and turnkey solutions provider. We specialize in contamination-control cleanroom interlocks, industrial flameproof air barriers, automatic hygiene systems, and enterprise security networks.",
                "years_in_business": 12,
                "cleanrooms_secured": 850,
                "corporate_clients": 120,
                "certifications": "ISO 9001:2015, CE Certified, Flameproof Ex-d Compliant"
            }),
            "contact_details": json.dumps({
                "company_name": "HTI Automation & Security Systems Pvt. Ltd.",
                "primary_phone": "+91 9892756077",
                "secondary_phone": "+91 9594917010",
                "sales_email": "sales@htisystems.in",
                "support_email": "hti@htisystems.in",
                "address_line": "Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC",
                "city": "Turbhe, Navi Mumbai",
                "state": "Maharashtra",
                "pincode": "400703",
                "country": "India",
                "working_hours": "Monday - Saturday: 9:00 AM - 6:30 PM"
            }),
            "testimonials": json.dumps([
                {
                    "quote": "HTI delivered our 12-door cleanroom interlocking system on an aggressive schedule. The programmable pressure delays and flameproof controllers passed our USFDA audit without a single observation.",
                    "author": "Vice President - Engineering",
                    "company": "Leading Pharmaceutical Multinational",
                    "location": "Navi Mumbai",
                    "rating": 5
                },
                {
                    "quote": "The industrial air curtains and high-speed PVC curtains drastically cut thermal losses across our packaging docks. Outstanding craftsmanship and reliable engineering support.",
                    "author": "Plant Operations Head",
                    "company": "Chemical Manufacturing Plant",
                    "location": "Gujarat",
                    "rating": 5
                },
                {
                    "quote": "We have partnered with HTI for our campus fire hydrant networks, addressable panels, and access turnstiles. Real expertise with zero downtime.",
                    "author": "Chief Facilities Director",
                    "company": "Premier Educational Institution",
                    "location": "Mumbai",
                    "rating": 5
                }
            ])
        }
        for key, val in default_content.items():
            cursor.execute("""
            INSERT INTO website_content (section_key, data_json)
            VALUES (?, ?)
            """, (key, val))

    # System Settings (Module 9: Settings & System Health)
    cursor.execute("SELECT COUNT(*) as count FROM system_settings")
    if cursor.fetchone()["count"] == 0:
        default_settings = [
            ("site_title", "HTI Automation & Security Systems Pvt. Ltd."),
            ("meta_description", "Manufacturer & Turnkey Integrator of Door Interlock Systems, Industrial Air Curtains, Washroom Automation, and Fire Protection Systems in Mumbai, India."),
            ("meta_keywords", "door interlock system, cleanroom interlocking, air curtain mumbai, automatic sensor taps, fire hydrant turnkey, pharmaceutical cleanroom automation"),
            ("notification_email", "sales@htisystems.in, director@htisystems.in"),
            ("last_backup_time", "2026-10-17 13:53:00"),
            ("last_backup_file", "hti_website_git_bundle_20261017.bundle"),
            ("backup_status", "Success - Verified Complete")
        ]
        for k, v in default_settings:
            cursor.execute("""
            INSERT INTO system_settings (key, value)
            VALUES (?, ?)
            """, (k, v))

    conn.commit()
    conn.close()


def migrate_columns_for_unified_tables(cursor):
    tables = {
        "career_applications": [
            ("resume_filename", "TEXT DEFAULT ''"),
            ("resume_url", "TEXT DEFAULT ''"),
            ("cover_letter", "TEXT DEFAULT ''"),
            ("step_saved", "INTEGER DEFAULT 3"),
            ("status", "TEXT DEFAULT 'New'"),
            ("notes", "TEXT DEFAULT ''"),
            ("current_location", "TEXT DEFAULT ''"),
            ("job_id", "INTEGER"),
            ("created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
        ],
        "job_postings": [
            ("additional_requirements", "TEXT DEFAULT ''"),
            ("created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
        ],
        "user_enquiries": [
            ("message", "TEXT DEFAULT ''"),
            ("notes", "TEXT DEFAULT ''"),
            ("created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
        ],
    }
    for table, columns in tables.items():
        cursor.execute(f"PRAGMA table_info({table})")
        existing = {row[1] for row in cursor.fetchall()}
        for name, definition in columns:
            if name not in existing:
                cursor.execute(f"ALTER TABLE {table} ADD COLUMN {name} {definition}")


def migrate_legacy_testimonials(conn):
    """Copy legacy JSON testimonials into the normalized reviews table once."""
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) AS count FROM customer_reviews")
    if cursor.fetchone()["count"]:
        return
    cursor.execute("SELECT data_json FROM website_content WHERE section_key = 'testimonials'")
    row = cursor.fetchone()
    if not row:
        return
    try:
        testimonials = json.loads(row["data_json"])
    except (TypeError, json.JSONDecodeError):
        return
    if not isinstance(testimonials, list):
        return
    for item in testimonials:
        status = item.get("status")
        if status not in {"Pending", "Approved", "Rejected"}:
            status = "Approved" if item.get("is_published", True) is not False else "Rejected"
        cursor.execute("""
            INSERT INTO customer_reviews
            (customer_name, company, location, email, rating, review_text,
             client_id, client_name, status, is_published, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), CURRENT_TIMESTAMP)
        """, (
            item.get("author") or item.get("customer_name") or "Verified Client",
            item.get("company", ""),
            item.get("location", ""),
            item.get("email", ""),
            max(1, min(5, int(item.get("rating", 5) or 5))),
            item.get("quote") or item.get("review_text") or "",
            str(item.get("client_id", "")),
            item.get("client_name", ""),
            status,
            1 if status == "Approved" else 0,
            item.get("date"),
        ))


def _row_dict(row):
    return dict(row) if row else None


def init_careers_db():
    init_db()
    return {"database": "sqlite", "status": "connected"}


def get_careers_db_status():
    return {"database": "sqlite", "status": "connected"}


def insert_career_application(data):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO career_applications
        (full_name, email, phone, position, experience, notice_period,
         resume_filename, resume_url, cover_letter, step_saved, status, notes,
         current_location, job_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("full_name", ""), data.get("email", ""), data.get("phone", ""),
        data.get("position", ""), data.get("experience", ""),
        data.get("notice_period", ""), data.get("resume_filename", ""),
        data.get("resume_url", ""), data.get("cover_letter", ""),
        data.get("step_saved", 3), data.get("status", "New"),
        data.get("notes", ""), data.get("current_location", ""),
        data.get("job_id"),
    ))
    row_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM career_applications WHERE id = ?", (row_id,))
    row = _row_dict(cursor.fetchone())
    conn.close()
    return {"data": row, "engine": "sqlite"}


def fetch_career_applications(status_filter=None, search=None, position=None):
    conn = get_connection()
    query = "SELECT * FROM career_applications WHERE 1=1"
    params = []
    if status_filter and status_filter.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status_filter)
    if position and position.lower() != "all":
        query += " AND position = ?"
        params.append(position)
    if search and search.strip():
        pattern = f"%{search.strip()}%"
        query += " AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR position LIKE ?)"
        params.extend([pattern] * 4)
    query += " ORDER BY id DESC"
    rows = [_row_dict(row) for row in conn.execute(query, params).fetchall()]
    conn.close()
    return {"items": rows, "engine": "sqlite"}


def update_application_status(app_id, new_status):
    return _update_by_id("career_applications", app_id, "status", new_status)


def update_application_notes(app_id, notes):
    return _update_by_id("career_applications", app_id, "notes", notes)


def delete_career_application(app_id):
    return _delete_by_id("career_applications", app_id)


def init_user_enquiries_db():
    init_db()
    return {"database": "sqlite", "status": "connected"}


def get_user_enquiries_db_status():
    return {"database": "sqlite", "status": "connected"}


def insert_user_enquiry(data):
    message = data.get("message") or data.get("project_details") or ""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO user_enquiries
        (full_name, company, email, phone, area_of_interest, project_details, message, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("full_name") or data.get("fullName") or "",
        data.get("company") or "Not Specified", data.get("email") or "",
        data.get("phone") or "",
        data.get("area_of_interest") or data.get("category") or "General Enquiry",
        message, message, data.get("status", "New"), data.get("notes", ""),
    ))
    row_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM user_enquiries WHERE id = ?", (row_id,))
    row = _row_dict(cursor.fetchone())
    conn.close()
    return {"data": row, "engine": "sqlite"}


def fetch_user_enquiries(status_filter=None, search=None, area_of_interest=None):
    conn = get_connection()
    query = "SELECT * FROM user_enquiries WHERE 1=1"
    params = []
    if status_filter and status_filter.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status_filter)
    if area_of_interest and area_of_interest.lower() != "all":
        query += " AND area_of_interest = ?"
        params.append(area_of_interest)
    if search and search.strip():
        pattern = f"%{search.strip()}%"
        query += """ AND (full_name LIKE ? OR company LIKE ? OR email LIKE ?
                         OR phone LIKE ? OR area_of_interest LIKE ?
                         OR project_details LIKE ? OR message LIKE ?)"""
        params.extend([pattern] * 7)
    query += " ORDER BY id DESC"
    rows = [_row_dict(row) for row in conn.execute(query, params).fetchall()]
    conn.close()
    return {"items": rows, "engine": "sqlite"}


def update_user_enquiry_status(enquiry_id, new_status):
    return _update_by_id("user_enquiries", enquiry_id, "status", new_status)


def update_user_enquiry_notes(enquiry_id, notes):
    return _update_by_id("user_enquiries", enquiry_id, "notes", notes)


def delete_user_enquiry(enquiry_id):
    return _delete_by_id("user_enquiries", enquiry_id)


def init_job_postings_db():
    init_db()
    return {"database": "sqlite", "status": "connected"}


def insert_job_posting(data):
    fields = (
        "title", "department", "job_category", "employment_type", "location",
        "openings", "experience", "salary_range", "skills", "description",
        "responsibilities", "qualifications", "additional_requirements",
        "deadline", "status",
    )
    values = [data.get(field, "") for field in fields]
    values[5] = int(values[5] or 1)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        f"INSERT INTO job_postings ({', '.join(fields)}) VALUES ({', '.join('?' for _ in fields)})",
        values,
    )
    row_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM job_postings WHERE id = ?", (row_id,))
    row = _row_dict(cursor.fetchone())
    conn.close()
    return {"data": row, "engine": "sqlite"}


def fetch_job_postings(include_drafts=False, status_filter=None, department=None, search=None):
    conn = get_connection()
    query = """SELECT j.*, (SELECT COUNT(*) FROM career_applications ca
              WHERE ca.position = j.title) AS applications_count
              FROM job_postings j WHERE 1=1"""
    params = []
    if not include_drafts and not status_filter:
        query += " AND j.status = 'Published' AND (j.deadline IS NULL OR j.deadline = '' OR j.deadline >= date('now'))"
    elif status_filter and status_filter.lower() != "all":
        query += " AND LOWER(j.status) = LOWER(?)"
        params.append(status_filter)
    if department and department.lower() != "all":
        query += " AND LOWER(j.department) = LOWER(?)"
        params.append(department)
    if search and search.strip():
        pattern = f"%{search.strip()}%"
        query += " AND (j.title LIKE ? OR j.department LIKE ? OR j.skills LIKE ? OR j.location LIKE ?)"
        params.extend([pattern] * 4)
    query += " ORDER BY j.id DESC"
    rows = [_row_dict(row) for row in conn.execute(query, params).fetchall()]
    conn.close()
    return {"items": rows, "engine": "sqlite"}


def fetch_job_posting_by_id(job_id):
    conn = get_connection()
    row = conn.execute("""SELECT j.*, (SELECT COUNT(*) FROM career_applications ca
                         WHERE ca.position = j.title) AS applications_count
                         FROM job_postings j WHERE j.id = ?""", (job_id,)).fetchone()
    conn.close()
    return _row_dict(row)


def update_job_posting(job_id, data):
    fields = (
        "title", "department", "job_category", "employment_type", "location",
        "openings", "experience", "salary_range", "skills", "description",
        "responsibilities", "qualifications", "additional_requirements",
        "deadline", "status",
    )
    values = [data.get(field, "") for field in fields]
    values[5] = int(values[5] or 1)
    conn = get_connection()
    conn.execute(
        f"UPDATE job_postings SET {', '.join(f'{field} = ?' for field in fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        values + [job_id],
    )
    conn.commit()
    row = conn.execute("SELECT * FROM job_postings WHERE id = ?", (job_id,)).fetchone()
    conn.close()
    return _row_dict(row)


def update_job_posting_status(job_id, new_status):
    return _update_by_id("job_postings", job_id, "status", new_status)


def delete_job_posting(job_id):
    return _delete_by_id("job_postings", job_id)


def _update_by_id(table, row_id, column, value):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(f"UPDATE {table} SET {column} = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", (value, row_id))
    changed = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return changed


def _delete_by_id(table, row_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM {table} WHERE id = ?", (row_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted


def format_review_row(row):
    item = _row_dict(row)
    if not item:
        return {}
    item["author"] = item["customer_name"]
    item["quote"] = item["review_text"]
    item["is_published"] = bool(item["is_published"])
    item["date"] = item["created_at"]
    return item


def insert_customer_review(data):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO customer_reviews
        (customer_name, company, location, email, rating, review_text,
         client_id, client_name, status, is_published)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 0)
    """, (
        data.get("author", "").strip(), data.get("company", "").strip(),
        data.get("location", "").strip(), data.get("email", "").strip().lower(),
        int(data.get("rating", 5)), data.get("quote", "").strip(),
        data.get("client_id", ""), data.get("client_name", ""),
    ))
    row_id = cursor.lastrowid
    conn.commit()
    row = conn.execute("SELECT * FROM customer_reviews WHERE id = ?", (row_id,)).fetchone()
    conn.close()
    return format_review_row(row)


def get_approved_reviews():
    conn = get_connection()
    rows = [format_review_row(row) for row in conn.execute(
        "SELECT * FROM customer_reviews WHERE status = 'Approved' ORDER BY created_at DESC, id DESC"
    ).fetchall()]
    conn.close()
    return rows


def get_all_reviews():
    conn = get_connection()
    rows = [format_review_row(row) for row in conn.execute(
        "SELECT * FROM customer_reviews ORDER BY created_at DESC, id DESC"
    ).fetchall()]
    conn.close()
    return rows


def update_review_status(review_id, new_status):
    if new_status not in {"Pending", "Approved", "Rejected"}:
        return False
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE customer_reviews
        SET status = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """, (new_status, 1 if new_status == "Approved" else 0, review_id))
    changed = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return changed

if __name__ == "__main__":
    init_db()
    seed_db()
    print("Database initialized and seeded successfully!")
