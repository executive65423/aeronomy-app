@echo off
echo Building Aeronomy Website...

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing dependencies...
  call cmd /c npm install
)

:: Build the application
echo Building application...
call cmd /c npm run build

:: Start the server
echo Starting server on port 3002...
call cmd /c npm start

echo Server running at http://localhost:3002 