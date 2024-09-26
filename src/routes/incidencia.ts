import { Router } from "express";
import { createIncidencia, deleteIncidencia, getIncidencia, updateIncidencia } from "../controller/incidencia";
import { Incidencia } from "../models/incidencia";


const router = Router();

router.get("", getIncidencias);
router.get("/:usuario_id", getIncidencia);

router.post("/create", createIncidencia);
router.put("/update/:incidencia_id",updateIncidencia)
router.delete("/delete/:incidencia_id",deleteIncidencia)

export { router };
