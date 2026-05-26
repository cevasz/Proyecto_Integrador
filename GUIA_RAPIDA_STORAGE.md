# 🚀 Guía Rápida: Usar Storage para Imágenes

## ⚡ Configuración en 3 Pasos

### 1️⃣ Crear Bucket (2 minutos)

1. Ve a Supabase → **Storage**
2. Click **"New bucket"**
3. Configura:
   - Name: `cms-media`
   - Public: ✅ **SÍ**
4. Click **"Create"**

---

### 2️⃣ Configurar Permisos (3 minutos)

Ve a Storage → cms-media → **Policies** → **New policy**

**Crea estas 4 políticas:**

#### Política 1: Lectura Pública
```sql
CREATE POLICY "Public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'cms-media');
```

#### Política 2: Subir Archivos
```sql
CREATE POLICY "Auth upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cms-media');
```

#### Política 3: Actualizar Archivos
```sql
CREATE POLICY "Auth update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'cms-media');
```

#### Política 4: Eliminar Archivos
```sql
CREATE POLICY "Auth delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'cms-media');
```

---

### 3️⃣ ¡Listo! Ahora Puedes Usar

---

## 🎯 Cómo Usar en tu Aplicación

### Opción 1: URL Externa (Más Fácil)

Cuando crees una noticia o testimonio, simplemente pega una URL:

```
https://ejemplo.com/imagen.jpg
```

**Ventajas:**
- ✅ Rápido
- ✅ No necesitas configurar nada

**Desventajas:**
- ❌ Dependes de un servicio externo
- ❌ La imagen puede desaparecer

---

### Opción 2: Subir a Supabase Storage (Recomendado)

#### A. Desde Postman/API

**Subir imagen a noticia:**

```http
PATCH http://localhost:3001/api/noticias/1/imagen
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

Body (form-data):
- file: [selecciona tu imagen]
```

**Subir foto a testimonio:**

```http
PATCH http://localhost:3001/api/testimonios/1/foto
Authorization: Bearer <tu_token>
Content-Type: multipart/form-data

Body (form-data):
- file: [selecciona tu foto]
```

#### B. Desde el Frontend (Futuro)

En el formulario de crear/editar noticia:

```jsx
<input 
  type="file" 
  accept="image/*"
  onChange={handleImageUpload}
/>
```

---

## 📸 Ejemplo Práctico

### Crear Noticia con Imagen

**Paso 1: Crear la noticia**
```bash
curl -X POST http://localhost:3001/api/noticias \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pais_id": 1,
    "titulo": "Mi primera noticia",
    "resumen": "Resumen...",
    "contenido": "Contenido...",
    "estado": "borrador"
  }'
```

**Respuesta:**
```json
{
  "noticia": { "id": 5 }
}
```

**Paso 2: Subir imagen**
```bash
curl -X PATCH http://localhost:3001/api/noticias/5/imagen \
  -H "Authorization: Bearer <token>" \
  -F "file=@/ruta/a/imagen.jpg"
```

**Respuesta:**
```json
{
  "message": "Imagen actualizada",
  "url": "https://...supabase.co/storage/v1/object/public/cms-media/noticias/123-imagen.jpg"
}
```

---

## 🔗 URLs Generadas

Las URLs tienen este formato:

```
https://wyfujgslwxmmjzicxegj.supabase.co/storage/v1/object/public/cms-media/{carpeta}/{archivo}
```

**Ejemplos:**
```
.../cms-media/noticias/1234567890-portada.jpg
.../cms-media/testimonios/1234567891-foto.png
.../cms-media/general/1234567892-documento.pdf
```

---

## 📁 Organización de Archivos

```
cms-media/
├── noticias/          ← Imágenes de noticias
├── testimonios/       ← Fotos de testimonios
└── general/           ← Otros archivos
```

---

## ✅ Ventajas del Storage

| Característica | URL Externa | Supabase Storage |
|----------------|-------------|------------------|
| Control total | ❌ | ✅ |
| Siempre disponible | ❌ | ✅ |
| Rápido (CDN) | Depende | ✅ |
| Integrado | ❌ | ✅ |
| Gratis (1GB) | Depende | ✅ |

---

## 🎨 Tipos de Archivo Soportados

### Imágenes:
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF

### Documentos:
- ✅ PDF

**Tamaño máximo:** 5 MB

---

## 🐛 Problemas Comunes

### "Bucket not found"
→ Crea el bucket `cms-media`

### "Permission denied"
→ Configura las 4 políticas RLS

### "File too large"
→ Reduce el tamaño de la imagen (máx 5 MB)

### La imagen no se ve
→ Verifica que el bucket sea público

---

## 🎯 Resumen

1. **Crear bucket** `cms-media` (público)
2. **Configurar 4 políticas** RLS
3. **Usar endpoints** para subir archivos
4. **Obtener URL** automáticamente

---

## 📚 Más Información

Ver archivo completo: `CONFIGURAR_STORAGE.md`

---

**¿Listo para probar?** Crea el bucket y empieza a subir imágenes! 🚀
