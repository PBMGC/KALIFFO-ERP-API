// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import {
  activarCorte, // Controlador para activar un corte
  createCorte, // Controlador para crear un corte
  createCorteArray, // Controlador para crear un corte desde un array
  desactivarCorte, // Controlador para desactivar un corte
  getCorte, // Controlador para obtener un corte específico por ID
  getCortesPorLote, // Controlador para obtener los cortes por lote
  getTallas, // Controlador para obtener las tallas disponibles
  sgteEstdoLoteCorte, // Controlador para cambiar el estado del lote
  updateCorte, // Controlador para actualizar un corte
} from "../controller/cortes"; // Controladores de "cortes"
import { _sgteEstadoCortesPorLote } from "../service/cortes"; // Servicio para el siguiente estado del corte
import { validateToken } from "../middleware/validateToken"; // Middleware para validar token

// Crea una instancia del enrutador
const router = Router();

// Middleware para validar token y restringir acceso a administradores y personal de producción
const Validate = validateToken(["administrador", "produccion"]);
router.use(Validate);

// Rutas revisadas
// Ruta para obtener todas las tallas disponibles
router.get("/tallas", getTallas);

// Ruta para obtener los cortes de un lote específico por ID
router.get("/lote/:lote_id", getCortesPorLote);

// Ruta para obtener un corte específico por ID
router.get("/:corte_id", getCorte);

// Rutas para crear cortes
router.post("/create", createCorte); // Crear un solo corte
router.post("/create/array/:lote_id", createCorteArray); // Crear múltiples cortes desde un array

// Ruta para cambiar el estado de un lote
router.put("/sgte/lote/:lote_id", sgteEstdoLoteCorte);

// Rutas para activar y desactivar cortes
router.put("/activar/:corte_id", activarCorte); // Activar corte por ID
router.put("/desactivar/:corte_id", desactivarCorte); // Desactivar corte por ID

// Ruta para actualizar un corte por ID
router.put("/update/:corte_id", updateCorte);

// Exporta el enrutador
export { router };
