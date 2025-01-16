import { Router } from "express";
import {
  activarTienda,
  createTienda,
  desactivarTienda,
  generateReporte,
  getTienda,
  getTiendas,
  updateTienda,
} from "../controller/tienda";
import { ValidateCreateTienda } from "../validation/tienda";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware de validación que asegura que solo los usuarios con el rol 'administrador' puedan acceder a estas rutas
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas

// Crear una nueva tienda, requiere validación previa
router.post("/create", ValidateCreateTienda, createTienda);

// Obtener todas las tiendas
router.get("/", getTiendas);

// Obtener una tienda específica mediante su ID
router.get("/:tienda_id", getTienda);

// Generar un reporte de una tienda específica
router.get("/reporte/:tienda_id", generateReporte);

// Rutas de actualización

// Actualizar los detalles de una tienda específica utilizando su ID
router.put("/update/:tienda_id", updateTienda);

// Desactivar una tienda específica usando su ID
router.put("/desactivar/:tienda_id", desactivarTienda);

// Activar una tienda específica utilizando su ID
router.put("/activar/:tienda_id", activarTienda);

export { router };
