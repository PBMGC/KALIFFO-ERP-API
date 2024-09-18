import { Router } from "express";
import { createTienda, getTienda, getTiendas } from "../controller/tienda";
import { ValidateCreateTienda } from "../validation/tienda";

const router = Router();

router.post("/create", ValidateCreateTienda, createTienda);
router.get("/", getTiendas);
router.get("/:tienda_id", getTienda);

export { router };
