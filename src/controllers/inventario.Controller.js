import InventarioDAO from "../dao/inventario.dao.js";
import { createRequire } from 'module';
import { join } from 'path';
const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit-table');

const inventarioController = {};

inventarioController.insert = (req, res) => {
    try {
        console.log('Datos recibidos en insert:', req.body);
        console.log('Archivo recibido:', req.file);
        
        // Preparar los datos de la herramienta
        const herramientaData = { ...req.body };
        
        // Si se subió una imagen, agregar la URL
        if (req.file) {
            herramientaData.imagen_url = `/api/inventario/imagen/${req.file.filename}`;
            console.log('URL de imagen agregada:', herramientaData.imagen_url);
        }
        
        console.log('Datos finales a enviar al DAO:', herramientaData);
        
        InventarioDAO.insert(herramientaData)
            .then((response) => {
                console.log('Respuesta del DAO:', response);
                res.json({
                    data: {
                        message: "Herramienta insertada correctamente"
                    }
                });
            })
            .catch((error) => {
                console.error('Error en el DAO:', error);
                res.status(500).json({
                    data: {
                        message: `Error al insertar herramienta: ${error.message}`
                    }
                });
            });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({
            data: {
                message: "Error al procesar la solicitud"
            }
        });
    }
};

inventarioController.getAll = (req, res) => {
    InventarioDAO.getAll()
        .then((herramientas) => {
            // Asegurar que todas las herramientas tengan la URL completa de la imagen
            const herramientasConImagenes = herramientas.map(herramienta => {
                const herramientaObj = herramienta.toObject ? herramienta.toObject() : herramienta;
                if (herramientaObj.imagen_url && !herramientaObj.imagen_url.startsWith('http')) {
                    // Construir URL completa si no es una URL completa
                    const baseUrl = `${req.protocol}://${req.get('host')}`;
                    herramientaObj.imagen_url = `${baseUrl}${herramientaObj.imagen_url}`;
                }
                return herramientaObj;
            });
            
            res.json({
                data: {
                    herramientas: herramientasConImagenes
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
            if (herramienta) {
                const herramientaObj = herramienta.toObject ? herramienta.toObject() : herramienta;
                if (herramientaObj.imagen_url && !herramientaObj.imagen_url.startsWith('http')) {
                    // Construir URL completa si no es una URL completa
                    const baseUrl = `${req.protocol}://${req.get('host')}`;
                    herramientaObj.imagen_url = `${baseUrl}${herramientaObj.imagen_url}`;
                }
                
                res.json({
                    data: {
                        herramienta: herramientaObj
                    }
                });
            } else {
                res.status(404).json({
                    data: {
                        message: "Herramienta no encontrada"
                    }
                });
            }
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
        const { calibracion_activa } = req.body;
        const id_herramienta = req.params.id_herramienta;
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

inventarioController.updateImagen = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                data: {
                    message: "No se proporcionó ninguna imagen"
                }
            });
        }

        const imagenUrl = `/api/inventario/imagen/${req.file.filename}`;
        
        InventarioDAO.updateOne({ imagen_url: imagenUrl }, req.params.id)
            .then((result) => {
                res.json({
                    data: {
                        message: "Imagen actualizada correctamente"
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
    } catch (error) {
        res.status(500).json({
            data: {
                message: "Error al procesar la solicitud"
            }
        });
    }
};

export default inventarioController;   