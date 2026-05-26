# 📦 Instalar Node.js en CachyOS/Arch Linux

## ⚠️ Problema Detectado

Tu sistema no tiene Node.js instalado, que es necesario para ejecutar este proyecto.

---

## ✅ Solución: Instalar Node.js

### Opción 1: Instalar con pacman (Recomendado)

```bash
# Actualizar repositorios
sudo pacman -Sy

# Instalar Node.js y npm
sudo pacman -S nodejs npm

# Verificar instalación
node --version
npm --version
```

### Opción 2: Instalar con yay (AUR)

Si prefieres una versión específica:

```bash
# Instalar Node.js LTS
yay -S nodejs-lts-iron

# O la versión más reciente
yay -S nodejs
```

### Opción 3: Instalar con nvm (Node Version Manager)

Para gestionar múltiples versiones de Node.js:

```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar shell
source ~/.bashrc
# o si usas fish:
source ~/.config/fish/config.fish

# Instalar Node.js LTS
nvm install --lts

# Usar la versión instalada
nvm use --lts

# Verificar
node --version
npm --version
```

---

## 🚀 Después de Instalar Node.js

Una vez instalado Node.js, ejecuta estos comandos:

### 1. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 3. Verificar que todo esté instalado

```bash
# Desde la raíz del proyecto
ls backend/node_modules
ls frontend/node_modules
```

---

## 📋 Comandos Rápidos (Copia y Pega)

```bash
# 1. Instalar Node.js
sudo pacman -S nodejs npm

# 2. Verificar instalación
node --version && npm --version

# 3. Volver a la carpeta del proyecto
cd ~/Documentos/Construccion_de_Software/Colombia

# 4. Instalar dependencias del backend
cd backend
npm install

# 5. Instalar dependencias del frontend
cd ../frontend
npm install

# 6. Crear superadmin
cd ../backend
npm run create-superadmin

# 7. Iniciar backend (en una terminal)
npm run dev

# 8. Iniciar frontend (en otra terminal)
cd ../frontend
npm run dev
```

---

## ✅ Verificación Final

Después de instalar todo, deberías ver:

```bash
# Backend corriendo en:
http://localhost:3001

# Frontend corriendo en:
http://localhost:5173
```

---

## 🐛 Solución de Problemas

### Error: "EACCES: permission denied"

```bash
# Cambiar propietario de carpetas npm
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/.config
```

### Error: "gyp ERR! build error"

```bash
# Instalar herramientas de compilación
sudo pacman -S base-devel python
```

### Error: "Cannot find module"

```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Ayuda Adicional

Si tienes problemas:

1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm esté instalado: `npm --version`
3. Asegúrate de estar en la carpeta correcta: `pwd`
4. Revisa los logs de error completos

---

## 🎯 Versiones Recomendadas

- **Node.js:** v18.x o superior (LTS)
- **npm:** v9.x o superior

---

**Nota:** Después de instalar Node.js, cierra y vuelve a abrir tu terminal para que los cambios surtan efecto.
