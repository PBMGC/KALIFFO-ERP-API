import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  // getColoresProducto,
  getProducto,
  getProductos,
  getProductosTienda,
  // loseProducto,
  updateProducto,
} from "../controller/producto";
import { createProductoDetalle } from "../seeders/producto";

const router = Router();

router.get("/", getProductos);
// router.get("/lose/:tienda_id", loseProducto);
// router.get("/colores/:producto_id",getColoresProducto)
router.get("/:producto_id", getProducto);

router.get("/tienda/:tienda_id",getProductosTienda)

router.post("/create", createProducto);
router.post("/detalle/create", createProductoDetalle);

router.put("/update/:producto_id", updateProducto);

router.delete("/delete/:producto_id", deleteProducto);

export { router };
