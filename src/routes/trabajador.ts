import { Router } from "express";
import { ValidateCreateUsuario } from "../validation/usuario";
import {
  createTrabajador,
  deleteTrabajador,
  generateReporte,
  getTrabajador,
  getTrabajadores,
  updateTrabajador,
} from "../controller/trabajador";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware de validación que asegura que solo los usuarios con el rol 'administrador' puedan acceder a estas rutas
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas

// Obtener todos los trabajadores registrados
router.get("/", getTrabajadores);

// Generar un reporte para un trabajador específico utilizando su ID
router.get("/reporte/:trabajador_id", generateReporte);

// Obtener los detalles de un trabajador específico mediante su ID
router.get("/:trabajador_id", getTrabajador);

// Crear un nuevo trabajador en el sistema
router.post("/create", ValidateCreateUsuario, createTrabajador);

// Actualizar los detalles de un trabajador específico utilizando su ID
router.put("/update/:trabajador_id", updateTrabajador);

// Eliminar un trabajador específico usando su ID
router.delete("/delete/:trabajador_id", deleteTrabajador);

export { router };
