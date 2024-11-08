import { Router } from "express";
import {
  createLavanderia,
  deleteLavanderia,
  getLavanderia,
  getLavanderiaPorLote,
  getLavanderias,
  sgteEstdoLoteLavanderia,
  updateLavanderia,
} from "../controller/lavanderia";

const router = Router();

router.get("", getLavanderias);
router.get("/lote/:lote_id", getLavanderia);
router.get("/:lavanderia_id", getLavanderiaPorLote);

router.post("/create", createLavanderia);

router.put("/update/:lavanderia_id", updateLavanderia);
router.put("/sgte/lote/:lote_id", sgteEstdoLoteLavanderia);

router.delete("/delete/:lavanderia_id", deleteLavanderia);

export { router };
