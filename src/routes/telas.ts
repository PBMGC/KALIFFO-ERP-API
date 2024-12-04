import { Router } from "express";
import {
  createTela,
  desactivarTela,
  getEmpresas,
  getTelaPorTipo,
  getTelas,
  getTipos,
  updateTela,
} from "../controller/telas";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador"]);
router.use(Validate);

//Rutas revisadas

//Rutas sin revisar
router.get("/tipo", getTipos);
router.get("/empresas", getEmpresas);
router.get("", getTelas);
router.get("/:tipo_tela", getTelaPorTipo);

router.post("/create", createTela);

router.put("/update/:tela_id", updateTela);
router.put("/desactivar/:tela_id", desactivarTela);

export { router };
