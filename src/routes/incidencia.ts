import { Router } from "express";
import {
  createIncidencia,
  deleteIncidencia,
  getIncidencia,
  getIncidencias,
  updateIncidencia,
} from "../controller/incidencia";
import { ValidateCreateIncidencia } from "../validation/incidencia";

const router = Router();

//Rutas revisadas
router.get("", getIncidencias);
router.get("/:incidencia_id", getIncidencia);

router.delete("/delete/:incidencia_id", deleteIncidencia);

//Rutas sin revisar

router.put("/update/:incidencia_id", updateIncidencia);

router.post("/create", ValidateCreateIncidencia, createIncidencia);

export { router };
