import { Router } from "express";
import InventarioController from "../controllers/inventario.Controller.js";

const router = Router();

router.get("/", InventarioController.getAll);
router.get("/:id", InventarioController.getOne);
router.post("/", InventarioController.insert);
router.put("/:id", InventarioController.updateOne);
router.delete("/:id", InventarioController.deleteOne);

// Rutas para calibración
router.put('/calibracion/:id_herramienta', InventarioController.actualizarCalibracion);

export default router;
