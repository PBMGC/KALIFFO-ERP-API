import { Router } from "express";
import { createLote, getLotes, getLote } from "../controller/lotes";
import { ValidateCreateLote } from "../validation/lote";

const router = Router();

//Rutas revisadas
router.post("/create", ValidateCreateLote, createLote);

//Rutas sin revisar
router.get("", getLotes);
router.get("/:lote_id", getLote);

export { router };
