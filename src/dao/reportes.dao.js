import reportes from "../model/reportes.m.js";
import Inventario from "../model/inventario.m.js"; // Importa el modelo de inventario

const ReportesDAO = {};

// Insertar reporte y devolver también el nombre de la herramienta
ReportesDAO.insert = async (data) => {
    // Asegurarse de que _id esté establecido como ficha_trabajador
    data._id = data.ficha_trabajador || data._id;
    
    const nuevoReporte = await reportes.create(data);
    const herramienta = await Inventario.findById(nuevoReporte.id_herramienta);
    
    // Agregar el nombre de la herramienta para mostrar en la respuesta
    const reporteObj = nuevoReporte.toObject();
    reporteObj.nombre_herramienta = herramienta ? herramienta.nombre_herramienta : null;
    return reporteObj;
};

// Obtener un reporte por ficha_trabajador y agregar nombre_herramienta
ReportesDAO.getOne = async (ficha_trabajador) => {
    try {
        console.log(`Buscando reporte con ficha_trabajador: ${ficha_trabajador}`);
        const reporte = await reportes.findById(ficha_trabajador);
        
        if (!reporte) {
            console.log(`No se encontró reporte con ficha_trabajador: ${ficha_trabajador}`);
            return null;
        }
        
        console.log(`Reporte encontrado:`, JSON.stringify(reporte, null, 2));
        console.log(`Buscando herramienta con id_herramienta: ${reporte.id_herramienta}`);
        
        const herramienta = await Inventario.findById(reporte.id_herramienta);
        
        if (herramienta) {
            console.log(`Herramienta encontrada: ${herramienta.nombre_herramienta}`);
        } else {
            console.log(`No se encontró herramienta con id: ${reporte.id_herramienta}`);
        }
        
        const reporteObj = reporte.toObject();
        reporteObj.nombre_herramienta = herramienta ? herramienta.nombre_herramienta : "Herramienta no encontrada";
        
        console.log("Reporte completo a devolver:", JSON.stringify(reporteObj, null, 2));
        return reporteObj;
    } catch (error) {
        console.error("Error en getOne:", error);
        throw error;
    }
};

// Obtener todos los reportes y agregar nombre_herramienta a cada uno
ReportesDAO.getAll = async () => {
    try {
        console.log("Obteniendo todos los reportes...");
        const reportesList = await reportes.find();
        console.log(`Se encontraron ${reportesList.length} reportes`);
        
        console.log("Obteniendo todas las herramientas...");
        const herramientas = await Inventario.find();
        console.log(`Se encontraron ${herramientas.length} herramientas`);
        
        // Crear un mapa de id_herramienta -> nombre_herramienta
        const herramientasMap = {};
        herramientas.forEach(h => {
            console.log(`Herramienta: ID=${h._id}, Nombre=${h.nombre_herramienta}`);
            herramientasMap[h._id] = h.nombre_herramienta;
        });
        
        // Crear un array para almacenar los reportes con información de herramientas
        const reportesConHerramientas = [];
        
        // Procesar cada reporte
        for (const reporte of reportesList) {
            const obj = reporte.toObject();
            
            // Buscar el nombre de la herramienta en el mapa
            const nombreHerramienta = herramientasMap[reporte.id_herramienta];
            
            console.log(`Reporte ${reporte._id}: id_herramienta=${reporte.id_herramienta}, nombre_herramienta=${nombreHerramienta || 'No encontrado'}`);
            
            obj.nombre_herramienta = nombreHerramienta || "Herramienta no encontrada";
            reportesConHerramientas.push(obj);
        }
        
        console.log("Reportes procesados:", JSON.stringify(reportesConHerramientas, null, 2));
        return reportesConHerramientas;
    } catch (error) {
        console.error("Error en getAll:", error);
        throw error;
    }
};

ReportesDAO.updateOne = async (data, ficha_trabajador) => {
    // Evitar intentar actualizar el _id
    if (data._id) delete data._id;
    if (data.ficha_trabajador) delete data.ficha_trabajador;
    
    // Si el estado_entrega es "Entregado", actualizar la fecha de entrega
    if (data.estado_entrega === "Entregado") {
        data.fecha_entrega = new Date(); // Siempre usar la fecha actual
    }
    
    const reporteActualizado = await reportes.findByIdAndUpdate(ficha_trabajador, data, { new: true });
    
    if (reporteActualizado) {
        const herramienta = await Inventario.findById(reporteActualizado.id_herramienta);
        const reporteObj = reporteActualizado.toObject();
        reporteObj.nombre_herramienta = herramienta ? herramienta.nombre_herramienta : "Herramienta no encontrada";
        return reporteObj;
    }
    
    return reporteActualizado;
};

ReportesDAO.deleteOne = async (ficha_trabajador) => {
    return await reportes.findByIdAndDelete(ficha_trabajador);
};

export default ReportesDAO;


