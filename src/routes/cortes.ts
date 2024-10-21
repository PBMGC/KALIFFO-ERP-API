import { Router } from "express";
import {
  createCorte,
  getCorte,
  getCortes,
  updateCorte,
} from "../controller/cortes";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("", getCortes);
router.get("/:corte_id", getCorte);

router.post("/create", createCorte);
router.put("/update/:corte_id", updateCorte);

export { router };
