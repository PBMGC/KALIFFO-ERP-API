import { Router } from "express";
import {
  createLote,
  getLotes,
  getLote,
  getLoteProductos,
} from "../controller/lotes";
import { ValidateCreateLote } from "../validation/lote";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar roles de usuario (solo accesible por 'administrador' o 'produccion')
const Validate = validateToken(["administrador", "produccion"]);
router.use(Validate);

// Rutas con lógica de validación y creación
router.post("/create", ValidateCreateLote, createLote); // Crear un nuevo lote

// Rutas para obtener datos
router.get("", getLotes); // Obtener todos los lotes
router.get("/productos/:lote_id", getLoteProductos); // Obtener los productos para un lote específico
router.get("/:lote_id", getLote); // Obtener un lote específico por su ID

export { router };
