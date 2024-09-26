import { Router } from "express";
import { validateToken } from "../middleware/validateToken";
import {
  finalAsitencia,
  horasTrabajadas,
  inicioAsistencia,
} from "../controller/usuario";

const router = Router();

router.get("/inicio", validateToken, inicioAsistencia);
router.get("/final", validateToken, finalAsitencia);

router.get("/horasTrabajadas/:usuario_id", horasTrabajadas);

export { router };
