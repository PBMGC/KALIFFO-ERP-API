import { Router } from "express";
import {
  activarTienda,
  createTienda,
  desactivarTienda,
  getTienda,
  getTiendas,
  updateTienda,
} from "../controller/tienda";
import { ValidateCreateTienda } from "../validation/tienda";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas
//Rutas sin revisar
router.post("/create", ValidateCreateTienda, createTienda);
router.get("/", getTiendas);
router.get("/:tienda_id", getTienda);

router.put("/update/:tienda_id", updateTienda);
router.put("/desactivar/:tienda_id", desactivarTienda);
router.put("/activar/:tienda_id", activarTienda);

export { router };
