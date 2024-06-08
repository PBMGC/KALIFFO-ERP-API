import { Router } from "express";
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../controller/cliente";

const router = Router();

router.get("/", getClientes);
router.get("/:codigo", getCliente);
router.post("/create", createCliente);
router.delete("/delete/:codigo", deleteCliente);
router.put("/update", updateCliente);

export { router };
