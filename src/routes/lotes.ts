import { Router } from "express";
import { createLote, getLotes, getLote } from "../controller/lotes";

const router = Router();

//Rutas revisadas
router.post("/create", createLote);

//Rutas sin revisar
router.get("", getLotes);
router.get("/:lote_id", getLote);

export { router };
