@echo off
REM Start backend
cd /d "%~dp0backend"
start "ArrendaKi Backend" /B "%CD%\..\venv\Scripts\python.exe" -m uvicorn backend.main:app --port 8001

REM Start frontend
cd /d "%~dp0frontend"
start "ArrendaKi Frontend" /B cmd /c "npm run dev"

echo Servers started!
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173
