import InventarioDAO from "../dao/inventario.dao.js";

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
    InventarioDAO.getOne(req.params.id_herramienta)
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
  
export default inventarioController;