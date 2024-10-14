import { Router } from "express";
import { createCompra, getCompras } from "../controller/compras";


const router = Router();

router.get("/",getCompras)
router.post("/create", createCompra);

export { router };
