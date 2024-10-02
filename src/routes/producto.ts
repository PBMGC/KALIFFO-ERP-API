import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  // getColoresProducto,
  getProducto,
  getProductos,
  // loseProducto,
  updateProducto,
} from "../controller/producto";

const router = Router();

router.get("/", getProductos);
// router.get("/lose/:tienda_id", loseProducto);
// router.get("/colores/:producto_id",getColoresProducto)
router.get("/:producto_id", getProducto);

router.post("/create", createProducto);

router.put("/update/:producto_id", updateProducto);

router.delete("/delete/:producto_id", deleteProducto);

export { router };
