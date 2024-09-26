import { Router } from "express";
import {
  createIncidencia,
  getIncidencia,
  getIncidencias,
} from "../controller/incidencia";

const router = Router();

router.get("", getIncidencias);
router.get("/:usuario_id", getIncidencia);

router.post("/create", createIncidencia);

export { router };
