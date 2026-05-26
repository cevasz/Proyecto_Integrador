# Checklist De Pruebas MVP

## Preparacion

- Backend configurado con `backend/.env`.
- Frontend configurado con `frontend/.env`.
- Tablas y datos base creados en Supabase.
- Usuario `superadmin` creado con `npm run create-superadmin`.
- Backend corriendo en `http://localhost:3001`.
- Frontend corriendo en `http://localhost:5173`.

## Smoke Tests Backend

| Caso | Metodo/Ruta | Resultado esperado |
| --- | --- | --- |
| API viva | `GET /` | Mensaje de API funcionando. |
| Login correcto | `POST /api/auth/login` | Retorna `token` y `user`. |
| Ruta privada sin token | `GET /api/noticias` | HTTP 401. |
| Noticias publicas | `GET /api/public/paises/argentina/noticias` | Lista JSON. |
| Testimonios publicos | `GET /api/public/paises/argentina/testimonios` | Lista JSON. |
| Solicitud publica | `POST /api/solicitudes/public` | Solicitud creada. |
| Usuarios con superadmin | `GET /api/users` | Lista usuarios. |
| Usuarios con editor | `GET /api/users` | HTTP 403. |
| Auditoria | `GET /api/auditoria` | Lista registros para roles autorizados. |

## Smoke Tests Frontend

| Caso | Pantalla | Resultado esperado |
| --- | --- | --- |
| Home publica | `/` | Muestra selector de paises. |
| Noticias pais | `/paises/argentina/noticias` | Muestra noticias publicadas o estado vacio. |
| Testimonios pais | `/paises/argentina/testimonios` | Muestra testimonios publicados o estado vacio. |
| Solicitud publica | `/paises/argentina/solicitudes` | Permite enviar formulario. |
| Login admin | `/admin/login` | Permite iniciar sesion. |
| Dashboard | `/admin/dashboard` | Muestra resumen del panel. |
| Noticias admin | `/admin/noticias` | Permite listar y gestionar noticias. |
| Testimonios admin | `/admin/testimonios` | Permite listar y gestionar testimonios. |
| Solicitudes admin | `/admin/solicitudes` | Visible para superadmin/admin_pais. |
| Usuarios admin | `/admin/users` | Visible solo para superadmin. |

## Comandos De Verificacion

```bash
cd backend
npm start
```

```bash
cd frontend
npm run build
```

```bash
cd frontend
npm run lint
```

## Evidencias Recomendadas Para El Documento

- Captura del home publico.
- Captura del listado de noticias por pais.
- Captura del formulario de solicitudes.
- Captura del login.
- Captura del dashboard.
- Captura de CRUD de noticias.
- Captura de CRUD de testimonios.
- Captura de gestion de usuarios.
- Captura de auditoria.
- Captura de Postman o navegador con respuesta `GET /`.

