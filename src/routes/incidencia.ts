import { Router } from "express";
import {
  createIncidencia,
  deleteIncidencia,
  getIncidencia,
  getIncidencias,
  updateIncidencia,
} from "../controller/incidencia";

const router = Router();

router.get("", getIncidencias);
router.get("/:incidencia_id", getIncidencia);

router.delete("/delete/:incidencia_id", deleteIncidencia);

router.put("/update/:incidencia_id", updateIncidencia);

router.post("/create", createIncidencia);

export { router };
