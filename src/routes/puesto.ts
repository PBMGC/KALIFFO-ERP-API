import { Router } from "express";
import { createPuesto, getPuestos } from "../controller/puesto";

const router = Router();

router.post("/create", createPuesto);
router.get("/", getPuestos);

export { router };
