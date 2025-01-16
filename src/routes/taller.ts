import { Router } from "express";
import { _createAcabado } from "../service/taller";
import {
  createAcabado,
  getAcabado,
  getAcabadoLote,
  getAcabados,
  sgteEstadoAcabado,
} from "../controller/talleres";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar que el usuario tiene los roles de 'administrador' o 'produccion'
const Validate = validateToken(["administrador", "produccion"]);
router.use(Validate);

// Rutas revisadas

// Obtener todos los acabados
router.get("", getAcabados);

// Obtener acabado por lote utilizando el 'lote_id'
router.get("/lote/:lote_id", getAcabadoLote);

// Obtener un acabado específico usando su 'acabado_id'
router.get("/:acabado_id", getAcabado);

// Avanzar el estado de un acabado en el proceso, identificando por el 'lote_id'
router.post("/sgte/:lote_id", sgteEstadoAcabado);

// Crear un nuevo acabado
router.post("/create", createAcabado);

export { router };
