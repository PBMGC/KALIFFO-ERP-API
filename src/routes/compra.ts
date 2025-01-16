// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import {
  createCompra, // Controlador para crear una compra
  eliminarCompra, // Controlador para eliminar una compra
  getCompras, // Controlador para obtener la lista de compras
  getComprasDetalle, // Controlador para obtener detalles de una compra
  getEmpresas, // Controlador para obtener la lista de empresas
  getProductos, // Controlador para obtener productos
  updateCompra, // Controlador para actualizar una compra
} from "../controller/compras"; // Controladores de "compras"
import { validateToken } from "../middleware/validateToken"; // Middleware para validar token

// Crea una instancia del enrutador
const router = Router();

// Middleware para validar token y restringir acceso a administradores
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas
// Ruta para obtener todas las compras
router.get("", getCompras);

// Ruta para obtener los detalles de una compra específica por ID
router.get("/detalle/:compra_id", getComprasDetalle);

// Ruta para obtener la lista de empresas
router.get("/empresas", getEmpresas);

// Ruta para obtener la lista de productos
router.get("/productos", getProductos);

// Ruta para actualizar una compra por ID
router.put("/update/:compra_id", updateCompra);

// Ruta para eliminar una compra por ID
router.delete("/delete/:compra_id", eliminarCompra);

// Ruta para crear una nueva compra
router.post("/create", createCompra);

// Exporta el enrutador
export { router };

// almacen_telas (tipo,metraje,articulo,empresa compra) -> corte (lote;taller,distribucion por modelo,estado,cantidad,talla) -> lavenderia (lote,cantidad,color,talla,estado,precio_unidad,lavanderia_asignada) -> acabados(lote,estado) -> almacen(lote;)

// 300 -> 200 -> 100 -> 50 -> 45
