import { Router } from "express";
import {
  createLavanderia,
  deleteLavanderia,
  getLavanderia,
  getLavanderias,
  updateLavanderia,
} from "../controller/lavanderia";

const router = Router();

router.get("", getLavanderias);
router.get("/:lavanderia_id", getLavanderia);

router.post("/create", createLavanderia);

router.put("/update/:lavanderia_id", updateLavanderia);

router.delete("delete/:lavanderia_id", deleteLavanderia);

export { router };
