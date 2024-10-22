import { Router } from "express";
import { createVenta, desactivarVenta, getVenta, getVentas } from "../controller/venta";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("", getVentas);
router.get("/:venta_id", getVenta);

router.post("/create", createVenta);
router.put("/desactivar/:venta_id",desactivarVenta)




export { router };
