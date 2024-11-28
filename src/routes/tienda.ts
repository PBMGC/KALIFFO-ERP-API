import { Router } from "express";
import {
  activarTienda,
  createTienda,
  desactivarTienda,
  generateReporte,
  getTienda,
  getTiendas,
  updateTienda,
} from "../controller/tienda";
import { ValidateCreateTienda } from "../validation/tienda";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.post("/create", ValidateCreateTienda, createTienda);
router.get("/", getTiendas);
router.get("/:tienda_id", getTienda);
router.get("/reporte/:tienda_id",generateReporte)

router.put("/update/:tienda_id", updateTienda);
router.put("/desactivar/:tienda_id", desactivarTienda);
router.put("/activar/:tienda_id", activarTienda);

export { router };
