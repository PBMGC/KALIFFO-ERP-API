import { Router } from "express";
import { deletePagos, getPagos } from "../controller/pago";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("/:usuario_id", getPagos);
router.delete("/delete/:pago_id", deletePagos);

export { router };
