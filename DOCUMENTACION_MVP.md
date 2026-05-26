# Documentacion MVP - CMS Multipais

## Estado

Documento provisional mientras se comparte el `template.docx` definitivo.

## Alcance MVP

- Portal publico multipais para noticias, testimonios y solicitudes.
- Panel administrativo con autenticacion, gestion de contenido y auditoria.
- Carga de imagenes y archivos mediante backend, Supabase Storage y tabla `archivos`.
- Branding visual con logo de Latinoamerica Comparte y logos por pais.

## Requisitos antes de correr backend

Desde `backend/`:

```bash
npm install multer
```

En este repositorio `multer` ya esta registrado en `backend/package.json`.

## Ajuste requerido en Supabase

Ejecutar en SQL Editor si la tabla `archivos` ya existe sin columnas de Storage:

```sql
alter table public.archivos
add column if not exists bucket text default 'cms-media',
add column if not exists storage_path text;
```

## Validaciones realizadas

- El frontend compila correctamente con `npm run build`.
- El lint del frontend pasa con `npm run lint`.
- `multer@2.1.1` esta instalado en backend.
- El backend ya usa `bucket` y `storage_path` en el servicio de archivos.
