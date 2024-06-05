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
router.get("/:cliente_id", getCliente);
router.post("/create", createCliente);
router.delete("/delete/:cliente_id", deleteCliente);
router.put("/update", updateCliente);

export { router };
