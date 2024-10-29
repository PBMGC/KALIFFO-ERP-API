import { Router } from "express";
import {
  createLavanderia,
  deleteLavanderia,
  getLavanderia,
  getLavanderias,
  sgteEstdoLavanderia,
  updateLavanderia,
} from "../controller/lavanderia";

const router = Router();

router.get("", getLavanderias);
router.get("/:lavanderia_id", getLavanderia);

router.post("/create", createLavanderia);

router.put("/update/:lavanderia_id", updateLavanderia);
router.put("/sgte/:lavanderia_id", sgteEstdoLavanderia);

router.delete("delete/:lavanderia_id", deleteLavanderia);

export { router };
