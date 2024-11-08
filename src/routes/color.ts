import { Router } from "express";
import { createColor, getColores } from "../controller/color";
import { ValidateCreateColor } from "../validation/color";

const router = Router();

//Rutas revisadas
router.post("/create", ValidateCreateColor, createColor);
router.get("/", getColores);

//Rutas sin revisar

export { router };
