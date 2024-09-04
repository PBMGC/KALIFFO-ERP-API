import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  loginUsuario,
  updateUsuario,
} from "../controller/usuario";
import { ValidateCreateUsuario, ValidateLogin } from "../validation/usuario";

const router = Router();

router.get("/", getUsuarios);
router.get("/:usuario_id", getUsuario);

router.post("/create", ValidateCreateUsuario, createUsuario);
router.post("/login", ValidateLogin, loginUsuario);

router.put("/update/:usuario_id", updateUsuario);

router.delete("/delete/:usuario_id", deleteUsuario);

export { router };
