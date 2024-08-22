import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  horaEntrada,
  horaSalida,
  updateUsuario,
} from "../controller/usuario";

const router = Router();

router.post("/create", createUsuario);

router.get("/", getUsuarios);

router.get("/:usuario_id", getUsuario);

router.delete("/delete/:dni", deleteUsuario);

router.put("/update", updateUsuario);

router.get("/horaEntrada/:usuario_id", horaEntrada);
router.get("/horaSalida/:usuario_id", horaSalida);

export { router };
