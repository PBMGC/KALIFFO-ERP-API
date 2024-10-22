import { Router } from "express";
import { createLote, getLotes, updateLote } from "../controller/lotes";

const router = Router();

//Rutas revisadas
router.post("/create", createLote);

router.put("/update/:lote_id", updateLote);

//Rutas sin revisar
router.get("",getLotes)

export { router };
