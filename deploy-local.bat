@echo off
echo Deploying Aeronomy Website on local environment...

:: Kill any process using port 3004
echo Checking for processes using port 3004...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3004 ^| findstr LISTENING') do (
  echo Killing process with PID: %%a
  taskkill /F /PID %%a 2>nul
  if %errorlevel% equ 0 (
    echo Process killed successfully.
  ) else (
    echo No process was found using port 3004.
  )
)

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing dependencies...
  call cmd /c npm install
)

:: Build the application
echo Building application...
call cmd /c npx tsc
call cmd /c npx vite build

:: Start the server
echo Starting server on port 3004...
call cmd /c npm start

echo Server running at http://localhost:3004 