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
router.get("/:dni", getUsuario);

router.post("/create", ValidateCreateUsuario, createUsuario);
router.post("/login", ValidateLogin, loginUsuario);
router.post("/horasTrabajadas", horasTrabajadas);

router.put("/update", updateUsuario);

router.delete("/delete/:dni", deleteUsuario);

export { router };
