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

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas
router.get("/", getTrabajadores);
router.get("/reporte/:trabajador_id", generateReporte);
router.get("/:trabajador_id", getTrabajador);

router.post("/create", ValidateCreateUsuario, createTrabajador);

router.put("/update/:trabajador_id", updateTrabajador);

router.delete("/delete/:trabajador_id", deleteTrabajador);

export { router };
