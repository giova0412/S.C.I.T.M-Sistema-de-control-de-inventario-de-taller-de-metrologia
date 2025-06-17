# 🔧 Solución de Problemas - Inserción de Herramientas

## 🚨 Problema: No se guarda al insertar herramienta

### **1. Verificar Conexión a MongoDB**

**Ejecuta el script de prueba:**
```bash
node test_mongo.js
```

**Resultado esperado:**
```
Conectando a MongoDB...
✅ Conexión exitosa a MongoDB
Insertando datos de prueba...
✅ Inserción exitosa: { ... }
✅ Datos de prueba eliminados
Conexión cerrada
```

### **2. Verificar Logs del Servidor**

Cuando hagas una inserción, deberías ver en la consola:

```
Datos recibidos en insert: { nombre_herramienta: '...', ... }
Archivo recibido: { filename: '...', ... }
URL de imagen agregada: /api/inventario/imagen/...
Datos finales a enviar al DAO: { ... }
Datos a insertar: { ... }
Herramienta insertada: { ... }
Respuesta del DAO: { ... }
```

### **3. Problemas Comunes y Soluciones**

#### **Problema A: Error de validación de esquema**
**Síntomas:** Error en consola sobre campos requeridos
**Solución:** Verificar que todos los campos requeridos estén presentes

**Campos requeridos en el modelo:**
- `nombre_herramienta` ✅
- `num_partida` ✅ (debe ser único)
- `numero_serie` ✅
- `fecha_r` ✅
- `dep` ✅
- `medida` ✅

**Campos opcionales:**
- `calibrado` (default: false)
- `fecha_calibrado`
- `fecha_pendiente`
- `imagen_url`

#### **Problema B: Error de ID duplicado**
**Síntomas:** Error "duplicate key error"
**Solución:** El `num_partida` debe ser único

#### **Problema C: Error de tipo de datos**
**Síntomas:** Error de validación de tipos
**Solución:** El DAO convierte automáticamente:
- Strings de fecha → Objetos Date
- Strings booleanos → Booleanos
- Strings numéricos → Números

### **4. Prueba Paso a Paso**

#### **Paso 1: Prueba sin imagen**
```bash
curl -X POST http://localhost:3000/api/inventario \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_herramienta": "Calibrador de Prueba",
    "num_partida": 12345,
    "numero_serie": 67890,
    "fecha_r": "2024-01-15",
    "dep": "Metrología",
    "medida": "mm",
    "calibrado": false
  }'
```

#### **Paso 2: Prueba con imagen**
```bash
curl -X POST http://localhost:3000/api/inventario \
  -F "nombre_herramienta=Calibrador con Imagen" \
  -F "num_partida=12346" \
  -F "numero_serie=67891" \
  -F "fecha_r=2024-01-15" \
  -F "dep=Metrología" \
  -F "medida=mm" \
  -F "calibrado=false" \
  -F "imagen=@/ruta/a/imagen.jpg"
```

### **5. Verificar en MongoDB**

**Opción 1: MongoDB Compass**
1. Conecta a tu cluster
2. Ve a la base de datos `groceries_db`
3. Busca la colección `inventarios`

**Opción 2: MongoDB Shell**
```javascript
use groceries_db
db.inventarios.find().sort({_id: -1}).limit(5)
```

### **6. Debugging Avanzado**

#### **Agregar más logs al DAO:**
```javascript
// En src/dao/inventario.dao.js, línea 40
console.log('Datos a insertar:', JSON.stringify(herramientaData, null, 2));
```

#### **Verificar esquema:**
```javascript
// En el controlador
console.log('Esquema válido:', Inventario.schema.obj);
```

### **7. Casos de Error Específicos**

#### **Error: "num_partida must be unique"**
- Cambia el `num_partida` por uno que no exista
- O elimina la herramienta existente primero

#### **Error: "fecha_r is required"**
- Asegúrate de enviar la fecha en formato válido
- Formato recomendado: `"2024-01-15"`

#### **Error: "calibrado must be a boolean"**
- Envía `true` o `false` (no strings)
- O envía `"true"` o `"false"` (el DAO lo convierte)

### **8. Verificación Final**

Después de una inserción exitosa:

1. **Respuesta del servidor:**
```json
{
  "data": {
    "message": "Herramienta insertada correctamente"
  }
}
```

2. **GET para verificar:**
```bash
curl http://localhost:3000/api/inventario
```

3. **Debería aparecer en la lista con imagen_url si se subió imagen**

### **9. Comandos de Limpieza**

**Eliminar herramienta de prueba:**
```bash
curl -X DELETE http://localhost:3000/api/inventario/12345
```

**Verificar logs completos:**
```bash
npm run dev
# Luego hacer la inserción y revisar toda la salida
```

## 🎯 **Checklist de Verificación**

- [ ] MongoDB conectado ✅
- [ ] Servidor corriendo en puerto 3000 ✅
- [ ] Todos los campos requeridos presentes ✅
- [ ] `num_partida` es único ✅
- [ ] Fechas en formato correcto ✅
- [ ] Imagen válida (si se incluye) ✅
- [ ] Logs aparecen en consola ✅
- [ ] Respuesta exitosa recibida ✅
- [ ] Herramienta aparece en GET /api/inventario ✅ 