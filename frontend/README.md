# 🎨 Frontend - CMS Multipaís

Aplicación web construida con React, Vite y Bootstrap para el sistema CMS Multipaís.

## 📋 Descripción

Interfaz de usuario que incluye portal público por país y panel administrativo con gestión de contenidos.

## 🏗️ Estructura

```
frontend/
├── src/
│   ├── api/
│   │   └── axiosClient.js       # Cliente HTTP configurado
│   ├── assets/                  # Imágenes y recursos
│   ├── components/
│   │   ├── admin/              # Componentes admin
│   │   └── public/             # Componentes públicos
│   ├── context/
│   │   ├── AuthContext.jsx     # Provider de autenticación
│   │   └── authContext.js      # Context de autenticación
│   ├── hooks/
│   │   └── useAuth.js          # Hook personalizado auth
│   ├── layouts/
│   │   ├── AdminLayout.jsx     # Layout panel admin
│   │   └── PublicLayout.jsx    # Layout portal público
│   ├── pages/
│   │   ├── admin/              # Páginas administrativas
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ChangePasswordPage.jsx
│   │   │   ├── SecurityQuestionPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   ├── UserFormPage.jsx
│   │   │   ├── NoticiasPage.jsx
│   │   │   ├── NoticiaFormPage.jsx
│   │   │   ├── TestimoniosPage.jsx
│   │   │   ├── TestimonioFormPage.jsx
│   │   │   ├── SolicitudesPage.jsx
│   │   │   ├── SolicitudFormPage.jsx
│   │   │   └── AuditoriaPage.jsx
│   │   └── public/             # Páginas públicas
│   │       ├── HomePage.jsx
│   │       ├── PublicNoticiasPage.jsx
│   │       ├── PublicNoticiaDetailPage.jsx
│   │       ├── PublicTestimoniosPage.jsx
│   │       ├── PublicTestimonioDetailPage.jsx
│   │       └── ContactoPage.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx  # HOC rutas protegidas
│   │   └── RoleRoute.jsx       # HOC rutas por rol
│   ├── services/               # Servicios API
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── noticiaService.js
│   │   ├── testimonioService.js
│   │   ├── solicitudService.js
│   │   ├── auditService.js
│   │   ├── paisService.js
│   │   ├── dashboardService.js
│   │   └── publicService.js
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── .env                        # Variables de entorno
├── index.html                  # HTML principal
├── vite.config.js              # Configuración Vite
├── package.json
└── README.md
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# El archivo .env ya está configurado
```

## ⚙️ Configuración

El archivo `.env` contiene:

```env
VITE_API_URL=http://localhost:3001/api
VITE_PUBLIC_COUNTRY=argentina
```

## 📦 Scripts

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 🎨 Características

### Portal Público
- ✅ Página de inicio con selector de países
- ✅ Listado de noticias por país
- ✅ Detalle de noticia
- ✅ Listado de testimonios por país
- ✅ Detalle de testimonio
- ✅ Formulario de solicitudes de contacto
- ✅ Navegación entre países
- ✅ Búsqueda y filtros

### Panel Administrativo
- ✅ Login con protección anti fuerza bruta
- ✅ Dashboard con estadísticas
- ✅ Gestión de usuarios (SuperAdmin)
- ✅ Gestión de noticias (crear, editar, publicar)
- ✅ Gestión de testimonios (crear, editar, destacar)
- ✅ Gestión de solicitudes
- ✅ Auditoría del sistema (SuperAdmin)
- ✅ Perfil de usuario
- ✅ Cambio de contraseña
- ✅ Pregunta de seguridad
- ✅ Recuperación de contraseña

## 🔐 Autenticación

### Context API

```jsx
import { useAuth } from './hooks/useAuth';

function MiComponente() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Usar funciones de autenticación
}
```

### Rutas Protegidas

```jsx
// Ruta que requiere autenticación
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

// Ruta que requiere rol específico
<Route
  path="/admin/users"
  element={
    <RoleRoute allowedRoles={['superadmin']}>
      <UsersPage />
    </RoleRoute>
  }
/>
```

## 🎯 Roles y Permisos

### SuperAdmin
- ✅ Acceso completo al sistema
- ✅ Gestión de usuarios
- ✅ Ver auditoría
- ✅ Gestionar contenido de todos los países

### Admin País
- ✅ Gestionar contenido de su país
- ✅ Gestionar solicitudes de su país
- ✅ No puede administrar usuarios

### Editor
- ✅ Crear y editar contenido de su país
- ✅ No puede eliminar contenido
- ✅ No gestiona solicitudes

## 📡 Servicios API

### Ejemplo de Uso

```javascript
import { getNoticias, createNoticia } from '../services/noticiaService';

// Listar noticias
const noticias = await getNoticias();

// Crear noticia
const nuevaNoticia = await createNoticia({
  pais_id: 1,
  titulo: 'Mi noticia',
  resumen: 'Resumen...',
  contenido: 'Contenido...',
  estado: 'borrador'
});
```

### Servicios Disponibles

- `authService` - Login, logout, perfil, contraseña
- `userService` - CRUD usuarios
- `noticiaService` - CRUD noticias
- `testimonioService` - CRUD testimonios
- `solicitudService` - CRUD solicitudes
- `auditService` - Consulta auditoría
- `paisService` - Listar países
- `dashboardService` - Datos dashboard
- `publicService` - Contenido público

## 🎨 Estilos

### Bootstrap 5

El proyecto usa Bootstrap 5 para componentes base:

```jsx
<button className="btn btn-primary">
  Botón
</button>
```

### Estilos Personalizados

Los estilos personalizados están en `src/index.css`:

```css
/* Clases personalizadas */
.admin-shell { }
.admin-sidebar { }
.public-hero { }
.dashboard-card { }
```

### Bootstrap Icons

```jsx
<i className="bi bi-newspaper" />
<i className="bi bi-person-circle" />
```

## 🧩 Componentes Principales

### Layouts

```jsx
// Layout público
<PublicLayout>
  <Outlet />
</PublicLayout>

// Layout admin
<AdminLayout>
  <Outlet />
</AdminLayout>
```

### Páginas

```jsx
// Página pública
export default function HomePage() {
  return <div>Contenido</div>;
}

// Página admin
export default function DashboardPage() {
  const { user } = useAuth();
  return <div>Dashboard de {user.nombre}</div>;
}
```

## 🔄 Estado Global

### AuthContext

```jsx
const authValue = {
  token,
  user,
  isAuthenticated,
  login,
  logout,
  updateMyProfile,
  changeMyPassword,
  setSecurityQuestion,
  getSecurityQuestion,
  forgotPassword
};
```

## 📱 Responsive

El diseño es completamente responsive:

- Mobile first
- Breakpoints de Bootstrap
- Navegación adaptativa
- Tablas responsivas

## 🧪 Testing

### Probar Localmente

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173
```

### Credenciales de Prueba

- **SuperAdmin:** `superadmin` / `superadmin123*`
- **Admin Argentina:** `admin_argentina` / `admin123*`
- **Editor Argentina:** `editor_argentina` / `editor123*`

## 🏗️ Build para Producción

```bash
# Crear build
npm run build

# Preview del build
npm run preview

# Los archivos estarán en dist/
```

## 📊 Dependencias

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "bootstrap": "^5.3.0",
    "bootstrap-icons": "^1.11.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.13.0",
    "vite": "^5.4.10"
  }
}
```

## 🚀 Despliegue

### Variables de Entorno en Producción

```env
VITE_API_URL=https://tu-api-produccion.com/api
VITE_PUBLIC_COUNTRY=argentina
```

### Plataformas Recomendadas

- **Vercel** - Despliegue automático desde Git
- **Netlify** - CI/CD integrado
- **AWS S3 + CloudFront** - Hosting estático

### Configuración Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🎨 Personalización

### Cambiar Colores

Edita `src/index.css`:

```css
:root {
  --primary-color: #75106f;
  --secondary-color: #a00082;
}
```

### Cambiar Logo

Reemplaza los archivos en `src/assets/`

### Cambiar Textos

Los textos están directamente en los componentes para fácil personalización.

## 🐛 Debugging

### React DevTools

Instala la extensión React DevTools para Chrome/Firefox.

### Console Logs

```javascript
console.log('User:', user);
console.log('Token:', token);
```

### Network Tab

Revisa las peticiones HTTP en las DevTools del navegador.

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la consola del navegador
2. Verifica que el backend esté corriendo
3. Revisa las variables de entorno
4. Consulta la documentación principal

---

**Puerto por defecto:** 5173  
**Framework:** React 18 + Vite  
**Estilos:** Bootstrap 5 + CSS personalizado
