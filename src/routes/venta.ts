import { Router } from "express";
import { createVenta, getVenta, getVentas } from "../controller/venta";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("", getVentas);
router.get("/:venta_id", getVenta);

router.post("/create", createVenta);

export { router };
