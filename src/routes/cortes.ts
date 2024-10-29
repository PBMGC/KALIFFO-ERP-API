import { Router } from "express";
import {
  createCorte,
  getCorte,
  getCortesPorLote,
  getTallas,
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

export { router };
