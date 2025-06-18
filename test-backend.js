// Script de prueba para verificar que el backend esté funcionando
import axios from 'axios';

const testBackend = async () => {
    try {
        console.log('🔍 Probando conexión al backend...');
        
        // Probar la conexión básica
        const response = await axios.get('http://localhost:3000/api/inventario');
        
        console.log('✅ Backend funcionando correctamente!');
        console.log('📊 Respuesta:', response.data);
        
    } catch (error) {
        console.error('❌ Error al conectar con el backend:');
        console.error('Mensaje:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 El backend no está corriendo. Ejecuta: cd src && npm run dev');
        } else if (error.response) {
            console.error('📡 Error del servidor:', error.response.status, error.response.data);
        }
    }
};

testBackend(); 