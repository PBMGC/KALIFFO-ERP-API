import { Router } from "express";
import {
  createmovimientos_mercaderia,
  getmovimientos_mercaderia,
} from "../controller/movimientos_mercaderia";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar que el usuario tiene el rol de 'administrador'
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas

// Obtener todos los movimientos de mercadería registrados en el sistema
router.get("/", getmovimientos_mercaderia);

// Crear un nuevo movimiento de mercadería (por ejemplo, ingreso o egreso de productos)
router.post("/create", createmovimientos_mercaderia);

// Actualizar un movimiento de mercadería por su ID (ruta sin implementar)
router.put("/update/:movimiento_id");

// Eliminar un movimiento de mercadería por su ID (ruta sin implementar)
router.delete("/delete/:movimiento_id");

export { router };
