import { Router } from "express";
import { ValidateCreateUsuario, ValidateLogin } from "../validation/usuario";
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

router.get("/", getUsuarios);
router.get("/reporte/:usuario_id", generateReporte);
router.get("/:usuario_id", getUsuario);

router.post("/create", ValidateCreateUsuario, createUsuario);

router.put("/update/:usuario_id", updateUsuario);

router.delete("/delete/:usuario_id", deleteUsuario);

export { router };
