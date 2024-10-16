import { Router } from "express";
import { createLote, updateLote } from "../controller/lotes";

const router = Router();

router.post("/create",createLote)

router.put("/update/:lote_id",updateLote)

export { router };