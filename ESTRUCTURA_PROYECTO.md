# 📁 Estructura del Proyecto CMS Multipaís

## 🌳 Árbol de Directorios

```
proyecto-cms-multipais/
│
├── 📂 backend/                          # API REST (Node.js + Express)
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── supabase.js             # Cliente Supabase
│   │   │
│   │   ├── 📂 controllers/             # Controladores de rutas
│   │   │   ├── archivoController.js
│   │   │   ├── auditController.js
│   │   │   ├── authController.js
│   │   │   ├── noticiaController.js
│   │   │   ├── paisController.js
│   │   │   ├── publicController.js
│   │   │   ├── solicitudController.js
│   │   │   ├── testimonioController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── 📂 middlewares/             # Middlewares
│   │   │   ├── authMiddleware.js       # Verificación JWT
│   │   │   └── uploadMiddleware.js     # Manejo archivos
│   │   │
│   │   ├── 📂 routes/                  # Definición de rutas
│   │   │   ├── archivoRoutes.js
│   │   │   ├── auditRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── noticiaRoutes.js
│   │   │   ├── paisRoutes.js
│   │   │   ├── publicRoutes.js
│   │   │   ├── solicitudRoutes.js
│   │   │   ├── testimonioRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── 📂 scripts/                 # Scripts de inicialización
│   │   │   ├── createSuperAdmin.js
│   │   │   └── createTestUsers.js
│   │   │
│   │   ├── 📂 services/                # Lógica de negocio
│   │   │   ├── archivoService.js
│   │   │   ├── auditService.js
│   │   │   ├── authService.js
│   │   │   ├── noticiaService.js
│   │   │   ├── paisService.js
│   │   │   ├── publicService.js
│   │   │   ├── solicitudService.js
│   │   │   ├── testimonioService.js
│   │   │   └── userService.js
│   │   │
│   │   └── server.js                   # Punto de entrada
│   │
│   ├── .env                            # Variables de entorno
│   ├── package.json                    # Dependencias backend
│   └── README.md                       # Documentación backend
│
├── 📂 frontend/                         # Aplicación React
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   └── axiosClient.js          # Cliente HTTP
│   │   │
│   │   ├── 📂 assets/                  # Recursos estáticos
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── 📂 components/              # Componentes reutilizables
│   │   │   ├── 📂 admin/               # Componentes admin
│   │   │   └── 📂 public/              # Componentes públicos
│   │   │
│   │   ├── 📂 context/                 # Context API
│   │   │   ├── AuthContext.jsx         # Provider autenticación
│   │   │   └── authContext.js          # Context autenticación
│   │   │
│   │   ├── 📂 hooks/                   # Custom hooks
│   │   │   └── useAuth.js
│   │   │
│   │   ├── 📂 layouts/                 # Layouts principales
│   │   │   ├── AdminLayout.jsx         # Layout panel admin
│   │   │   └── PublicLayout.jsx        # Layout portal público
│   │   │
│   │   ├── 📂 pages/                   # Páginas
│   │   │   │
│   │   │   ├── 📂 admin/               # Páginas administrativas
│   │   │   │   ├── AuditoriaPage.jsx
│   │   │   │   ├── ChangePasswordPage.jsx
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── NoticiaFormPage.jsx
│   │   │   │   ├── NoticiasPage.jsx
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   ├── SecurityQuestionPage.jsx
│   │   │   │   ├── SolicitudFormPage.jsx
│   │   │   │   ├── SolicitudesPage.jsx
│   │   │   │   ├── TestimonioFormPage.jsx
│   │   │   │   ├── TestimoniosPage.jsx
│   │   │   │   ├── UserFormPage.jsx
│   │   │   │   └── UsersPage.jsx
│   │   │   │
│   │   │   └── 📂 public/              # Páginas públicas
│   │   │       ├── ContactoPage.jsx
│   │   │       ├── HomePage.jsx
│   │   │       ├── PublicNoticiaDetailPage.jsx
│   │   │       ├── PublicNoticiasPage.jsx
│   │   │       ├── PublicTestimonioDetailPage.jsx
│   │   │       └── PublicTestimoniosPage.jsx
│   │   │
│   │   ├── 📂 routes/                  # Rutas y protección
│   │   │   ├── ProtectedRoute.jsx      # HOC rutas protegidas
│   │   │   └── RoleRoute.jsx           # HOC rutas por rol
│   │   │
│   │   ├── 📂 services/                # Servicios API
│   │   │   ├── auditService.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── noticiaService.js
│   │   │   ├── paisService.js
│   │   │   ├── publicService.js
│   │   │   ├── solicitudService.js
│   │   │   ├── testimonioService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── App.jsx                     # Componente principal
│   │   ├── main.jsx                    # Punto de entrada
│   │   └── index.css                   # Estilos globales
│   │
│   ├── .env                            # Variables de entorno
│   ├── index.html                      # HTML principal
│   ├── vite.config.js                  # Configuración Vite
│   ├── package.json                    # Dependencias frontend
│   └── README.md                       # Documentación frontend
│
├── 📂 Img/                              # Imágenes documentación
│   └── *.jpeg
│
├── 📂 .vscode/                          # Configuración VS Code
│   └── settings.json
│
├── 📄 .gitignore                        # Archivos ignorados por Git
├── 📄 INICIO_RAPIDO.md                  # Guía inicio rápido
├── 📄 INSTRUCCIONES_EJECUCION.md        # Guía detallada
├── 📄 ESTRUCTURA_PROYECTO.md            # Este archivo
├── 📄 README.md                         # Documentación principal
├── 📄 readme.md                         # Documentación técnica original
├── 📄 start-dev.sh                      # Script inicio Linux/Mac
└── 📄 start-dev.bat                     # Script inicio Windows
```

---

## 📊 Estadísticas del Proyecto

### Backend
- **Controladores:** 9 archivos
- **Servicios:** 9 archivos
- **Rutas:** 9 archivos
- **Middlewares:** 2 archivos
- **Scripts:** 2 archivos

### Frontend
- **Páginas Admin:** 15 archivos
- **Páginas Públicas:** 6 archivos
- **Servicios:** 9 archivos
- **Layouts:** 2 archivos
- **Rutas:** 2 archivos

### Total
- **Archivos de código:** ~60 archivos
- **Líneas de código:** ~15,000+ líneas
- **Dependencias:** ~30 paquetes

---

## 🎯 Módulos Principales

### 1. Autenticación (`auth`)
**Backend:**
- `authController.js` - Login, perfil, contraseña
- `authService.js` - Lógica autenticación
- `authMiddleware.js` - Verificación JWT

**Frontend:**
- `AuthContext.jsx` - Estado global auth
- `LoginPage.jsx` - Página login
- `ForgotPasswordPage.jsx` - Recuperar contraseña

### 2. Usuarios (`users`)
**Backend:**
- `userController.js` - CRUD usuarios
- `userService.js` - Lógica usuarios

**Frontend:**
- `UsersPage.jsx` - Lista usuarios
- `UserFormPage.jsx` - Crear/editar usuario

### 3. Noticias (`noticias`)
**Backend:**
- `noticiaController.js` - CRUD noticias
- `noticiaService.js` - Lógica noticias

**Frontend:**
- `NoticiasPage.jsx` - Lista noticias
- `NoticiaFormPage.jsx` - Crear/editar noticia
- `PublicNoticiasPage.jsx` - Vista pública

### 4. Testimonios (`testimonios`)
**Backend:**
- `testimonioController.js` - CRUD testimonios
- `testimonioService.js` - Lógica testimonios

**Frontend:**
- `TestimoniosPage.jsx` - Lista testimonios
- `TestimonioFormPage.jsx` - Crear/editar testimonio
- `PublicTestimoniosPage.jsx` - Vista pública

### 5. Solicitudes (`solicitudes`)
**Backend:**
- `solicitudController.js` - CRUD solicitudes
- `solicitudService.js` - Lógica solicitudes

**Frontend:**
- `SolicitudesPage.jsx` - Lista solicitudes
- `SolicitudFormPage.jsx` - Editar solicitud
- `ContactoPage.jsx` - Formulario público

### 6. Auditoría (`auditoria`)
**Backend:**
- `auditController.js` - Consulta auditoría
- `auditService.js` - Registro auditoría

**Frontend:**
- `AuditoriaPage.jsx` - Vista auditoría

### 7. Portal Público (`public`)
**Backend:**
- `publicController.js` - Endpoints públicos
- `publicService.js` - Lógica pública

**Frontend:**
- `HomePage.jsx` - Página inicio
- `PublicLayout.jsx` - Layout público
- Páginas de noticias y testimonios

---

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│         FRONTEND (React)        │
│  ┌──────────────────────────┐  │
│  │   Páginas (Pages)        │  │
│  └────────┬─────────────────┘  │
│           │                     │
│  ┌────────▼─────────────────┐  │
│  │   Servicios (Services)   │  │
│  └────────┬─────────────────┘  │
│           │                     │
│  ┌────────▼─────────────────┐  │
│  │   Axios Client           │  │
│  └────────┬─────────────────┘  │
└───────────┼─────────────────────┘
            │ HTTP Request
            │ (JSON + JWT)
            ▼
┌─────────────────────────────────┐
│      BACKEND (Express)          │
│  ┌──────────────────────────┐  │
│  │   Rutas (Routes)         │  │
│  └────────┬─────────────────┘  │
│           │                     │
│  ┌────────▼─────────────────┐  │
│  │   Middlewares            │  │
│  │   - Auth JWT             │  │
│  │   - Upload Files         │  │
│  └────────┬─────────────────┘  │
│           │                     │
│  ┌────────▼─────────────────┐  │
│  │   Controladores          │  │
│  └────────┬─────────────────┘  │
│           │                     │
│  ┌────────▼─────────────────┐  │
│  │   Servicios              │  │
│  └────────┬─────────────────┘  │
└───────────┼─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│      SUPABASE (PostgreSQL)      │
│  - Tablas                       │
│  - Storage                      │
│  - RLS                          │
└─────────────────────────────────┘
```

---

## 🗄️ Base de Datos (Supabase)

### Tablas Principales

1. **paises** - Países disponibles
2. **roles** - Roles del sistema
3. **usuarios** - Usuarios del CMS
4. **noticias** - Noticias por país
5. **testimonios** - Testimonios por país
6. **solicitudes_contacto** - Solicitudes públicas
7. **bitacora_auditoria** - Log de acciones
8. **archivos** - Registro de archivos

### Relaciones

```
paises ──┬─── noticias
         ├─── testimonios
         ├─── solicitudes_contacto
         └─── usuarios

roles ────── usuarios

usuarios ─┬─── noticias (autor)
          ├─── testimonios (autor)
          ├─── solicitudes_contacto (gestionado_por)
          ├─── bitacora_auditoria
          └─── archivos (subido_por)
```

---

## 🔐 Seguridad

### Autenticación
- JWT (JSON Web Tokens)
- Tokens almacenados en localStorage
- Expiración configurable (default: 60min)

### Autorización
- Middleware `verifyToken`
- Middleware `requireRole`
- Rutas protegidas por rol

### Protección Anti Fuerza Bruta
- Máximo 3 intentos fallidos
- Bloqueo temporal 10 segundos
- Reset automático al login exitoso

### RLS (Row Level Security)
- Activado en todas las tablas
- Backend usa `service_role_key`

---

## 🚀 Scripts Disponibles

### Backend
```bash
npm run dev              # Desarrollo con nodemon
npm start                # Producción
npm run create-superadmin    # Crear superadmin
npm run create-test-users    # Crear usuarios prueba
```

### Frontend
```bash
npm run dev              # Desarrollo con Vite
npm run build            # Build producción
npm run preview          # Preview build
npm run lint             # Linter
```

### Raíz del Proyecto
```bash
./start-dev.sh           # Iniciar todo (Linux/Mac)
start-dev.bat            # Iniciar todo (Windows)
```

---

## 📦 Dependencias Principales

### Backend
- `express` - Framework web
- `@supabase/supabase-js` - Cliente Supabase
- `jsonwebtoken` - JWT
- `bcryptjs` - Hash contraseñas
- `multer` - Upload archivos
- `cors` - CORS
- `dotenv` - Variables entorno

### Frontend
- `react` - Librería UI
- `react-router-dom` - Enrutamiento
- `axios` - Cliente HTTP
- `bootstrap` - Framework CSS
- `bootstrap-icons` - Iconos
- `vite` - Build tool

---

## 📝 Convenciones de Código

### Nombres de Archivos
- **Componentes React:** PascalCase (ej: `LoginPage.jsx`)
- **Servicios:** camelCase (ej: `authService.js`)
- **Rutas:** camelCase (ej: `authRoutes.js`)

### Estructura de Componentes
```jsx
// Imports
import { useState } from 'react';

// Componente
export default function MiComponente() {
  // Estados
  const [data, setData] = useState([]);
  
  // Funciones
  function handleClick() { }
  
  // Render
  return <div>...</div>;
}
```

### Estructura de Servicios
```javascript
// Backend
export async function getItems() {
  const { data, error } = await supabase
    .from('tabla')
    .select('*');
    
  if (error) throw error;
  return data;
}

// Frontend
export async function getItems() {
  const response = await axiosClient.get('/items');
  return response.data;
}
```

---

## 🎨 Estilos

### Clases Personalizadas
- `.admin-*` - Componentes admin
- `.public-*` - Componentes públicos
- `.dashboard-*` - Dashboard
- `.login-*` - Login

### Bootstrap
- Componentes base de Bootstrap 5
- Utilidades de spacing, colores, etc.
- Grid system responsive

---

## 📞 Soporte

Para más información consulta:
- `README.md` - Documentación general
- `INICIO_RAPIDO.md` - Guía rápida
- `INSTRUCCIONES_EJECUCION.md` - Guía detallada
- `backend/README.md` - Docs backend
- `frontend/README.md` - Docs frontend

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0.0
