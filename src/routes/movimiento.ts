import { Router } from "express";
import {
  createmovimientos_mercaderia,
  getmovimientos_mercaderia,
} from "../controller/movimientos_mercaderia";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas
//Rutas sin revisar
router.get("/", getmovimientos_mercaderia);
router.post("/create", createmovimientos_mercaderia);
router.put("/update/:movimiento_id");
router.delete("/delete/:movimiento_id");

export { router };
