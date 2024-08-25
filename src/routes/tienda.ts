import { Router } from "express";
import { createTienda, getTiendas } from "../controller/tienda";
import { ValidateCreateTienda } from "../validation/tienda";

const router = Router();

router.post("/create", ValidateCreateTienda, createTienda);
router.get("/", getTiendas);

export { router };
