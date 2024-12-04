import { Router } from "express";
import { _createAcabado } from "../service/talleres";
import {
  createAcabado,
  getAcabado,
  getAcabadoLote,
  getAcabados,
  sgteEstadoAcabado,
} from "../controller/talleres";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador", "produccion"]);
router.use(Validate);

router.get("", getAcabados);
router.get("/lote/:lote_id", getAcabadoLote);
router.get("/:acabado_id", getAcabado);

router.put("/sgte/:lote_id", sgteEstadoAcabado);

router.post("/create", createAcabado);

export { router };
