# 🧪 Guía de Pruebas en Postman - Funcionalidad de Imágenes

## 📋 Configuración Inicial

### 1. Variables de Entorno en Postman
Crea una nueva colección y configura estas variables:

| Variable | Valor |
|----------|-------|
| `base_url` | `http://localhost:3000` |
| `herramienta_id` | `12345` (se actualizará automáticamente) |
| `imagen_filename` | `imagen-1234567890.jpg` (se actualizará automáticamente) |

## 🚀 Pruebas Paso a Paso

### **Prueba 1: Crear Herramienta con Imagen**

**Configuración:**
- **Método**: `POST`
- **URL**: `{{base_url}}/api/inventario`

**Headers:**
- No configurar manualmente (Postman lo hace automáticamente)

**Body (form-data):**
```
id_herramienta: 12345
nombre_herramienta: Calibrador Digital
num_partida: 12345
numero_serie: 67890
fecha_r: 2024-01-15
dep: Metrología
medida: mm
calibrado: true
fecha_calibrado: 2024-01-15
imagen: [Seleccionar archivo] (Tipo: File)
```

**Pasos:**
1. Abre Postman
2. Crea nueva request
3. Selecciona método **POST**
4. URL: `{{base_url}}/api/inventario`
5. Pestaña **Body** → **form-data**
6. Agrega todos los campos de texto
7. Para `imagen`:
   - Key: `imagen`
   - Type: **File** (dropdown)
   - Value: **Select Files** → elige una imagen

**Respuesta esperada:**
```json
{
  "data": {
    "message": "Herramienta insertada correctamente"
  }
}
```

### **Prueba 2: Obtener Todas las Herramientas**

**Configuración:**
- **Método**: `GET`
- **URL**: `{{base_url}}/api/inventario`

**Pasos:**
1. Método: **GET**
2. URL: `{{base_url}}/api/inventario`
3. **Send**

**Respuesta esperada:**
```json
{
  "data": {
    "herramientas": [
      {
        "_id": 12345,
        "nombre_herramienta": "Calibrador Digital",
        "imagen_url": "http://localhost:3000/api/inventario/imagen/imagen-1234567890.jpg",
        // ... otros campos
      }
    ]
  }
}
```

### **Prueba 3: Obtener Herramienta Específica**

**Configuración:**
- **Método**: `GET`
- **URL**: `{{base_url}}/api/inventario/{{herramienta_id}}`

**Pasos:**
1. Método: **GET**
2. URL: `{{base_url}}/api/inventario/12345`
3. **Send**

### **Prueba 4: Actualizar Imagen**

**Configuración:**
- **Método**: `PUT`
- **URL**: `{{base_url}}/api/inventario/{{herramienta_id}}/imagen`

**Body (form-data):**
```
imagen: [Seleccionar nueva imagen] (Tipo: File)
```

**Pasos:**
1. Método: **PUT**
2. URL: `{{base_url}}/api/inventario/12345/imagen`
3. Body → form-data
4. Key: `imagen`, Type: **File**
5. Selecciona nueva imagen
6. **Send**

**Respuesta esperada:**
```json
{
  "data": {
    "message": "Imagen actualizada correctamente"
  }
}
```

### **Prueba 5: Ver Imagen Directamente**

**Configuración:**
- **Método**: `GET`
- **URL**: `{{base_url}}/api/inventario/imagen/{{imagen_filename}}`

**Pasos:**
1. Método: **GET**
2. URL: `{{base_url}}/api/inventario/imagen/imagen-1234567890.jpg`
3. **Send**
4. Deberías ver la imagen en la respuesta

## 🔧 Configuración Avanzada

### Scripts de Postman (Opcional)

**Para actualizar automáticamente las variables:**

En la pestaña **Tests** de "Crear Herramienta con Imagen":
```javascript
// Extraer ID de la herramienta creada
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.message) {
        // La herramienta se creó correctamente
        // Puedes hacer una llamada adicional para obtener el ID
        // o usar un ID predefinido para las siguientes pruebas
    }
}
```

## ⚠️ Casos de Error a Probar

### 1. **Sin ID de herramienta**
- Envía request sin campo `id_herramienta`
- Debería devolver error 400: "Se debe proporcionar un ID para la herramienta"

### 2. **Archivo no es imagen**
- Sube un archivo .txt o .pdf
- Debería devolver error 400

### 3. **Archivo muy grande**
- Sube una imagen de más de 5MB
- Debería devolver error 400

### 4. **Sin archivo de imagen**
- Envía request sin campo `imagen`
- Debería crear herramienta sin imagen

### 5. **ID inexistente**
- Usa un ID que no existe
- Debería devolver error 404

## 📱 Pruebas con cURL (Alternativa)

### Crear herramienta con imagen:
```bash
curl -X POST http://localhost:3000/api/inventario \
  -F "id_herramienta=12345" \
  -F "nombre_herramienta=Calibrador" \
  -F "num_partida=12345" \
  -F "numero_serie=67890" \
  -F "fecha_r=2024-01-15" \
  -F "dep=Metrología" \
  -F "medida=mm" \
  -F "calibrado=true" \
  -F "fecha_calibrado=2024-01-15" \
  -F "imagen=@/ruta/a/tu/imagen.jpg"
```

### Actualizar imagen:
```bash
curl -X PUT http://localhost:3000/api/inventario/12345/imagen \
  -F "imagen=@/ruta/a/nueva/imagen.jpg"
```

## ✅ Checklist de Pruebas

- [ ] Crear herramienta con imagen ✅
- [ ] Crear herramienta sin imagen ✅
- [ ] Crear herramienta sin ID (debe fallar) ❌
- [ ] Obtener todas las herramientas (con URLs) ✅
- [ ] Obtener herramienta específica ✅
- [ ] Actualizar imagen de herramienta existente ✅
- [ ] Ver imagen directamente ✅
- [ ] Probar con archivo no válido ❌
- [ ] Probar con archivo muy grande ❌
- [ ] Probar con ID inexistente ❌

## 🎯 Consejos

1. **ID obligatorio**: Siempre incluye `id_herramienta` en tus requests
2. **IDs únicos**: Usa IDs diferentes para cada herramienta
3. **Imágenes de prueba**: Usa imágenes pequeñas (< 1MB) para pruebas rápidas
4. **Formatos soportados**: JPG, PNG, GIF, WebP, SVG
5. **URLs**: Las URLs se construyen automáticamente con el host completo
6. **Variables**: Actualiza las variables de Postman según las respuestas
7. **Backup**: Guarda las imágenes originales antes de hacer pruebas 