@echo off
echo Starting Aeronomy Website Development Server...

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing dependencies...
  call cmd /c npm install
)

:: Start development server
echo Starting development server on port 3002...
call cmd /c npm run dev

echo Development server running at http://localhost:3002 