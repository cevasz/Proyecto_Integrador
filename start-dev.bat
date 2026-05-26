@echo off
REM Script para iniciar backend y frontend en modo desarrollo (Windows)
REM Uso: start-dev.bat

echo.
echo ========================================
echo   CMS Multipais - Modo Desarrollo
echo ========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

REM Verificar dependencias del backend
if not exist "backend\node_modules" (
    echo [INFO] Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
    echo.
)

REM Verificar dependencias del frontend
if not exist "frontend\node_modules" (
    echo [INFO] Instalando dependencias del frontend...
    cd frontend
    call npm install
    cd ..
    echo.
)

REM Verificar archivos .env
if not exist "backend\.env" (
    echo [ADVERTENCIA] No se encontro backend\.env
    echo Por favor configura tus credenciales de Supabase
    echo.
)

if not exist "frontend\.env" (
    echo [ADVERTENCIA] No se encontro frontend\.env
    echo.
)

echo ========================================
echo   Iniciando servicios...
echo ========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener
echo ========================================
echo.

REM Iniciar backend en nueva ventana
start "CMS Backend" cmd /k "cd backend && npm run dev"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana
start "CMS Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo [OK] Servicios iniciados en ventanas separadas
echo.
echo Para detener: Cierra las ventanas o presiona Ctrl+C en cada una
echo.
pause
