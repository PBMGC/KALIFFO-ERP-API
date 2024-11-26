import { Router } from "express";
import {
  createLote,
  getLotes,
  getLote,
  getLoteProductos,
} from "../controller/lotes";
import { ValidateCreateLote } from "../validation/lote";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador", "produccion"]);

router.use(Validate);

//Rutas revisadas
router.post("/create", ValidateCreateLote, createLote);

//Rutas sin revisar
router.get("", getLotes);
router.get("/productos/:lote_id", getLoteProductos);
router.get("/:lote_id", getLote);

export { router };
