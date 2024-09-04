import { Router } from "express";
import { createIncidencia } from "../controller/incidencia";

const router = Router();

router.post("/create", createIncidencia);

export { router };
