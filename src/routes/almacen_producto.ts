// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import {
  createAlmacen_Productos,
  getAlmacenProductos,
} from "../controller/almacen_productos"; // Controladores para las operaciones del almacén

// Crea una instancia del enrutador
const router = Router();

// Define las rutas
// Ruta para obtener productos del almacén
router.get("/", getAlmacenProductos);

// Ruta para crear un nuevo producto en el almacén
router.post("/create", createAlmacen_Productos);

// Exporta el enrutador
export { router };
