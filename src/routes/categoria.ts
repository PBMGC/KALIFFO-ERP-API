import { Router } from "express";
import {
  createCategoria,
  deleteCategoria,
  getCategoria,
  getCategoriasCliente,
  getCategoriasProducto,
} from "../controller/categoria";

const router = Router();

router.post("/create", createCategoria);
router.get("/producto", getCategoriasProducto);
router.get("/cliente", getCategoriasCliente);
router.get("/search/:categoria_id", getCategoria);
router.delete("/delete/:categoria_id", deleteCategoria);

export { router };
