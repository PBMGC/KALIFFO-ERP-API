import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  horaEntrada,
  horaSalida,
  loginUsuario,
  updateUsuario,
} from "../controller/usuario";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.post("/create", createUsuario);
router.get("/", getUsuarios);
router.delete("/delete/:dni", deleteUsuario);
router.put("/update", updateUsuario);

router.post("/login", loginUsuario);
router.get("/horaEntrada", validateToken, horaEntrada);
router.get("/horaSalida", validateToken, horaSalida);

router.get("search/:usuario_id", getUsuario);

export { router };
