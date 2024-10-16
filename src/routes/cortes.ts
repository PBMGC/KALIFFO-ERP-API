import { Router } from "express";
import { createCorte, updateCorte } from "../controller/cortes";


const router = Router();

router.post("/create",createCorte)

router.put("/update/:corte_id",updateCorte)

export { router };