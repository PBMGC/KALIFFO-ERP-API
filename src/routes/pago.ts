import { Router } from "express";
import { deletePagos, getPagos } from "../controller/pago";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas
//Rutas sin revisar
router.get("/:usuario_id", getPagos);
router.delete("/delete/:pago_id", deletePagos);

export { router };
