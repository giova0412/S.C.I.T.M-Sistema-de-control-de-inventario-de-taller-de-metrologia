import { Router } from "express";
import InventarioController from "../controllers/inventario.Controller.js";
import upload from "../middlewares/upload.middleware.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", InventarioController.getAll);
router.get("/:id", InventarioController.getOne);
router.post("/", upload.single('imagen'), InventarioController.insert);
router.put("/:id", InventarioController.updateOne);
router.put("/:id/imagen", upload.single('imagen'), InventarioController.updateImagen);
router.delete("/:id", InventarioController.deleteOne);

// Ruta para servir imágenes
router.get("/imagen/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads', filename);
    res.sendFile(imagePath);
});

// Rutas para calibración
router.put('/calibracion/:id_herramienta', InventarioController.actualizarCalibracion);

export default router;
