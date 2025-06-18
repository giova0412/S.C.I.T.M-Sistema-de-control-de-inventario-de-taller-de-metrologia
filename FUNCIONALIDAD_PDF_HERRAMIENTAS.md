# 📄 Funcionalidad de Descarga de PDF Individual de Herramientas

## 🎯 Descripción
Se ha implementado una nueva funcionalidad que permite descargar un PDF individual de cada herramienta con toda su información, incluyendo estado de calibración, imagen y formato profesional.

## ✨ Características del PDF

### 📋 Información Incluida:
- **Logo de la empresa** (si existe en `src/uploads/image.png`)
- **Título del reporte** con fecha de generación
- **Imagen de la herramienta** (si existe)
- **Tabla detallada** con toda la información:
  - ID de Herramienta
  - Nombre de la Herramienta
  - Número de Partida
  - Número de Serie
  - Fecha de Registro
  - Departamento
  - Medida
  - Estado de Calibración
  - Calibración Activa (Sí/No)
  - Calibrado (Sí/No)
  - Fecha de Calibración (si existe)
- **Espacio para firma** del encargado

### 🎨 Formato:
- **Tamaño**: A4
- **Márgenes**: 30px
- **Fuente**: Helvetica
- **Colores**: Profesional y consistente con el sistema

## 🔧 Implementación Técnica

### Backend:
1. **Controlador**: `src/controllers/inventario.controller.js`
   - Función: `downloadHerramientaPDF`
   - Maneja la generación del PDF con PDFKit

2. **Ruta**: `src/routes/inventario.routes.js`
   - Endpoint: `GET /api/inventario/pdf/:id`
   - Parámetro: ID de la herramienta

3. **Dependencias**:
   - `pdfkit-table`: Para generar PDFs con tablas
   - `fs`: Para verificar existencia de archivos
   - `path`: Para manejo de rutas de archivos

### Frontend:
1. **Servicio**: `FrontEnd/src/api/herramientasService.js`
   - Función: `downloadPDF(id)`
   - Configuración: `responseType: 'blob'`

2. **Componente**: `FrontEnd/src/Herramientas.js`
   - Función: `handleDownloadReporte(herramienta)`
   - Botón: "Descargar" en cada tarjeta de herramienta

## 🚀 Cómo Usar

### Para el Usuario:
1. **Ir a la página de Herramientas**
2. **Buscar la herramienta** deseada
3. **Hacer clic en el botón "Descargar"** (icono de descarga)
4. **El PDF se descargará automáticamente** con el nombre `herramienta_[ID].pdf`

### Para el Desarrollador:
```javascript
// Ejemplo de uso programático
const blob = await herramientasService.downloadPDF(herramientaId);
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `herramienta_${herramientaId}.pdf`;
a.click();
```

## 📁 Estructura de Archivos

```
src/
├── controllers/
│   └── inventario.controller.js     # Función downloadHerramientaPDF
├── routes/
│   └── inventario.routes.js         # Ruta GET /pdf/:id
└── uploads/
    ├── image.png                    # Logo de la empresa (opcional)
    └── [imágenes de herramientas]   # Imágenes de herramientas

FrontEnd/src/
├── api/
│   └── herramientasService.js       # Función downloadPDF
└── Herramientas.js                  # Función handleDownloadReporte
```

## 🔍 Manejo de Errores

### Errores Comunes:
1. **Herramienta no encontrada**: Retorna 404
2. **Error de generación PDF**: Retorna 500
3. **Imagen no encontrada**: Continúa sin imagen
4. **Logo no encontrado**: Dibuja un rectángulo placeholder

### Logs de Depuración:
- Console.log de la herramienta recuperada
- Verificación de existencia de archivos
- Errores detallados en caso de fallo

## 🎨 Personalización

### Para Cambiar el Logo:
1. Colocar el archivo `image.png` en `src/uploads/`
2. El logo se mostrará automáticamente en todos los PDFs

### Para Modificar el Formato:
1. Editar la función `downloadHerramientaPDF` en el controlador
2. Ajustar tamaños, fuentes, colores según necesidades
3. Agregar o quitar campos de la tabla

### Para Cambiar el Nombre del Archivo:
```javascript
// En el controlador
res.setHeader('Content-Disposition', `attachment; filename=herramienta_${herramienta._id}.pdf`);

// En el frontend
a.download = `herramienta_${herramienta._id}.pdf`;
```

## ✅ Pruebas

### Casos de Prueba:
1. **Herramienta con imagen**: Verificar que la imagen aparezca en el PDF
2. **Herramienta sin imagen**: Verificar que el PDF se genere correctamente
3. **Herramienta calibrada**: Verificar que el estado se muestre correctamente
4. **Herramienta pendiente**: Verificar que el estado se muestre correctamente
5. **Herramienta con fecha de calibración**: Verificar que la fecha aparezca

### Verificación:
- El PDF se descarga correctamente
- La información es precisa y completa
- El formato es profesional y legible
- Las imágenes se muestran correctamente
- El logo aparece (si existe)

## 🔄 Actualizaciones Futuras

### Posibles Mejoras:
1. **Múltiples formatos**: PDF, Excel, Word
2. **Plantillas personalizables**: Diferentes estilos de PDF
3. **Filtros**: PDFs por departamento, estado, etc.
4. **Email**: Envío automático por correo
5. **Firma digital**: Integración con firmas electrónicas

## 📞 Soporte

Si hay problemas con la funcionalidad:
1. Verificar que el backend esté corriendo
2. Revisar los logs del servidor
3. Verificar que las dependencias estén instaladas
4. Comprobar que los archivos de imagen existan 