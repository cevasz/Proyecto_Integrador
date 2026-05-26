# 🔐 Credenciales del Sistema CMS Multipaís

## 📋 Información General

**Proyecto**: CMS Multipaís - Latinoamérica Comparte  
**Repositorio**: https://github.com/cevasz/Proyecto_Integrador.git  
**Fecha**: Mayo 2026

---

## 🌐 URLs del Sistema

### Frontend
- **URL Local**: http://localhost:5173
- **Página Principal**: http://localhost:5173/
- **Panel Admin**: http://localhost:5173/admin/login

### Backend
- **URL API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

---

## 🔑 Credenciales de Acceso

### SuperAdmin (Acceso Total)
```
Usuario: superadmin
Contraseña: superadmin123*
Rol: superadmin
```

**Permisos:**
- ✅ Gestión de usuarios
- ✅ Gestión de noticias
- ✅ Gestión de testimonios
- ✅ Gestión de solicitudes
- ✅ Auditoría del sistema
- ✅ Acceso a todos los países

---

## 🗄️ Base de Datos (Supabase)

### Conexión
```
URL: https://wyfujgslwxmmjzicxegj.supabase.co
Project ID: wyfujgslwxmmjzicxegj
```

### API Keys
```
Anon Key (Público):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZnVqZ3Nsd3htbWp6aWN4ZWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDYxMjIsImV4cCI6MjA5Mjk4MjEyMn0.qgckaKFUJMHT3IGB_fEJK3jDLD_Ooo_bjim0b64tRaE

Service Role Key (Privado):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZnVqZ3Nsd3htbWp6aWN4ZWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzQwNjEyMiwiZXhwIjoyMDkyOTgyMTIyfQ.AEqa0U2VYwhDYFBUiDTSVNAw-nFuIYgtsa-4gtpwtuQ
```

### Storage Bucket
```
Bucket Name: cms-media
Política: Público (lectura)
Uso: Imágenes de noticias y testimonios
```

---

## 🔐 JWT Configuration

```
JWT_SECRET: clave_super_segura_cms_multipais_santotomas_26
JWT_EXPIRES_IN: 60m (60 minutos)
```

---

## 👥 Roles del Sistema

### 1. SuperAdmin
- **Código**: `superadmin`
- **Descripción**: Acceso total al sistema
- **Permisos**: Todos los módulos y países

### 2. Admin País
- **Código**: `admin_pais`
- **Descripción**: Administrador de un país específico
- **Permisos**: Noticias, testimonios y solicitudes de su país

### 3. Editor
- **Código**: `editor`
- **Descripción**: Editor de contenido
- **Permisos**: Noticias y testimonios de su país

---

## 🌎 Países Configurados

1. **Ecuador** (EC)
   - Slug: `ecuador`
   - Código: `EC`

2. **Argentina** (AR)
   - Slug: `argentina`
   - Código: `AR`

3. **Chile** (CL)
   - Slug: `chile`
   - Código: `CL`

---

## 🚀 Comandos de Inicio

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Ambos (desde raíz)
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## 📝 Scripts Útiles

### Crear SuperAdmin
```bash
cd backend
npm run create-superadmin
```

### Crear Usuarios de Prueba
```bash
cd backend
npm run create-test-users
```

### Build Frontend
```bash
cd frontend
npm run build
```

---

## 🔒 Seguridad

### Características Implementadas
- ✅ Autenticación JWT
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Protección contra fuerza bruta (3 intentos)
- ✅ Bloqueo temporal de cuenta (10 segundos)
- ✅ Pregunta de seguridad para recuperación
- ✅ Auditoría de acciones
- ✅ Sesiones de 60 minutos
- ✅ Validación de permisos por país

### Endpoints Protegidos
- `/api/admin/*` - Requiere autenticación
- `/api/users/*` - Solo superadmin
- `/api/auditoria/*` - Solo superadmin

---

## 📊 Módulos del Sistema

### Públicos (Sin autenticación)
- ✅ Visualización de noticias
- ✅ Visualización de testimonios
- ✅ Envío de solicitudes
- ✅ Filtrado por país

### Administrativos (Con autenticación)
- ✅ Dashboard con estadísticas
- ✅ Gestión de noticias (CRUD)
- ✅ Gestión de testimonios (CRUD)
- ✅ Gestión de solicitudes (CRUD)
- ✅ Gestión de usuarios (CRUD) - Solo superadmin
- ✅ Auditoría del sistema - Solo superadmin
- ✅ Perfil de usuario
- ✅ Cambio de contraseña
- ✅ Pregunta de seguridad

---

## 🎨 Características de Diseño

### HomePage
- ✅ Fondo interactivo con figuras que explotan al clic
- ✅ Gradiente moderno (morado → magenta → azul)
- ✅ Iconos de países con PNG transparente
- ✅ Logo LC centrado y destacado
- ✅ Animaciones suaves

### Panel Admin
- ✅ Sidebar con navegación
- ✅ Dashboard con métricas
- ✅ Tablas modernas con paginación
- ✅ Modales para confirmaciones
- ✅ Alertas y notificaciones

---

## 📞 Soporte

Para cualquier problema o consulta:
1. Revisar logs del backend: `backend/logs/`
2. Verificar conexión a Supabase
3. Comprobar que ambos servicios estén corriendo
4. Revisar la consola del navegador para errores

---

## ⚠️ Notas Importantes

1. **NO compartir** las credenciales de Service Role Key públicamente
2. **Cambiar** las contraseñas por defecto en producción
3. **Configurar** variables de entorno en el servidor de producción
4. **Crear backup** de la base de datos regularmente
5. **Revisar** los logs de auditoría periódicamente

---

**Última actualización**: Mayo 26, 2026
