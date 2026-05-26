# 🔧 Backend - CMS Multipaís

API REST construida con Node.js, Express y Supabase para el sistema CMS Multipaís.

## 📋 Descripción

Backend que proporciona endpoints para autenticación, gestión de usuarios, noticias, testimonios, solicitudes de contacto y auditoría.

## 🏗️ Estructura

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Configuración cliente Supabase
│   ├── controllers/
│   │   ├── archivoController.js
│   │   ├── auditController.js
│   │   ├── authController.js
│   │   ├── noticiaController.js
│   │   ├── paisController.js
│   │   ├── publicController.js
│   │   ├── solicitudController.js
│   │   ├── testimonioController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Verificación JWT
│   │   └── uploadMiddleware.js  # Manejo de archivos
│   ├── routes/
│   │   ├── archivoRoutes.js
│   │   ├── auditRoutes.js
│   │   ├── authRoutes.js
│   │   ├── noticiaRoutes.js
│   │   ├── paisRoutes.js
│   │   ├── publicRoutes.js
│   │   ├── solicitudRoutes.js
│   │   ├── testimonioRoutes.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   ├── createSuperAdmin.js  # Script crear superadmin
│   │   └── createTestUsers.js   # Script crear usuarios prueba
│   ├── services/
│   │   ├── archivoService.js
│   │   ├── auditService.js
│   │   ├── authService.js
│   │   ├── noticiaService.js
│   │   ├── paisService.js
│   │   ├── publicService.js
│   │   ├── solicitudService.js
│   │   ├── testimonioService.js
│   │   └── userService.js
│   └── server.js                # Punto de entrada
├── .env                         # Variables de entorno
├── package.json
└── README.md
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

## ⚙️ Configuración

Crea el archivo `.env` con las siguientes variables:

```env
PORT=3001

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# JWT
JWT_SECRET=clave_super_segura_cms_multipais_santotomas_26
JWT_EXPIRES_IN=60m
```

## 📦 Scripts

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start

# Crear superadmin
npm run create-superadmin

# Crear usuarios de prueba
npm run create-test-users
```

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) para autenticación.

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "superadmin",
  "password": "superadmin123*"
}
```

### Usar Token
```http
GET /api/noticias
Authorization: Bearer <tu_token_jwt>
```

## 📚 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `PATCH /api/auth/me` - Actualizar mi perfil
- `PATCH /api/auth/change-my-password` - Cambiar contraseña
- `PATCH /api/auth/security-question` - Configurar pregunta seguridad
- `POST /api/auth/forgot-password` - Recuperar contraseña

### Usuarios (SuperAdmin)
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/:id` - Ver usuario
- `PUT /api/users/:id` - Actualizar usuario
- `PATCH /api/users/:id` - Actualizar parcial
- `DELETE /api/users/:id` - Desactivar usuario
- `DELETE /api/users/:id/permanent` - Eliminar definitivo

### Noticias
- `GET /api/noticias` - Listar noticias
- `POST /api/noticias` - Crear noticia
- `GET /api/noticias/:id` - Ver noticia
- `PUT /api/noticias/:id` - Actualizar noticia
- `PATCH /api/noticias/:id` - Actualizar parcial
- `PATCH /api/noticias/:id/estado` - Cambiar estado
- `DELETE /api/noticias/:id` - Eliminar noticia

### Testimonios
- `GET /api/testimonios` - Listar testimonios
- `POST /api/testimonios` - Crear testimonio
- `GET /api/testimonios/:id` - Ver testimonio
- `PUT /api/testimonios/:id` - Actualizar testimonio
- `PATCH /api/testimonios/:id` - Actualizar parcial
- `PATCH /api/testimonios/:id/estado` - Cambiar estado
- `DELETE /api/testimonios/:id` - Eliminar testimonio

### Solicitudes
- `POST /api/solicitudes/public` - Crear solicitud (público)
- `GET /api/solicitudes` - Listar solicitudes
- `GET /api/solicitudes/:id` - Ver solicitud
- `PUT /api/solicitudes/:id` - Actualizar solicitud
- `PATCH /api/solicitudes/:id` - Actualizar parcial
- `PATCH /api/solicitudes/:id/estado` - Cambiar estado
- `DELETE /api/solicitudes/:id` - Eliminar solicitud

### Auditoría (SuperAdmin)
- `GET /api/auditoria` - Listar auditoría
- `GET /api/auditoria/:id` - Ver detalle

### Públicas (sin autenticación)
- `GET /api/public/paises/:paisSlug/noticias` - Noticias publicadas
- `GET /api/public/paises/:paisSlug/noticias/:slug` - Detalle noticia
- `GET /api/public/paises/:paisSlug/testimonios` - Testimonios publicados
- `GET /api/public/paises/:paisSlug/testimonios/:id` - Detalle testimonio

## 🔒 Seguridad

### Protección Anti Fuerza Bruta
- Máximo 3 intentos fallidos de login
- Bloqueo temporal de 10 segundos
- Reset automático al login exitoso

### Roles y Permisos
- **SuperAdmin**: Acceso total al sistema
- **Admin País**: Gestiona contenido de su país
- **Editor**: Crea/edita contenido, no elimina

### Middleware de Autenticación
```javascript
// Proteger ruta
router.get('/ruta-protegida', verifyToken, controller);

// Proteger por rol
router.get('/admin-only', verifyToken, requireRole(['superadmin']), controller);
```

## 🗄️ Base de Datos

El sistema usa Supabase (PostgreSQL) con las siguientes tablas:

- `paises` - Países disponibles
- `roles` - Roles del sistema
- `usuarios` - Usuarios del sistema
- `noticias` - Noticias por país
- `testimonios` - Testimonios por país
- `solicitudes_contacto` - Solicitudes públicas
- `bitacora_auditoria` - Log de acciones
- `archivos` - Registro de archivos

## 📝 Auditoría

Todas las acciones importantes se registran automáticamente:

```javascript
await registrarAuditoria({
  usuario_id: req.user.id,
  accion: 'crear_noticia',
  modulo: 'noticias',
  registro_id: noticia.id,
  descripcion: `Noticia creada: ${noticia.titulo}`,
  ip: req.ip
});
```

## 🧪 Testing

### Probar con cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"superadmin123*"}'

# Listar noticias (con token)
curl http://localhost:3001/api/noticias \
  -H "Authorization: Bearer <tu_token>"
```

### Probar con Postman

1. Importa la colección de endpoints
2. Configura variable de entorno `baseUrl`: `http://localhost:3001/api`
3. Haz login y guarda el token
4. Usa el token en las demás peticiones

## 🐛 Debugging

```bash
# Ver logs en tiempo real
npm run dev

# Verificar conexión a Supabase
node -e "import('./src/config/supabase.js').then(m => console.log('OK'))"
```

## 📊 Dependencias

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.0.0",
    "bcryptjs": "^3.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^5.0.0",
    "jsonwebtoken": "^9.0.0",
    "multer": "^2.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

## 🚀 Despliegue

### Variables de Entorno en Producción

Asegúrate de configurar:
- `PORT` - Puerto del servidor
- `SUPABASE_URL` - URL de producción
- `SUPABASE_SERVICE_ROLE_KEY` - Key de producción
- `JWT_SECRET` - Secret seguro y único

### Recomendaciones

- Usa HTTPS en producción
- Configura CORS apropiadamente
- Usa variables de entorno seguras
- Implementa rate limiting
- Monitorea logs y errores

## 📞 Soporte

Para problemas o preguntas:
1. Revisa los logs del servidor
2. Verifica la conexión a Supabase
3. Consulta la documentación principal

---

**Puerto por defecto:** 3001  
**Documentación API:** Consulta los controladores en `src/controllers/`
