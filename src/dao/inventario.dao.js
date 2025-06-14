import Inventario from "../model/inventario.m.js";

const InventarioDAO = {};

InventarioDAO.insert = async (herramienta) => {
    // Asegurarse de que _id esté establecido como id_herramienta
    herramienta._id = herramienta.id_herramienta || herramienta._id;
    return await Inventario.create(herramienta);
};

InventarioDAO.getAll = async () => {
    return await Inventario.find();
};

InventarioDAO.getOne = async (id_herramienta) => {
    return await Inventario.findById(id_herramienta);
};

InventarioDAO.updateOne = async (inventarioData, id_herramienta) => {
    // Evitar intentar actualizar el _id
    if (inventarioData._id) delete inventarioData._id;
    if (inventarioData.id_herramienta) delete inventarioData.id_herramienta;
    
    return await Inventario.findByIdAndUpdate(id_herramienta, inventarioData, { new: true });
};

InventarioDAO.deleteOne = async (id_herramienta) => {
    return await Inventario.findByIdAndDelete(id_herramienta);
};

InventarioDAO.actualizarCalibracion = (id_herramienta, datos) => {
    return new Promise(async (resolve, reject) => {
        try {
            const herramientaActualizada = await Inventario.findByIdAndUpdate(
                id_herramienta,
                {
                    $set: {
                        calibracion_activa: datos.calibracion_activa,
                        fecha_calibracion: new Date(),
                        estado_calibracion: datos.estado_calibracion
                    }
                },
                { new: true }
            );

            if (!herramientaActualizada) {
                reject("No se encontró la herramienta para actualizar");
                return;
            }

            resolve(herramientaActualizada);
        } catch (error) {
            reject(error);
        }
    });
};

InventarioDAO.obtenerReporteCalibración = (id_herramienta) => {
    return new Promise(async (resolve, reject) => {
        try {
            const herramienta = await Inventario.findById(id_herramienta);
            
            if (!herramienta) {
                reject("Herramienta no encontrada");
                return;
            }

            resolve(herramienta);
        } catch (error) {
            reject(error);
        }
    });
};

export default InventarioDAO;



