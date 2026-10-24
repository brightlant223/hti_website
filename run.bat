@echo off
cd /d "%~dp0"

echo ========================================================
echo  HTI Automation and Security Systems Pvt. Ltd.
echo  Starting Full-Stack Platform (React + Python + SQLite)
echo ========================================================

echo.
echo [1/3] Starting Python FastAPI Backend Server on port 8000...
start "HTI Backend (Port 8000)" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --port 8000"

echo [2/3] Starting React Vite Frontend Server on port 3000...
start "HTI Frontend (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo [3/3] Opening Web Portal in your default browser...
ping 127.0.0.1 -n 4 >nul
start http://localhost:3000/

echo.
echo ========================================================
echo  Servers are successfully launching!
echo   - Frontend Web Portal: http://localhost:3000/
echo   - Backend API Docs:    http://127.0.0.1:8000/docs
echo   - SQLite Database:     backend/hti.db
echo ========================================================
echo.
pause 