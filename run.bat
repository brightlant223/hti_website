@echo off
echo ========================================================
echo  HTI Automation & Security Systems Pvt. Ltd.
echo  Starting Full-Stack Platform (React + Python + SQLite)
echo ========================================================

echo.
echo [1/2] Starting Python FastAPI Backend Server on port 8000...
start "HTI Backend API" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

echo [2/2] Starting React Vite Frontend Server on port 3000...
start "HTI Frontend Dev" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo [3/3] Opening Frontend Web Portal in default browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000/

echo.
echo Servers are launching:
echo  - Frontend Web Portal: http://localhost:3000/
echo  - Backend API & Docs:  http://127.0.0.1:8000/docs
echo  - SQLite Database:     backend/hti.db
echo.
pause
