import { Router } from "express";
import {
  createVenta,
  desactivarVenta,
  getVenta,
  getVentas,
} from "../controller/venta";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware de validación de token (solo accesible por "administrador" o "venta")
const Validate = validateToken(["administrador", "venta"]);
router.use(Validate);

// Rutas revisadas:

// Ruta para obtener todas las ventas. El controlador 'getVentas' maneja la lógica de esta ruta.
router.get("", getVentas);

// Ruta para obtener una venta específica por ID. El controlador 'getVenta' maneja la lógica de esta ruta.
router.get("/:venta_id", getVenta);

// Ruta para crear una nueva venta. El controlador 'createVenta' maneja la creación de ventas.
router.post("/create", createVenta);

// Ruta para desactivar una venta específica por ID. El controlador 'desactivarVenta' maneja la lógica de desactivación.
router.put("/desactivar/:venta_id", desactivarVenta);

export { router };
