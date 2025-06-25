@echo off
echo Starting Aeronomy Website Development Server...

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing dependencies...
  call cmd /c npm install
)

:: Start both frontend and backend servers
echo Starting backend server on port 3004...
start "Backend Server" cmd /c "npm start"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend development server on port 3002
echo Starting frontend development server on port 3002...
call cmd /c npm run dev

echo Development servers running:
echo - Frontend: http://localhost:3002
echo - Backend API: http://localhost:3004/api
echo - Health Check: http://localhost:3004/api/health 