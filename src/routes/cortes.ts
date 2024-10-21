import { Router } from "express";
import { createCorte, updateCorte } from "../controller/cortes";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.post("/create", createCorte);

router.put("/update/:corte_id", updateCorte);

export { router };
