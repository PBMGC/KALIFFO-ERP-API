import { Router } from "express";
import { createTienda, getTiendas } from "../controller/tienda";

const router = Router();

router.post("/create", createTienda);
router.get("/", getTiendas);

export { router };
