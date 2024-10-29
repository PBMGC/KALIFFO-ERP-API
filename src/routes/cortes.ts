import { Router } from "express";
import {
  activarCorte,
  createCorte,
  desactivarCorte,
  getCorte,
  getCortesPorLote,
  getTallas,
  sgteEstdoCorte,
  updateCorte,
} from "../controller/cortes";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("/tallas",getTallas)
router.get("/:lote_id", getCortesPorLote);
router.get("/:corte_id", getCorte);


router.post("/create", createCorte);

router.put("/update/:corte_id", updateCorte);
router.put("/sgte/:corte_id", sgteEstdoCorte);
router.put("/activar/:corte_id", activarCorte);
router.put("/desactivar/:corte_id", desactivarCorte);

export { router };
 