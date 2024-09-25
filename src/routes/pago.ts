import { Router } from "express";
import { getPagos } from "../controller/pago";

const router = Router();

router.get("/:usuario_id", getPagos);

export { router };
