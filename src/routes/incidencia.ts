// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import {
  createIncidencia, // Controlador para crear una incidencia
  deleteIncidencia, // Controlador para eliminar una incidencia
  getIncidencia, // Controlador para obtener una incidencia específica por ID
  getIncidencias, // Controlador para obtener todas las incidencias
  updateIncidencia, // Controlador para actualizar una incidencia
} from "../controller/incidencia"; // Controladores de "incidencia"
import { ValidateCreateIncidencia } from "../validation/incidencia"; // Validación para crear una incidencia

// Crea una instancia del enrutador
const router = Router();

// Rutas revisadas
// Ruta para obtener todas las incidencias
router.get("", getIncidencias);

// Ruta para obtener una incidencia específica por ID
router.get("/:incidencia_id", getIncidencia);

// Ruta para eliminar una incidencia específica por ID
router.delete("/delete/:incidencia_id", deleteIncidencia);

// Rutas sin revisar
// Ruta para actualizar una incidencia específica por ID
router.put("/update/:incidencia_id", updateIncidencia);

// Ruta para crear una nueva incidencia, validada antes de crearla
router.post("/create", ValidateCreateIncidencia, createIncidencia);

// Exporta el enrutador
export { router };
