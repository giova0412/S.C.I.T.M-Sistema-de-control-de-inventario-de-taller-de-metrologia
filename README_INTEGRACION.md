# Integración Frontend-Backend - Sistema de Control de Inventario

## Resumen de Cambios Realizados

### 1. Configuración del Backend

**Archivo modificado: `src/app.js`**
- ✅ Agregada configuración de CORS para permitir peticiones desde el frontend
- ✅ Configurado para aceptar peticiones desde `http://localhost:5173` (React) y `http://localhost:3000` (Backend)
- ✅ Habilitados métodos HTTP: GET, POST, PUT, DELETE, OPTIONS
- ✅ Configurados headers permitidos: Content-Type, Authorization

### 2. Configuración del Frontend

**Archivos creados:**
- ✅ `FrontEnd/src/api/axios.js` - Configuración centralizada de axios
- ✅ `FrontEnd/src/api/herramientasService.js` - Servicio para operaciones CRUD de herramientas
- ✅ `FrontEnd/src/api/reportesService.js` - Servicio para operaciones CRUD de reportes

**Archivos modificados:**
- ✅ `FrontEnd/src/Herramientas.js` - Integrado con el servicio de API
- ✅ `FrontEnd/src/Reportes.js` - Integrado con el servicio de API

### 3. Funcionalidades Implementadas

**Herramientas:**
- ✅ Carga de herramientas desde el backend
- ✅ Creación de nuevas herramientas con imágenes
- ✅ Edición de herramientas existentes
- ✅ Eliminación de herramientas
- ✅ Actualización de estado de calibración
- ✅ Búsqueda y filtrado
- ✅ Manejo de errores y estados de carga

**Reportes:**
- ✅ Carga de reportes desde el backend
- ✅ Creación de nuevos reportes
- ✅ Edición de reportes existentes
- ✅ Eliminación de reportes
- ✅ Descarga de PDF de todos los reportes
- ✅ Búsqueda y filtrado por estado
- ✅ Manejo de errores y estados de carga

## Instrucciones de Ejecución

### Paso 1: Ejecutar el Backend

1. **Navegar al directorio del backend:**
   ```bash
   cd src/
   ```

2. **Instalar dependencias (si no están instaladas):**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Verificar que el servidor esté corriendo:**
   - Deberías ver: `Servidor corriendo en http://localhost:3000`
   - Deberías ver: `conexion a mongo lista 👍`

### Paso 2: Ejecutar el Frontend

1. **Abrir una nueva terminal y navegar al directorio del frontend:**
   ```bash
   cd FrontEnd/
   ```

2. **Instalar dependencias (si no están instaladas):**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm start
   ```

4. **Verificar que el frontend esté corriendo:**
   - Debería abrirse automáticamente en: `http://localhost:5173`

### Paso 3: Probar la Integración

1. **Verificar conexión:**
   - Abrir las herramientas de desarrollador del navegador (F12)
   - Ir a la pestaña "Network" (Red)
   - Navegar a la sección "Herramientas" o "Reportes"
   - Deberías ver peticiones HTTP a `http://localhost:3000/api/...`

2. **Probar funcionalidades:**
   - **Herramientas:**
     - Verificar que se cargan las herramientas desde el backend
     - Crear una nueva herramienta con imagen
     - Editar una herramienta existente
     - Cambiar el estado de calibración
     - Eliminar una herramienta
   
   - **Reportes:**
     - Verificar que se cargan los reportes desde el backend
     - Crear un nuevo reporte
     - Editar un reporte existente
     - Eliminar un reporte
     - Descargar el PDF de reportes

## Estructura de URLs de la API

### Herramientas (Inventario)
- `GET /api/inventario` - Obtener todas las herramientas
- `GET /api/inventario/:id` - Obtener una herramienta específica
- `POST /api/inventario` - Crear nueva herramienta (con imagen)
- `PUT /api/inventario/:id` - Actualizar herramienta
- `PUT /api/inventario/:id/imagen` - Actualizar imagen de herramienta
- `DELETE /api/inventario/:id` - Eliminar herramienta
- `PUT /api/inventario/calibracion/:id` - Actualizar estado de calibración
- `GET /api/inventario/imagen/:filename` - Obtener imagen

### Reportes
- `GET /api/reportes/reportesAll` - Obtener todos los reportes
- `GET /api/reportes/:ficha_trabajador` - Obtener reporte específico
- `POST /api/reportes` - Crear nuevo reporte
- `PUT /api/reportes/updateOne/:ficha_trabajador` - Actualizar reporte
- `DELETE /api/reportes/deleteOne/:ficha_trabajador` - Eliminar reporte
- `GET /api/reportes/downloadPDF` - Descargar PDF de todos los reportes
- `GET /api/reportes/downloadPDF/:ficha_trabajador` - Descargar PDF de un reporte

## Solución de Problemas

### Error de CORS
Si ves errores de CORS en la consola del navegador:
1. Verificar que el backend esté corriendo en `http://localhost:3000`
2. Verificar que la configuración de CORS en `src/app.js` esté correcta
3. Reiniciar el servidor backend

### Error de Conexión a MongoDB
Si ves errores de conexión a MongoDB:
1. Verificar que la URL de conexión en `src/database.js` sea correcta
2. Verificar que la base de datos esté accesible
3. Verificar credenciales de MongoDB

### Error de Carga de Imágenes
Si las imágenes no se cargan:
1. Verificar que la carpeta `src/uploads/` exista
2. Verificar permisos de escritura en la carpeta
3. Verificar que las URLs de las imágenes sean correctas

### Error de Peticiones HTTP
Si las peticiones fallan:
1. Verificar que ambos servidores estén corriendo
2. Verificar las URLs en `FrontEnd/src/api/axios.js`
3. Revisar la consola del navegador para errores específicos

## Notas Importantes

- El backend usa MongoDB Atlas como base de datos
- Las imágenes se almacenan localmente en `src/uploads/`
- El frontend usa React 18 con TailwindCSS
- Todas las peticiones están centralizadas en los servicios de API
- Se implementó manejo de errores y estados de carga
- La integración es completamente funcional para desarrollo local 