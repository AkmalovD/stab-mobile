@echo off
echo ========================================
echo   STAB Mobile App - Quick Start
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK
echo.

echo Checking if npm is installed...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)
echo npm: OK
echo.

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env
echo 2. Add your Firebase credentials to .env
echo 3. Run: npm start
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo.
pause
