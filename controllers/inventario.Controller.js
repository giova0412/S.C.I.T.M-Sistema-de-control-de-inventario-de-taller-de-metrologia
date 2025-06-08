import InventarioDAO from "../dao/inventario.dao.js";
import { createRequire } from 'module';
import { join } from 'path';
const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit-table');

const inventarioController = {};

inventarioController.insert = (req, res) => {
    InventarioDAO.insert(req.body)
        .then((response) => {
            res.json({
                data: {
                    message: "Herramienta insertada correctamente",
                    herramienta: response
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

inventarioController.getAll = (req, res) => {
    InventarioDAO.getAll()
        .then((herramientas) => {
            res.json({
                data: {
                    herramientas: herramientas
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

inventarioController.getOne = (req, res) => {
    InventarioDAO.getOne(req.params.id)
        .then((herramienta) => {
            res.json({
                data: {
                    herramienta: herramienta
                }
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error
                }
            });
        });
};

inventarioController.updateOne = (req, res) => {
    InventarioDAO.updateOne(req.body, req.params.id)
        .then((result) => {
            res.json({
                data: {
                    message: "herramienta actualizada",
                    result: result
                }
            });
        })
        .catch((error) => {
            res.json({
                data: { error: error }
            });
        });
};

inventarioController.deleteOne = (req, res) => {
    InventarioDAO.deleteOne(req.params.id)
        .then((inventarioDelete) => {
            res.json({
                data: {
                    message: "herramienta eliminada correctamente",
                    inventario_delete: inventarioDelete
                }
            });
        })
        .catch((error) => {
            res.json({
                data: { error: error }
            });
        });  
   
};

inventarioController.actualizarCalibracion = async (req, res) => {
    try {
        const { id_herramienta, calibracion_activa } = req.body;
        const fecha_calibracion = calibracion_activa ? new Date() : null; 
        const estado_calibracion = calibracion_activa ? 'Calibrado' : 'Pendiente de calibración';
 
        const herramientaActualizada = await InventarioDAO.updateOne(
            {
                calibracion_activa,  
                fecha_calibracion,
                estado_calibracion
            },
            id_herramienta
        );

        res.json({
            success: true,
            message: "Estado de calibración actualizado",
            data: herramientaActualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el estado de calibración", 
            error: error.message
        });
    } 
};


export default inventarioController;   