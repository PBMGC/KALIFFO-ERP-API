import { Router } from "express";
import { deletePagos, getPagos } from "../controller/pago";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar que el usuario tiene el rol de 'administrador'
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas

// Obtener todos los pagos realizados por un usuario específico utilizando su 'usuario_id'
router.get("/:usuario_id", getPagos);

// Eliminar un pago específico utilizando el 'pago_id'
router.delete("/delete/:pago_id", deletePagos);

export { router };
