# Funcionalidad de Subida de Imágenes - Inventario

## Descripción
Se ha implementado la funcionalidad para subir y mostrar imágenes de las herramientas en el inventario. Las imágenes se almacenan en la carpeta `src/uploads/` y se sirven a través de una ruta específica.

## Características
- ✅ Subida de imágenes al crear una nueva herramienta
- ✅ Actualización de imagen para herramientas existentes
- ✅ Visualización de imágenes en las respuestas GET
- ✅ Validación de tipos de archivo (solo imágenes)
- ✅ Límite de tamaño de archivo (5MB)
- ✅ Nombres únicos para evitar conflictos

## Endpoints Disponibles

### 1. Crear Herramienta con Imagen
**POST** `/api/inventario`
- **Content-Type**: `multipart/form-data`
- **Campo de imagen**: `imagen`
- **Otros campos**: Todos los campos normales de la herramienta

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/inventario \
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

**Respuesta:**
```json
{
  "data": {
    "message": "Herramienta insertada correctamente"
  }
}
```

### 2. Actualizar Imagen de Herramienta Existente
**PUT** `/api/inventario/:id/imagen`
- **Content-Type**: `multipart/form-data`
- **Campo de imagen**: `imagen`

**Ejemplo con cURL:**
```bash
curl -X PUT http://localhost:3000/api/inventario/12345/imagen \
  -F "imagen=@/ruta/a/nueva/imagen.jpg"
```

**Respuesta:**
```json
{
  "data": {
    "message": "Imagen actualizada correctamente"
  }
}
```

### 3. Obtener Todas las Herramientas (con URLs de imágenes)
**GET** `/api/inventario`
- Retorna todas las herramientas con URLs completas de las imágenes

### 4. Obtener Herramienta Específica (con URL de imagen)
**GET** `/api/inventario/:id`
- Retorna la herramienta específica con URL completa de la imagen

### 5. Servir Imagen
**GET** `/api/inventario/imagen/:filename`
- Sirve la imagen directamente desde el servidor

## Estructura de Respuesta

### GET /api/inventario
```json
{
  "data": {
    "herramientas": [
      {
        "_id": 12345,
        "nombre_herramienta": "Calibrador",
        "num_partida": 12345,
        "numero_serie": 67890,
        "fecha_r": "2024-01-15T00:00:00.000Z",
        "dep": "Metrología",
        "medida": "mm",
        "calibrado": true,
        "fecha_calibrado": "2024-01-15T00:00:00.000Z",
        "imagen_url": "http://localhost:3000/api/inventario/imagen/imagen-1234567890.jpg"
      }
    ]
  }
}
```

## Tipos de Archivo Permitidos
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

## Límites
- **Tamaño máximo**: 5MB por imagen
- **Tipos permitidos**: Solo archivos de imagen

## Manejo de Errores
- Si se intenta subir un archivo que no es imagen, se devuelve error 400
- Si el archivo excede el tamaño límite, se devuelve error 400
- Si no se proporciona imagen en rutas que la requieren, se devuelve error 400

## Notas Importantes
1. Las imágenes se almacenan en `src/uploads/`
2. Los nombres de archivo se generan automáticamente para evitar conflictos
3. Las URLs de las imágenes se construyen automáticamente en las respuestas
4. La funcionalidad es opcional - las herramientas pueden existir sin imágenes 