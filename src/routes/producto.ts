import { Router } from "express";
import {
  activarProducto,
  createProducto,
  desactivarProducto,
  getColoresProducto,
  getDetalleProducto,
  getProducto,
  getProductos,
  getTallaProducto,
  updateProducto,
} from "../controller/producto";
import { ValidateCreateProducto } from "../validation/producto";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Middleware para validar que el usuario tiene los roles de 'administrador' o 'venta'
const Validate = validateToken(["administrador", "venta"]);
router.use(Validate);

// Rutas revisadas

// Obtener todos los productos
router.get("/", getProductos);

// Obtener detalles específicos de un producto usando el 'producto_id'
router.get("/detalle/:producto_id", getDetalleProducto);

// Obtener tallas de un producto usando el 'detalle_id'
router.get("/talla/:detalle_id", getTallaProducto);

// Obtener colores disponibles para un producto usando el 'producto_id'
router.get("/colores/:producto_id", getColoresProducto);

// Obtener información de un producto específico usando su 'producto_id'
router.get("/:producto_id", getProducto);

// Crear un nuevo producto (con validación)
router.post("/create", ValidateCreateProducto, createProducto);

// Actualizar información de un producto específico usando el 'producto_id'
router.put("/update/:producto_id", updateProducto);

// Desactivar un producto usando el 'producto_id'
router.put("/desactivar/:producto_id", desactivarProducto);

// Activar un producto que estaba desactivado usando el 'producto_id'
router.put("/activar/:producto_id", activarProducto);

export { router };
