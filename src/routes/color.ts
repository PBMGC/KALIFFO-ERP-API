import { Router } from "express";
import { createColor, getColores } from "../controller/color";

const router = Router();

router.post("/create", createColor);
router.get("/", getColores);

export { router };
