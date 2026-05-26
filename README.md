# 🌎 CMS Multipaís - Latinoamérica Comparte

Sistema de gestión de contenidos (CMS) administrativo para múltiples países de Latinoamérica.

## 📋 Descripción

Plataforma web que permite gestionar contenido (noticias, testimonios, solicitudes) de forma independiente para diferentes países, con roles diferenciados y portal público por país.

## 🏗️ Estructura del Proyecto

```
proyecto-cms-multipais/
├── backend/              # API REST con Node.js + Express + Supabase
│   ├── src/
│   │   ├── config/      # Configuración de Supabase
│   │   ├── controllers/ # Controladores de rutas
│   │   ├── middlewares/ # Middlewares (auth, upload)
│   │   ├── routes/      # Definición de rutas
│   │   ├── scripts/     # Scripts de inicialización
│   │   ├── services/    # Lógica de negocio
│   │   └── server.js    # Punto de entrada
│   ├── .env             # Variables de entorno
│   └── package.json
│
├── frontend/            # Aplicación React + Vite
│   ├── src/
│   │   ├── api/         # Cliente Axios
│   │   ├── assets/      # Imágenes y recursos
│   │   ├── components/  # Componentes reutilizables
│   │   ├── context/     # Context API (Auth)
│   │   ├── hooks/       # Custom hooks
│   │   ├── layouts/     # Layouts (Public, Admin)
│   │   ├── pages/       # Páginas (public, admin)
│   │   ├── routes/      # Rutas protegidas
│   │   ├── services/    # Servicios API
│   │   ├── App.jsx      # Componente principal
│   │   ├── main.jsx     # Punto de entrada
│   │   └── index.css    # Estilos globales
│   ├── .env             # Variables de entorno
│   ├── index.html       # HTML principal
│   ├── vite.config.js   # Configuración Vite
│   └── package.json
│
├── Img/                 # Imágenes de documentación
├── README.md            # Este archivo
├── INSTRUCCIONES_EJECUCION.md  # Guía de instalación
└── .gitignore
```

## 🚀 Tecnologías

### Backend
- **Node.js** + **Express** - Framework web
- **Supabase** - Base de datos PostgreSQL + Storage
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Multer** - Manejo de archivos

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconos

## ⚡ Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm
- Cuenta en Supabase
- Git

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd proyecto-cms-multipais
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Configura el archivo `backend/.env` con tus credenciales de Supabase:

```env
PORT=3001
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
JWT_SECRET=clave_super_segura_cms_multipais_santotomas_26
JWT_EXPIRES_IN=60m
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

El archivo `frontend/.env` ya está configurado:

```env
VITE_API_URL=http://localhost:3001/api
VITE_PUBLIC_COUNTRY=argentina
```

### 4. Crear Base de Datos

Sigue las instrucciones en `INSTRUCCIONES_EJECUCION.md` para crear las tablas en Supabase.

### 5. Crear SuperAdmin

```bash
cd backend
npm run create-superadmin
```

### 6. Ejecutar el Proyecto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 7. Acceder al Sistema

- **Portal Público:** http://localhost:5173
- **Panel Admin:** http://localhost:5173/admin/login
  - Usuario: `superadmin`
  - Contraseña: `superadmin123*`

## 📚 Documentación

Para instrucciones detalladas de instalación y configuración, consulta:
- **[MVP en Word](./docs/mvp/MVP-CMS-Latinoamerica-Comparte.docx)** - Documento final del MVP listo para entregar
- **[MVP](./docs/mvp/MVP.md)** - Entregable del Producto Mínimo Viable alineado con `MVP.docx`
- **[Diagramas MVP](./docs/mvp/diagramas.puml)** - Diagramas PlantUML de arquitectura, casos de uso, componentes, secuencia y actividad
- **[Gráficas MVP](./docs/mvp/graficas)** - Gráficas SVG incluidas en el documento Word
- **[Checklist de pruebas MVP](./docs/mvp/checklist-pruebas.md)** - Casos mínimos de validación funcional
- **[Backend README](./backend/README.md)** - Notas del API
- **[Frontend README](./frontend/README.md)** - Notas de la aplicación React

## 🎯 Funcionalidades Principales

### Gestión de Contenido
- ✅ Noticias por país (crear, editar, publicar, despublicar)
- ✅ Testimonios con destacados
- ✅ Solicitudes de contacto públicas
- ✅ Gestión de archivos/imágenes

### Administración
- ✅ Gestión de usuarios (SuperAdmin, Admin País, Editor)
- ✅ Bitácora de auditoría
- ✅ Dashboard con estadísticas
- ✅ Filtros por rol y país

### Seguridad
- ✅ Autenticación JWT
- ✅ Protección anti fuerza bruta
- ✅ Recuperación de contraseña con pregunta de seguridad
- ✅ Roles y permisos diferenciados

### Portal Público
- ✅ Vista de noticias por país
- ✅ Vista de testimonios por país
- ✅ Formulario de solicitudes
- ✅ Navegación entre países

## 👥 Roles del Sistema

### SuperAdmin
- Administra todo el sistema
- Gestiona usuarios
- Ve contenido de todos los países
- Accede a auditoría

### Admin País
- Administra contenido de su país asignado
- Gestiona solicitudes de su país
- No puede administrar usuarios

### Editor
- Crea y edita contenido de su país
- No puede eliminar contenido
- No gestiona solicitudes ni usuarios

## 🔧 Scripts Disponibles

### Backend
```bash
npm run dev          # Modo desarrollo con nodemon
npm start            # Modo producción
npm run create-superadmin    # Crear usuario superadmin
npm run create-test-users    # Crear usuarios de prueba
```

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## 📝 Variables de Entorno

### Backend (.env)
- `PORT` - Puerto del servidor (default: 3001)
- `SUPABASE_URL` - URL de tu proyecto Supabase
- `SUPABASE_ANON_KEY` - Clave anónima de Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Clave de servicio de Supabase
- `JWT_SECRET` - Secreto para firmar tokens JWT
- `JWT_EXPIRES_IN` - Tiempo de expiración del token

### Frontend (.env)
- `VITE_API_URL` - URL del backend API
- `VITE_PUBLIC_COUNTRY` - País por defecto para el portal público

## 🐛 Solución de Problemas

### Error de conexión al backend
- Verifica que el backend esté corriendo en el puerto 3001
- Revisa que `VITE_API_URL` en frontend/.env sea correcto

### Error de Supabase
- Verifica las credenciales en backend/.env
- Asegúrate de que todas las tablas estén creadas
- Verifica que RLS esté activado

### Error al instalar dependencias
```bash
# Limpia caché y reinstala
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licencia

Este proyecto es parte de un proyecto integrador académico.

## 👨‍💻 Autor

Proyecto Integrador CMS Multipaís - Santo Tomás

---

**¿Necesitas ayuda?** Consulta el archivo `INSTRUCCIONES_EJECUCION.md` para una guía detallada.
