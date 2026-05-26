# 📦 Configurar Supabase Storage para Imágenes

## ¿Qué es Supabase Storage?

Supabase Storage es un servicio de almacenamiento de archivos que te permite:
- Subir imágenes para noticias y testimonios
- Almacenar PDFs y documentos
- Obtener URLs públicas automáticamente
- Gestionar archivos desde tu aplicación

---

## 🚀 Paso 1: Crear el Bucket

### A. Ir a Storage en Supabase

1. Abre tu proyecto en Supabase: https://supabase.com
2. En la barra lateral, click en **Storage** (icono de carpeta)
3. Click en el botón **"New bucket"**

### B. Configurar el Bucket

**Configuración:**
- **Name:** `cms-media`
- **Public bucket:** ✅ **Activado** (importante)
- **File size limit:** 50 MB (o el que prefieras)
- **Allowed MIME types:** Dejar vacío (permite todos)

4. Click en **"Create bucket"**

### C. Verificar que se creó

Deberías ver el bucket `cms-media` en la lista de buckets.

---

## 🔐 Paso 2: Configurar Políticas de Acceso (RLS)

Para que tu aplicación pueda subir y leer archivos, necesitas configurar políticas.

### A. Ir a Políticas del Bucket

1. En Storage, click en el bucket `cms-media`
2. Click en **"Policies"** (o "Configuration" → "Policies")
3. Click en **"New policy"**

### B. Crear Política de Lectura (SELECT)

**Política 1: Permitir lectura pública**

```sql
-- Nombre: Public read access
-- Operación: SELECT
-- Target roles: public

CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cms-media');
```

O desde la interfaz:
- **Policy name:** Public read access
- **Allowed operation:** SELECT
- **Target roles:** public
- **USING expression:** `bucket_id = 'cms-media'`

### C. Crear Política de Escritura (INSERT)

**Política 2: Permitir subida autenticada**

```sql
-- Nombre: Authenticated users can upload
-- Operación: INSERT
-- Target roles: authenticated

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cms-media');
```

O desde la interfaz:
- **Policy name:** Authenticated users can upload
- **Allowed operation:** INSERT
- **Target roles:** authenticated
- **WITH CHECK expression:** `bucket_id = 'cms-media'`

### D. Crear Política de Actualización (UPDATE)

**Política 3: Permitir actualización autenticada**

```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'cms-media')
WITH CHECK (bucket_id = 'cms-media');
```

### E. Crear Política de Eliminación (DELETE)

**Política 4: Permitir eliminación autenticada**

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'cms-media');
```

---

## ✅ Verificar Configuración

### Opción A: Desde SQL Editor

Ejecuta este query para ver las políticas:

```sql
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';
```

### Opción B: Desde la Interfaz

1. Ve a Storage → cms-media → Policies
2. Deberías ver 4 políticas:
   - ✅ Public read access
   - ✅ Authenticated users can upload
   - ✅ Authenticated users can update
   - ✅ Authenticated users can delete

---

## 🎯 Cómo Usar el Storage en tu Aplicación

### 1. Subir Imagen para Noticia

**Desde el Panel Admin:**

1. Ve a **Noticias** → **Crear Noticia**
2. Llena el formulario
3. En **"Imagen Principal"**, tienes dos opciones:

   **Opción A: URL Externa**
   ```
   https://ejemplo.com/imagen.jpg
   ```

   **Opción B: Subir Archivo** (si está implementado)
   - Click en "Subir imagen"
   - Selecciona el archivo
   - Se sube automáticamente a Supabase Storage
   - La URL se genera automáticamente

### 2. Subir Foto para Testimonio

Similar al proceso de noticias:

1. Ve a **Testimonios** → **Crear Testimonio**
2. En **"Foto"**, puedes:
   - Pegar una URL externa
   - O subir un archivo (si está implementado)

---

## 📡 Endpoints de la API para Archivos

Tu backend ya tiene endpoints configurados para manejar archivos:

### A. Subir Archivo General

```http
POST /api/archivos/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body (form-data):
- file: [archivo]
- modulo: "noticias" | "testimonios" | "general"
- referencia_id: 1
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3001/api/archivos/upload \
  -H "Authorization: Bearer <tu_token>" \
  -F "file=@/ruta/a/imagen.jpg" \
  -F "modulo=noticias" \
  -F "referencia_id=1"
```

### B. Subir Imagen Directamente a Noticia

```http
PATCH /api/noticias/:id/imagen
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body (form-data):
- file: [archivo]
```

### C. Subir Foto Directamente a Testimonio

```http
PATCH /api/testimonios/:id/foto
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body (form-data):
- file: [archivo]
```

---

## 🖼️ Estructura de Archivos en el Bucket

Los archivos se organizan así:

```
cms-media/
├── noticias/
│   ├── 1234567890-imagen1.jpg
│   ├── 1234567891-imagen2.png
│   └── ...
├── testimonios/
│   ├── 1234567892-foto1.jpg
│   ├── 1234567893-foto2.png
│   └── ...
└── general/
    ├── 1234567894-documento.pdf
    └── ...
```

**Formato del nombre:**
```
{timestamp}-{nombre_original}
```

---

## 🔗 Obtener URL Pública de un Archivo

Una vez subido, la URL pública será:

```
https://wyfujgslwxmmjzicxegj.supabase.co/storage/v1/object/public/cms-media/noticias/1234567890-imagen.jpg
```

Esta URL se guarda automáticamente en la base de datos.

---

## 📝 Ejemplo Completo: Crear Noticia con Imagen

### Paso 1: Crear la noticia

```http
POST /api/noticias
Authorization: Bearer <token>
Content-Type: application/json

{
  "pais_id": 1,
  "titulo": "Nueva noticia con imagen",
  "resumen": "Resumen de la noticia",
  "contenido": "Contenido completo...",
  "estado": "borrador"
}
```

**Respuesta:**
```json
{
  "message": "Noticia creada correctamente",
  "noticia": {
    "id": 5
  }
}
```

### Paso 2: Subir imagen a la noticia

```http
PATCH /api/noticias/5/imagen
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- file: imagen.jpg
```

**Respuesta:**
```json
{
  "message": "Imagen actualizada correctamente",
  "url": "https://wyfujgslwxmmjzicxegj.supabase.co/storage/v1/object/public/cms-media/noticias/1234567890-imagen.jpg"
}
```

---

## 🎨 Tipos de Archivos Permitidos

El sistema acepta:

### Imágenes:
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ WebP (.webp)
- ✅ GIF (.gif)

### Documentos:
- ✅ PDF (.pdf)

**Tamaño máximo:** 5 MB (configurable en `uploadMiddleware.js`)

---

## 🔧 Configuración Avanzada

### Cambiar Tamaño Máximo de Archivo

Edita `backend/src/middlewares/uploadMiddleware.js`:

```javascript
export const uploadSingleFile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024  // 10 MB
  }
}).single('file');
```

### Agregar Más Tipos de Archivo

Edita `backend/src/middlewares/uploadMiddleware.js`:

```javascript
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',  // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  // .docx
];
```

---

## 🐛 Solución de Problemas

### Error: "Bucket not found"
- Verifica que el bucket `cms-media` esté creado
- Verifica que sea público

### Error: "Permission denied"
- Verifica las políticas RLS
- Asegúrate de que las 4 políticas estén creadas

### Error: "File too large"
- Verifica el límite en `uploadMiddleware.js`
- Verifica el límite en Supabase (Settings → Storage)

### La imagen no se muestra
- Verifica que el bucket sea público
- Verifica la URL en la base de datos
- Abre la URL directamente en el navegador

---

## ✅ Checklist de Configuración

- [ ] Bucket `cms-media` creado
- [ ] Bucket configurado como público
- [ ] Política de lectura pública creada
- [ ] Política de escritura autenticada creada
- [ ] Política de actualización creada
- [ ] Política de eliminación creada
- [ ] Probado subir un archivo de prueba

---

## 🎯 Ventajas de Usar Supabase Storage

1. ✅ **Integrado:** Todo en un solo lugar (DB + Storage)
2. ✅ **Rápido:** CDN global de Supabase
3. ✅ **Seguro:** Control de acceso con RLS
4. ✅ **Escalable:** Crece con tu aplicación
5. ✅ **Económico:** Plan gratuito generoso

---

## 📚 Recursos Adicionales

- **Documentación oficial:** https://supabase.com/docs/guides/storage
- **Límites del plan gratuito:** 1 GB de almacenamiento
- **Límites de transferencia:** 2 GB/mes

---

**¿Necesitas ayuda?** Consulta la documentación o pregunta en el chat.
