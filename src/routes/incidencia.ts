import { Router } from "express";
import { createIncidencia, getIncidencia } from "../controller/incidencia";

const router = Router();

router.get("", getIncidencia);

router.post("/create", createIncidencia);

export { router };
