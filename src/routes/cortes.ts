import { Router } from "express";
import {
  activarCorte,
  createCorte,
  createCorteArray,
  desactivarCorte,
  getCorte,
  getCortesPorLote,
  getTallas,
  sgteEstdoLoteCorte,
  updateCorte,
} from "../controller/cortes";
import { _sgteEstadoCortesPorLote } from "../service/cortes";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// const Validate = validateToken(["administrador", "produccion"]);

// router.use(Validate);

//Rutas revisadas
//Rutas sin revisar
router.get("/tallas", getTallas);
router.get("/lote/:lote_id", getCortesPorLote);
router.get("/:corte_id", getCorte);

router.post("/create", createCorte);
router.post("/create/array/:lote_id", createCorteArray);

router.put("/sgte/lote/:lote_id", sgteEstdoLoteCorte);
router.put("/activar/:corte_id", activarCorte);
router.put("/desactivar/:corte_id", desactivarCorte);
router.put("/update/:corte_id", updateCorte);

export { router };
