import { Router } from "express";
import { createCorte } from "../controller/cortes";


const router = Router();

router.post("/create",createCorte)

export { router };