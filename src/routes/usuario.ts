import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  horaEntrada,
  horaSalida,
  horasTrabajadas,
  loginUsuario,
  updateUsuario,
} from "../controller/usuario";
import { validateToken } from "../middleware/validateToken";
import { ValidateCreateUsuario, ValidateLogin } from "../validation/usuario";

const router = Router();

router.get("/", getUsuarios);
router.get("/horaEntrada", validateToken, horaEntrada);
router.get("/horaSalida", validateToken, horaSalida);
router.get("/search/:dni", getUsuario);
router.get("/horasTrabajadas/:usuario_id", horasTrabajadas);

router.post("/create", ValidateCreateUsuario, createUsuario);
router.post("/login", ValidateLogin, loginUsuario);

router.put("/update", updateUsuario);

router.delete("/delete/:dni", deleteUsuario);

export { router };
