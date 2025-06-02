import reportes from "../model/reportes.m.js";
import Inventario from "../model/inventario.m.js"; // Importa el modelo de inventario

const ReportesDAO = {};

// Insertar reporte y devolver también el nombre de la herramienta
ReportesDAO.insert = async (data) => {
    const nuevoReporte = await reportes.create(data);
    const herramienta = await Inventario.findOne({ id_herramienta: nuevoReporte.id_herramienta });
    const reporteObj = nuevoReporte.toObject();
    reporteObj.nombre_herramienta = herramienta ? herramienta.nombre_herramienta : null;
    return reporteObj;
};

// Obtener un reporte por ficha_trabajador y agregar nombre_herramienta
ReportesDAO.getOne = async (ficha_trabajador) => {
    const reporte = await reportes.findOne({ ficha_trabajador });
    if (!reporte) return null;
    const herramienta = await Inventario.findOne({ id_herramienta: reporte.id_herramienta });
    const reporteObj = reporte.toObject();
    reporteObj.nombre_herramienta = herramienta ? herramienta.nombre_herramienta : null;
    return reporteObj;
};

// Obtener todos los reportes y agregar nombre_herramienta a cada uno
ReportesDAO.getAll = async () => {
    const reportesList = await reportes.find();
    const herramientas = await Inventario.find();
    const herramientasMap = {};
    herramientas.forEach(h => {
        herramientasMap[h.id_herramienta] = h.nombre_herramienta;
    });
    return reportesList.map(r => {
        const obj = r.toObject();
        obj.nombre_herramienta = herramientasMap[r.id_herramienta] || null;
        return obj;
    });
};

ReportesDAO.updateOne = async (data, ficha_trabajador) => {
    return await reportes.findOneAndUpdate({ ficha_trabajador }, data, { new: true });
};
ReportesDAO.deleteOne = async (ficha_trabajador) => {
    return await reportes.findOneAndDelete({ ficha_trabajador: ficha_trabajador });
};

export default ReportesDAO;


