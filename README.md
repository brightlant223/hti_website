# HTI Automation & Security Systems Pvt. Ltd. — Official Web Portal

> **Industrial Automation • Life-Safety Security • Cleanroom Hygiene Solutions**  
> Serving India's corporate, pharmaceutical, and manufacturing sectors since **2014**.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB.svg)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%203-003B57.svg)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 🏢 About the Company

**HTI Automation & Security Systems Pvt. Ltd.** is an engineering enterprise headquartered in Mumbai, India. We deliver high-reliability turnkey automation, perimeter security, life-safety fire protection, and pharmaceutical-grade hygiene infrastructure.

* **Corporate & Registered Office**: Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703, India
* **Direct Contact**: +91 9892756077 / +91 9594917010
* **Inquiries**: hti@htisystems.in | sales@htisystems.in
* **Website**: [www.htisystems.in](https://www.htisystems.in)

---

## 🚀 Key Features

### 1. Three Core Solution Segments
* **Automation**: Automatic Sliding & Swing Doors, Motorized Cantilever & Telescopic Gates, PVC Rapid Roll-Up Doors, Sectional Overhead Doors, Fire Rated Shutters, Boom Barriers, Hydraulic Dock Levellers, Flap Barriers, Turnstiles, Tyre Killers, and Long-Range RFID Readers.
* **Security & Life-Safety**: Cleanroom Door Interlock & Pass Box Systems (Flameproof Ex-d & Safe), Biometric Access Control & Time Attendance, CCTV Surveillance (4K IP, PTZ, Intrusion, Intrinsically Safe), Addressable & Conventional Fire Alarm Systems, Turnkey Fire Hydrant Systems, Gas Detection Systems, GPS Synchronized Master-Slave Digital Clocks, IP-PBX Telephony, and Server Room Monitoring (Room Alert).
* **Hygiene Solutions**: High-Speed Dual Blower Hand Dryers (T.O.P. Motor Protection), Industrial Air Curtains (Thermo-Zone Technology), Solid-Cast Brass Touchless Sensor Taps, Concealed & Exposed Automatic Urinal Flush Valves, Auto Soap Dispensers, Auto Tissue Dispensers, Dual-Brush Automatic Shoe Shine Machines, and UV Stabilized 3mm Grade A+ Transparent PVC Strip Curtains.

### 2. Interactive Cleanroom Door Interlock Simulator
* Directly demonstrates the real-world cleanroom airlock logic from the corporate presentation:
  * **2-to-12 door electrical interlocking**: Opening Door A automatically secures Door B.
  * **Programmable delay timer**: Maintains differential air pressure (+30 Pa) before allowing subsequent door actuation.
  * **Emergency Key Override**: Instantly releases all magnetic locks for safe evacuation during fire alarm triggers.
  * **Hardware event audit log**: Displays live controller status transitions.

### 3. Authorized Integration Partners & Enterprise Clients
* **Technology Partners**: Honeywell, Bosch, Metaflex Door, Cisco, Eaton, Hikvision, L&T, FAAC, Ravel, Dorma, Nice, Avtech, Johnson Controls, Siemens, and Zoloto Valves.
* **Client Portfolio**: Glenmark, Indoco Remedies, Venus Remedies, Cadila Pharmaceuticals, Shreya Life Sciences, Pidilite, P&G, Alkem Laboratories, FSC Logistics, IIT Bombay, Alembic Pharmaceuticals, Ferrero, and more.

### 4. Full-Stack Quote & Inquiry Management (SQLite)
* Customers can submit technical requirements and quote inquiries directly via the web portal.
* Inquiries are validated with Pydantic and persisted in `backend/hti.db`.
* Built-in **Inquiry Portal / Admin Drawer** allows management to view logged inquiries, filter by status (`New`, `In Review`, `Contacted`, `Resolved`), update status in real time, or delete resolved entries.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18+ (Vite) | High-performance SPA with modern component architecture |
| **Styling** | Vanilla CSS Design System | Sleek dark industrial theme, glassmorphism, responsive grid |
| **Icons** | Lucide React | Clean, scalable vector engineering iconography |
| **Backend** | Python 3.11 + FastAPI | High-speed asynchronous REST API with Swagger documentation |
| **Database** | SQLite 3 (`backend/hti.db`) | Lightweight, zero-config relational database |
| **Validation** | Pydantic v2 | Type-safe request and response validation |

---

## 📂 Project Architecture

```
hti_website/
├── backend/
│   ├── main.py              # FastAPI application & REST endpoints
│   ├── database.py          # SQLite schema, tables & seed data (30+ products)
│   ├── requirements.txt     # Python backend dependencies
│   └── hti.db               # SQLite database file
├── frontend/
│   ├── index.html           # HTML5 entry with Plus Jakarta Sans & Outfit fonts
│   ├── vite.config.js       # Vite configuration with /api backend proxy
│   ├── package.json         # Node dependencies & build scripts
│   └── src/
│       ├── App.jsx          # Root application component & state orchestrator
│       ├── App.css          # Core design system & component styles
│       ├── index.css        # Global CSS variables, reset & typography
│       ├── main.jsx         # React DOM entry
│       └── components/
│           ├── Navbar.jsx               # Header with contact bar & quick links
│           ├── Hero.jsx                 # Impact hero banner & live facility status
│           ├── Segments.jsx             # 3 Core product segments showcase
│           ├── ProductsCatalog.jsx      # Filterable catalog with search & tabs
│           ├── ProductModal.jsx         # Full technical specifications modal
│           ├── DoorInterlockSimulator.jsx # Cleanroom interlock interactive demo
│           ├── PartnersClients.jsx      # Technology partners & clients wall
│           ├── AboutUs.jsx              # Company background & core values
│           ├── ContactInquiry.jsx       # Quote inquiry form linked to SQLite
│           ├── AdminInquiryDrawer.jsx   # Inquiries portal for reviewing submissions
│           └── Footer.jsx               # Mumbai office details, links & copyright
├── run.bat                  # One-click Windows launcher for both servers
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js** (v18+) & `npm`
* **Python** (v3.10+) with `pip`

---

### Option A: One-Click Launch (Windows)
Double-click `run.bat` in the root folder, or execute:
```powershell
.\run.bat
```
This automatically launches both the FastAPI backend on port `8000` and the Vite React frontend on port `3000`.

---

### Option B: Manual Launch

#### 1. Start the Python SQLite Backend
```powershell
cd backend
python -m pip install -r requirements.txt
python database.py   # Initializes schema & seeds 30+ products
python -m uvicorn main:app --reload --port 8000
```
Backend API will be running at: `http://127.0.0.1:8000`  
Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

#### 2. Start the React Frontend
In a separate terminal window:
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
Frontend Web Portal will be running at: `http://localhost:3000/`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/company-info` | Company address, contact numbers, and established year |
| `GET` | `/api/stats` | High-level metrics (product count, partners, inquiries) |
| `GET` | `/api/products` | Retrieve products (supports `?category=`, `?search=`, `?featured_only=`) |
| `GET` | `/api/products/{id_or_slug}` | Detailed specifications for a specific product |
| `POST` | `/api/inquiries` | Submit a customer quote or project requirement |
| `GET` | `/api/inquiries` | Retrieve logged inquiries (supports `?status_filter=`) |
| `PATCH` | `/api/inquiries/{id}/status` | Update inquiry workflow status (`New`, `In Review`, `Contacted`, `Resolved`) |
| `DELETE` | `/api/inquiries/{id}` | Remove an inquiry |
| `GET` | `/api/partners` | List authorized global technology partner brands |
| `GET` | `/api/clients` | List corporate client sectors and brand names |

---

## 🧪 Testing

An automated full-stack verification script is included in `scratch/test_e2e.py`. It tests:
* Frontend HTML delivery
* Vite proxy routing to FastAPI
* SQLite database connectivity
* Product querying and filtering
* Customer inquiry creation and retrieval

To run tests:
```powershell
python scratch/test_e2e.py
```

---

## 📄 Git Repository
* Repository URL: [https://github.com/brightlant223/hti_website](https://github.com/brightlant223/hti_website)
* Developed for **HTI Automation & Security Systems Pvt. Ltd.**
