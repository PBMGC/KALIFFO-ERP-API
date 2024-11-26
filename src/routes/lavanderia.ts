import { Router } from "express";
import {
  createLavanderia,
  createLavanderiaArray,
  deleteLavanderia,
  getLavanderia,
  getLavanderiaPorLote,
  getLavanderias,
  sgteEstdoLoteLavanderia,
  updateLavanderia,
} from "../controller/lavanderia";
import { _createLavanderiaArray } from "../service/lavanderia";
import { ValidateCreateLavanderiaArray } from "../validation/lavanderia";

const router = Router();

router.get("", getLavanderias);
router.get("/lote/:lote_id", getLavanderiaPorLote);
router.get("/:lavanderia_id", getLavanderia);

router.post("/create", createLavanderia);
router.post(
  "/create/array/:lote_id",
  ValidateCreateLavanderiaArray,
  createLavanderiaArray
);

router.put("/update/:lavanderia_id", updateLavanderia);
router.put("/sgte/lote/:lote_id", sgteEstdoLoteLavanderia);

router.delete("/delete/:lavanderia_id", deleteLavanderia);

export { router };
