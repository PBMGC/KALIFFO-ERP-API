import { Router } from "express";
import {
  createProducto,
  getProducto,
  getProductoDetalle,
  getProductos,
  updateProducto,
} from "../controller/producto";
import { ValidateCreateProducto } from "../validation/producto";

const router = Router();

router.get("/", getProductos);
router.get("/detalle", getProductoDetalle);
router.get("/:producto_id", getProducto);

router.post("/create", ValidateCreateProducto, createProducto);

router.put("/update/:producto_id", updateProducto);

export { router };
