import { Router } from "express";
import { createColor, getColores } from "../controller/color";
import { ValidateCreateColor } from "../validation/color";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas
router.post("/create", ValidateCreateColor, createColor);
router.get("/", getColores);

//Rutas sin revisar

export { router };
