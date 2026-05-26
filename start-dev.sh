#!/bin/bash

# Script para iniciar backend y frontend en modo desarrollo
# Uso: ./start-dev.sh

echo "🚀 Iniciando CMS Multipaís en modo desarrollo..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo ""

# Verificar si las dependencias están instaladas
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
    echo ""
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend && npm install && cd ..
    echo ""
fi

# Verificar archivos .env
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Advertencia: No se encontró backend/.env"
    echo "Por favor configura tus credenciales de Supabase"
    echo ""
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Advertencia: No se encontró frontend/.env"
    echo ""
fi

echo "🔧 Iniciando servicios..."
echo ""
echo "📍 Backend: http://localhost:3001"
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "⚠️  Presiona Ctrl+C para detener ambos servicios"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar backend en segundo plano
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar frontend en segundo plano
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Esperar a que ambos procesos terminen
wait $BACKEND_PID $FRONTEND_PID
