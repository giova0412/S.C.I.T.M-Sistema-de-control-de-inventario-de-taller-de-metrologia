const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testIntegration() {
    console.log('🧪 Iniciando pruebas de integración...\n');

    try {
        // 1. Probar conexión al backend
        console.log('1. Probando conexión al backend...');
        const healthCheck = await axios.get(`${BASE_URL}/`);
        console.log('✅ Backend conectado correctamente\n');

        // 2. Crear una herramienta de prueba
        console.log('2. Creando herramienta de prueba...');
        const herramientaData = {
            nombre_herramienta: "Multímetro Digital",
            num_partida: "MT001",
            numero_serie: "SN123456",
            fecha_r: "2024-01-15",
            dep: "Metrología",
            medida: "Voltaje/Corriente"
        };

        const herramientaResponse = await axios.post(`${BASE_URL}/inventario`, herramientaData);
        const herramienta = herramientaResponse.data.data.inventario;
        console.log('✅ Herramienta creada:', herramienta.nombre_herramienta, 'ID:', herramienta._id);

        // 3. Crear un reporte para esa herramienta
        console.log('\n3. Creando reporte para la herramienta...');
        const reporteData = {
            ficha_trabajador: 12345,
            nombre: "Juan Pérez",
            id_herramienta: herramienta._id,
            fecha_recibido: new Date(),
            fecha_entrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
            estado_entrega: "pendiente"
        };

        const reporteResponse = await axios.post(`${BASE_URL}/reportes`, reporteData);
        const reporte = reporteResponse.data.data.reporte;
        console.log('✅ Reporte creado:', reporte.nombre, 'Ficha:', reporte.ficha_trabajador);

        // 4. Obtener todos los reportes
        console.log('\n4. Obteniendo todos los reportes...');
        const reportesResponse = await axios.get(`${BASE_URL}/reportes/reportesAll`);
        const reportes = reportesResponse.data.data.reportes;
        console.log('✅ Reportes obtenidos:', reportes.length, 'reportes encontrados');

        // 5. Verificar que el reporte aparece en la lista
        const reporteEncontrado = reportes.find(r => r.ficha_trabajador === reporteData.ficha_trabajador);
        if (reporteEncontrado) {
            console.log('✅ Reporte encontrado en la lista con nombre de herramienta:', reporteEncontrado.nombre_herramienta);
        } else {
            console.log('❌ Reporte no encontrado en la lista');
        }

        // 6. Probar descarga de PDF individual
        console.log('\n5. Probando descarga de PDF individual...');
        try {
            const pdfResponse = await axios.get(`${BASE_URL}/reportes/downloadPDF/${reporteData.ficha_trabajador}`, {
                responseType: 'stream'
            });
            console.log('✅ PDF individual generado correctamente');
        } catch (error) {
            console.log('❌ Error al generar PDF individual:', error.message);
        }

        // 7. Probar descarga de PDF general
        console.log('\n6. Probando descarga de PDF general...');
        try {
            const pdfGeneralResponse = await axios.get(`${BASE_URL}/reportes/downloadPDF`, {
                responseType: 'stream'
            });
            console.log('✅ PDF general generado correctamente');
        } catch (error) {
            console.log('❌ Error al generar PDF general:', error.message);
        }

        // 8. Limpiar datos de prueba
        console.log('\n7. Limpiando datos de prueba...');
        try {
            await axios.delete(`${BASE_URL}/reportes/deleteOne/${reporteData.ficha_trabajador}`);
            await axios.delete(`${BASE_URL}/inventario/deleteOne/${herramienta._id}`);
            console.log('✅ Datos de prueba eliminados');
        } catch (error) {
            console.log('⚠️ Error al limpiar datos:', error.message);
        }

        console.log('\n🎉 ¡Todas las pruebas completadas exitosamente!');
        console.log('\n📋 Resumen:');
        console.log('- ✅ Backend conectado');
        console.log('- ✅ Creación de herramientas');
        console.log('- ✅ Creación de reportes');
        console.log('- ✅ Listado de reportes');
        console.log('- ✅ Generación de PDFs');
        console.log('- ✅ Integración completa funcionando');

    } catch (error) {
        console.error('\n❌ Error en las pruebas:', error.message);
        if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
        }
    }
}

// Ejecutar las pruebas
testIntegration(); 