# MVP - CMS Multipais Latinoamerica Comparte

## Contexto Del Proyecto

**Espacio academico:** Construccion de Software  
**Reto territorial:** Latinoamerica Comparte  
**Producto:** CMS multipais para administracion y publicacion de contenidos por pais.

El proyecto responde a la necesidad de centralizar la gestion de noticias,
testimonios y solicitudes de contacto de una iniciativa regional, permitiendo
que cada pais administre su contenido sin afectar la informacion de otros
paises.

## Necesidad Identificada

Latinoamerica Comparte requiere una plataforma web que permita publicar
contenido institucional por pais, recibir solicitudes desde el portal publico y
administrar usuarios con permisos diferenciados. Sin un CMS multipais, la
gestion de informacion queda dispersa, depende de procesos manuales y dificulta
la trazabilidad de cambios.

## Justificacion Del Sistema

El sistema propuesto reduce la carga operativa de administracion de contenido,
mejora la consistencia de la informacion publica y habilita control por roles.
El uso de React, Express y Supabase permite construir un prototipo full stack
funcional con autenticacion, base de datos, API REST y despliegue incremental.

## Alcance Inicial Del MVP

El MVP se ubica en **TRL 5 - Validacion en entorno relevante**: el software
integra frontend, backend, autenticacion, base de datos Supabase, API REST y
flujos cercanos al uso real por administradores y visitantes.

Incluye:

- Portal publico por pais.
- Listado y detalle de noticias publicadas.
- Listado y detalle de testimonios publicados.
- Formulario publico de solicitudes/contacto.
- Login administrativo con JWT.
- Roles: `superadmin`, `admin_pais`, `editor`.
- Panel administrativo.
- CRUD de noticias.
- CRUD de testimonios.
- Gestion de solicitudes.
- Gestion de usuarios para superadmin.
- Auditoria de acciones relevantes.
- Carga de imagenes/archivos mediante Supabase Storage.

Fuera del alcance del MVP:

- Automatizacion editorial avanzada.
- Analitica de trafico.
- Notificaciones por correo.
- Flujos de aprobacion multietapa.
- Multilenguaje completo.
- Despliegue productivo certificado.

## Objetivo General

Desarrollar un CMS multipais funcional que permita gestionar contenido publico
y solicitudes de contacto por pais, con autenticacion, control de roles y una
API REST conectada a Supabase.

## Descripcion Del Problema

La organizacion necesita publicar informacion para varios paises y mantener
separados los permisos de administracion. El manejo manual de contenidos genera
duplicidad, baja trazabilidad y dificultad para controlar quien puede crear,
editar, publicar o eliminar informacion.

## Propuesta De Solucion

El sistema ofrece un portal publico y un panel administrativo. El portal permite
consultar noticias y testimonios por pais, ademas de enviar solicitudes. El
panel administrativo permite que usuarios autenticados gestionen contenido de
acuerdo con su rol.

## Usuarios Involucrados Y RBAC

| Rol | Permisos principales |
| --- | --- |
| Visitante | Consulta noticias/testimonios publicados y envia solicitudes. |
| Editor | Crea, edita y cambia estado de noticias/testimonios de su pais. |
| Admin Pais | Gestiona contenido y solicitudes de su pais. Puede eliminar contenido de su alcance. |
| Superadmin | Administra todos los paises, usuarios, auditoria, contenido y solicitudes. |

## Beneficios Esperados

- Administracion centralizada de contenido regional.
- Separacion de permisos por rol.
- Reduccion de procesos manuales.
- Trazabilidad mediante bitacora de auditoria.
- Experiencia publica organizada por pais.
- Base tecnica extensible para nuevas funcionalidades.

## Arquitectura Del Sistema

El MVP usa una arquitectura full stack:

- **Frontend:** React 18 + Vite + React Router + Bootstrap.
- **Backend:** Node.js + Express.
- **Base de datos:** Supabase PostgreSQL.
- **Storage:** Supabase Storage para imagenes y archivos.
- **API:** REST JSON bajo `/api`.
- **Autenticacion:** JWT con middleware de verificacion.
- **Autorizacion:** RBAC con middleware `authorizeRoles`.

Flujo general:

1. El visitante consume rutas publicas desde React.
2. React llama la API Express mediante Axios.
3. Express consulta Supabase y retorna JSON.
4. El administrador inicia sesion y recibe un JWT.
5. Las rutas privadas validan token y rol antes de ejecutar operaciones.

## Modulos Del MVP

| Modulo | Estado | Evidencia en codigo |
| --- | --- | --- |
| Portal publico | Implementado | `frontend/src/pages/public` |
| Autenticacion | Implementado | `backend/src/routes/authRoutes.js` |
| RBAC | Implementado | `backend/src/middlewares/authMiddleware.js` |
| Noticias | Implementado | `backend/src/routes/noticiaRoutes.js` |
| Testimonios | Implementado | `backend/src/routes/testimonioRoutes.js` |
| Solicitudes | Implementado | `backend/src/routes/solicitudRoutes.js` |
| Usuarios | Implementado | `backend/src/routes/userRoutes.js` |
| Auditoria | Implementado | `backend/src/routes/auditRoutes.js` |
| Archivos | Implementado | `backend/src/routes/archivoRoutes.js` |
| Dashboard | Implementado | `frontend/src/pages/admin/DashboardPage.jsx` |

## Requerimientos Funcionales

| ID | Requerimiento | Prioridad | Estado |
| --- | --- | --- | --- |
| RF-01 | El sistema permite iniciar sesion de administradores. | Alta | Implementado |
| RF-02 | El sistema bloquea temporalmente usuarios tras intentos fallidos. | Alta | Implementado |
| RF-03 | El sistema permite recuperar contrasena con pregunta de seguridad. | Media | Implementado |
| RF-04 | El sistema permite listar noticias publicas por pais. | Alta | Implementado |
| RF-05 | El sistema permite ver detalle de noticia publica. | Alta | Implementado |
| RF-06 | El sistema permite CRUD de noticias desde el panel. | Alta | Implementado |
| RF-07 | El sistema permite publicar/despublicar noticias. | Alta | Implementado |
| RF-08 | El sistema permite CRUD de testimonios desde el panel. | Alta | Implementado |
| RF-09 | El sistema permite publicar/despublicar testimonios. | Alta | Implementado |
| RF-10 | El sistema permite enviar solicitudes publicas. | Alta | Implementado |
| RF-11 | El sistema permite gestionar solicitudes en el panel. | Alta | Implementado |
| RF-12 | El sistema permite gestionar usuarios. | Alta | Implementado para superadmin |
| RF-13 | El sistema restringe rutas por rol. | Alta | Implementado |
| RF-14 | El sistema registra acciones en auditoria. | Media | Implementado |
| RF-15 | El sistema permite cargar imagenes para contenido. | Media | Implementado |

## Requerimientos No Funcionales

| ID | Requerimiento | Criterio MVP |
| --- | --- | --- |
| RNF-01 | Seguridad | JWT, hash de contrasenas, RBAC y bloqueo temporal. |
| RNF-02 | Usabilidad | Panel administrativo con navegacion lateral y formularios separados. |
| RNF-03 | Responsividad | Interfaz basada en Bootstrap y CSS responsive. |
| RNF-04 | Mantenibilidad | Separacion por rutas, controladores, servicios y componentes React. |
| RNF-05 | Escalabilidad | Separacion multipais mediante tabla `paises` y roles. |
| RNF-06 | Disponibilidad | Backend stateless conectado a Supabase. |
| RNF-07 | Trazabilidad | Registro de eventos en `bitacora_auditoria`. |

## Diseno De Base De Datos

Tablas principales inferidas del backend:

- `paises`: paises disponibles para el portal.
- `roles`: roles administrativos.
- `usuarios`: usuarios del panel, credenciales y relacion con rol/pais.
- `noticias`: contenido informativo por pais.
- `testimonios`: testimonios por pais.
- `solicitudes_contacto`: solicitudes enviadas desde el portal publico.
- `archivos`: metadatos de archivos cargados.
- `bitacora_auditoria`: registro de acciones administrativas.

Relaciones clave:

- `usuarios.rol_id` -> `roles.id`
- `usuarios.pais_id` -> `paises.id`
- `noticias.pais_id` -> `paises.id`
- `testimonios.pais_id` -> `paises.id`
- `solicitudes_contacto.pais_id` -> `paises.id`
- `archivos.usuario_id` -> `usuarios.id`

## Diseno UI/UX

Pantallas publicas:

- Home regional con selector de pais.
- Noticias publicas por pais.
- Detalle de noticia.
- Testimonios publicos por pais.
- Detalle de testimonio.
- Formulario de solicitud/contacto.

Pantallas administrativas:

- Login.
- Recuperacion de contrasena.
- Dashboard.
- Noticias.
- Formulario de noticia.
- Testimonios.
- Formulario de testimonio.
- Solicitudes.
- Usuarios.
- Auditoria.
- Perfil, cambio de contrasena y pregunta de seguridad.

## Pruebas Del MVP

Pruebas funcionales minimas:

1. `GET /` responde estado de API.
2. `POST /api/auth/login` autentica superadmin.
3. `GET /api/noticias` rechaza peticiones sin token.
4. `GET /api/public/paises/argentina/noticias` lista contenido publico.
5. `POST /api/solicitudes/public` crea una solicitud.
6. `GET /api/users` solo permite rol `superadmin`.
7. `GET /api/auditoria` permite `superadmin` y `admin_pais`.
8. `PATCH /api/noticias/:id/estado` cambia estado de publicacion.
9. `PATCH /api/testimonios/:id/estado` cambia estado de publicacion.
10. `npm run build` compila el frontend.

## Resultados Obtenidos

Se obtuvo un prototipo full stack con portal publico, panel administrativo,
autenticacion, autorizacion por roles, gestion de contenido, solicitudes,
auditoria y conexion a Supabase. El sistema permite validar la viabilidad del
CMS multipais en un escenario cercano al real.

## Retos Encontrados

El principal reto fue integrar permisos por rol y pais manteniendo una
estructura sencilla. Tambien fue necesario separar rutas publicas y privadas,
centralizar el cliente HTTP del frontend y mantener la API alineada con el
modelo de datos de Supabase.

## Retos Alcanzados

Se logro una arquitectura funcional con modulos separados, rutas protegidas,
pantallas administrativas y consumo de API desde React. El MVP permite probar
los flujos principales de administracion y consulta publica.

## Aprendizajes Tecnicos

El desarrollo permitio aplicar arquitectura full stack, consumo de APIs REST,
autenticacion JWT, autorizacion RBAC, integracion con BaaS, manejo de formularios
en React y separacion de responsabilidades entre rutas, controladores y
servicios.

