import { Router } from "express";
import {
  createProducto,
  getProducto,
  getProductos,
  loseProducto,
  updateProducto,
} from "../controller/producto";
import { ValidateCreateProducto } from "../validation/producto";

const router = Router();

router.get("/", getProductos);
router.get("/lose", loseProducto);

router.get("/:producto_id", getProducto);

router.post("/create", ValidateCreateProducto, createProducto);

router.put("/update/:producto_id", updateProducto);

export { router };
