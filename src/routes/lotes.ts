import { Router } from "express";
import { createLote } from "../controller/lotes";

const router = Router();

router.post("/create",createLote)

export { router };