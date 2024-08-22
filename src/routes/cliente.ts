import { Router } from "express";
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../controller/cliente";

const router = Router();

// router.post("/create", createCliente);
// router.get("/", getClientes);
// router.get("/:codigo", getCliente);
// router.put("/update", updateCliente);
// router.delete("/delete/:codigo", deleteCliente);

export { router };
