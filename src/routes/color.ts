import { Router } from "express";
import { createColor, getColores } from "../controller/color";

const router = Router();

//Rutas revisadas
router.post("/create", createColor);
router.get("/", getColores);

//Rutas sin revisar

export { router };
