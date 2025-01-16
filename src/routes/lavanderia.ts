import { Router } from "express";
import {
  createLavanderia,
  createLavanderiaArray,
  deleteLavanderia,
  getLavanderia,
  getLavanderiaPorLote,
  getLavanderias,
  sgteEstdoLoteLavanderia,
  updateLavanderia,
} from "../controller/lavanderia";
import { _createLavanderiaArray } from "../service/lavanderia";
import { ValidateCreateLavanderiaArray } from "../validation/lavanderia";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar roles de usuario (solo accesible por 'administrador' o 'produccion')
const Validate = validateToken(["administrador", "produccion"]);
router.use(Validate);

// Rutas CRUD para lavandería
router.get("", getLavanderias); // Obtener todos los registros de lavandería
router.get("/lote/:lote_id", getLavanderiaPorLote); // Obtener registros de lavandería por lote
router.get("/:lavanderia_id", getLavanderia); // Obtener un solo registro de lavandería por su ID

router.post("/create", createLavanderia); // Crear un nuevo registro de lavandería
router.post(
  "/create/array/:lote_id",
  // ValidateCreateLavanderiaArray,  // Descomentar esta línea para habilitar la validación
  createLavanderiaArray // Crear múltiples registros de lavandería
);

router.put("/update/:lavanderia_id", updateLavanderia); // Actualizar un registro de lavandería por su ID
router.put("/sgte/lote/:lote_id", sgteEstdoLoteLavanderia); // Avanzar el estado de lavandería por lote

router.delete("/delete/:lavanderia_id", deleteLavanderia); // Eliminar un registro de lavandería por su ID

export { router };
