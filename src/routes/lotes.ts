import { Router } from "express";
import { createLote, getLotes, sgtEstadoLote } from "../controller/lotes";

const router = Router();

//Rutas revisadas
router.post("/create", createLote);

router.get("/sgte/:lote_id", sgtEstadoLote);

//Rutas sin revisar
router.get("", getLotes);

export { router };
