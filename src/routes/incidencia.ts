import { Router } from "express";
import { createIncidencia, getIncidencia } from "../controller/incidencia";
import { Incidencia } from "../models/incidencia";

const router = Router();

router.get("", getIncidencia);

router.post("/create", createIncidencia);

export { router };
