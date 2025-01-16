import { Router } from "express";
import {
  createTela,
  desactivarTela,
  getEmpresas,
  getTelaPorTipo,
  getTelas,
  getTipos,
  updateTela,
} from "../controller/telas";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware de validación para asegurarse que solo los usuarios con el rol 'administrador' puedan acceder a estas rutas
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas

// Obtener los tipos de telas disponibles
router.get("/tipo", getTipos);

// Obtener las empresas asociadas a las telas
router.get("/empresas", getEmpresas);

// Obtener todas las telas
router.get("", getTelas);

// Obtener las telas de un tipo específico
router.get("/:tipo_tela", getTelaPorTipo);

// Rutas sin revisar

// Crear una nueva tela
router.post("/create", createTela);

// Actualizar los detalles de una tela existente usando su 'tela_id'
router.put("/update/:tela_id", updateTela);

// Desactivar una tela específica utilizando su 'tela_id'
router.put("/desactivar/:tela_id", desactivarTela);

export { router };
