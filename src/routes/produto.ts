import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateProducto,
} from "../controller/producto";

const router = Router();

router.get("/", getProductos);
router.get("/:producto_id", getProducto);
router.post("/create", createProducto);
router.delete("/delete/:producto_id", deleteProducto);
router.put("/update", updateProducto);

export { router };
