#!/bin/bash

# Script para verificar requisitos del proyecto
# Uso: ./verificar-requisitos.sh

echo "🔍 Verificando requisitos del proyecto CMS Multipaís..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de problemas
PROBLEMAS=0

# Verificar Node.js
echo -n "Verificando Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Instalado${NC} ($NODE_VERSION)"
else
    echo -e "${RED}✗ No instalado${NC}"
    echo "  → Instala Node.js: sudo pacman -S nodejs npm"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

# Verificar npm
echo -n "Verificando npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ Instalado${NC} (v$NPM_VERSION)"
else
    echo -e "${RED}✗ No instalado${NC}"
    echo "  → Instala npm: sudo pacman -S npm"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

echo ""
echo "📁 Verificando estructura del proyecto..."

# Verificar carpeta backend
echo -n "Carpeta backend/... "
if [ -d "backend" ]; then
    echo -e "${GREEN}✓ Existe${NC}"
else
    echo -e "${RED}✗ No existe${NC}"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

# Verificar carpeta frontend
echo -n "Carpeta frontend/... "
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓ Existe${NC}"
else
    echo -e "${RED}✗ No existe${NC}"
    PROBLEMAS=$((PROBLEMAS + 1))
fi

# Verificar .env del backend
echo -n "Archivo backend/.env... "
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓ Existe${NC}"
else
    echo -e "${YELLOW}⚠ No existe${NC}"
    echo "  → Crea el archivo y configura tus credenciales de Supabase"
fi

# Verificar .env del frontend
echo -n "Archivo frontend/.env... "
if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✓ Existe${NC}"
else
    echo -e "${YELLOW}⚠ No existe${NC}"
fi

echo ""
echo "📦 Verificando dependencias..."

# Verificar node_modules del backend
echo -n "Dependencias backend... "
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓ Instaladas${NC}"
else
    echo -e "${YELLOW}⚠ No instaladas${NC}"
    echo "  → Ejecuta: cd backend && npm install"
fi

# Verificar node_modules del frontend
echo -n "Dependencias frontend... "
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓ Instaladas${NC}"
else
    echo -e "${YELLOW}⚠ No instaladas${NC}"
    echo "  → Ejecuta: cd frontend && npm install"
fi

echo ""
echo "═══════════════════════════════════════════════════"

if [ $PROBLEMAS -eq 0 ]; then
    echo -e "${GREEN}✓ Todos los requisitos están cumplidos${NC}"
    echo ""
    echo "🚀 Puedes iniciar el proyecto con:"
    echo "   ./start-dev.sh"
    echo ""
    echo "O manualmente:"
    echo "   Terminal 1: cd backend && npm run dev"
    echo "   Terminal 2: cd frontend && npm run dev"
else
    echo -e "${RED}✗ Se encontraron $PROBLEMAS problema(s)${NC}"
    echo ""
    echo "📖 Consulta INSTALAR_NODEJS.md para solucionar los problemas"
fi

echo "═══════════════════════════════════════════════════"
