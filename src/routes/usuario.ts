import { Router } from "express";
import { ValidateCreateUsuario } from "../validation/usuario";
import {
  createUsuario,
  deleteUsuario,
  generateReporte,
  getUsuario,
  getUsuarios,
  updateUsuario,
} from "../controller/usuario";

const router = Router();

//Rutas revisadas
router.get("/:usuario_id", getUsuario);
router.get("/", getUsuarios);

router.post("/create", ValidateCreateUsuario, createUsuario);

router.put("/update/:usuario_id", updateUsuario);

router.delete("/delete/:usuario_id", deleteUsuario);

//Rutas sin revisar
// router.post("/login", ValidateLogin, loginUsuario);
router.get("/reporte/:usuario_id", generateReporte);

export { router };
