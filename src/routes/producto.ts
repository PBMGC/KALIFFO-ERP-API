import { Router } from "express";
import {
  createProducto,
  createProductoCompleto,
  desactivarProducto,
  getColoresProducto,
  getDetalleProducto,
  getProducto,
  getProductos,
  getTallaProducto,
  updateProducto,
} from "../controller/producto";

const router = Router();

router.get("/", getProductos);
router.get("/detalle/:producto_id", getDetalleProducto);
router.get("/talla/:detalle_id", getTallaProducto);

router.get("/colores/:producto_id", getColoresProducto);
router.get("/:producto_id", getProducto);

router.post(
  "/create/detalle",
  // ValidateCreateProductoCompleto,
  createProductoCompleto
);
router.post("/create", createProducto);

// router.post("/detalle/create", createProductoDetalle);

router.put("/update/:producto_id", updateProducto);
router.put("/desactivar/:producto_id",desactivarProducto)

export { router };
