import { Router } from "express";
import {
  activarProducto,
  createProducto,
  createProductoCompleto,
  desactivarProducto,
  getColoresProducto,
  getDetalleProducto,
  getProducto,
  getProductos,
  getTallaProducto,
  Imprimir,
  updateProducto,
} from "../controller/producto";
import { ValidateCreateProducto } from "../validation/producto";
import { validateToken } from "../middleware/validateToken";

const router = Router();

const Validate = validateToken(["administrador", "venta"]);
router.use(Validate);

//Rutas revisadas
//Rutas sin revisar

router.get("/", getProductos);
router.get("/detalle/:producto_id", getDetalleProducto);
router.get("/talla/:detalle_id", getTallaProducto);

router.get("/imprimir", Imprimir);

router.get("/colores/:producto_id", getColoresProducto);
router.get("/:producto_id", getProducto);

router.post("/create/detalle", createProductoCompleto);
router.post("/create", ValidateCreateProducto, createProducto);

router.put("/update/:producto_id", updateProducto);
router.put("/desactivar/:producto_id", desactivarProducto);
router.put("/activar/:producto_id", activarProducto);

export { router };
