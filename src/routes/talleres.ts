import { Router } from "express";
import { _createAcabado } from "../service/talleres";
import {
  createAcabado,
  getAcabado,
  getAcabadoLote,
  getAcabados,
  sgteEstadoAcabado,
} from "../controller/talleres";

const router = Router();

router.get("", getAcabados);
router.get("/lote/:lote_id", getAcabadoLote);
router.get("/:acabado_id", getAcabado);

router.put("/sgte/:lote_id", sgteEstadoAcabado);

router.post("/create", createAcabado);

export { router };
