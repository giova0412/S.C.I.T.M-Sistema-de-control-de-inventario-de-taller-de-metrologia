const axios = require('axios');

async function testInsertHerramienta() {
    console.log('🧪 Probando inserción de herramienta...');
    
    try {
        // Crear FormData con los datos de prueba
        const FormData = require('form-data');
        const formData = new FormData();
        
        // Datos de la herramienta
        formData.append('nombre_herramienta', 'Micrómetro Digital de Prueba');
        formData.append('num_partida', '9999'); // Este será el ID
        formData.append('numero_serie', '12345');
        formData.append('fecha_r', '2024-01-15');
        formData.append('dep', 'Metrología');
        formData.append('medida', '0-25mm');
        formData.append('calibrado', 'false');
        formData.append('calibracion_activa', 'false');
        formData.append('estado_calibracion', 'Pendiente de calibración');
        
        const response = await axios.post('http://localhost:3000/api/inventario', formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            },
            timeout: 10000
        });
        
        console.log('✅ Herramienta insertada correctamente');
        console.log('📊 Respuesta:', response.status, response.statusText);
        console.log('📋 Datos:', response.data);
        
    } catch (error) {
        console.log('❌ Error al insertar herramienta:');
        
        if (error.response) {
            console.log('📡 Error del servidor:', error.response.status);
            console.log('📄 Respuesta:', error.response.data);
        } else if (error.code === 'ECONNREFUSED') {
            console.log('🚫 El backend no está corriendo');
        } else {
            console.log('🔧 Error:', error.message);
        }
    }
}

testInsertHerramienta(); 