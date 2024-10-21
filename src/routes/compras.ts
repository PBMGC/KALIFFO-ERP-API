import { Router } from "express";
import {
  createCompra,
  getCompras,
  getComprasDetalle,
  updateCompra,
} from "../controller/compras";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("/", getCompras);
router.get("/detalle", getComprasDetalle);

router.put("/update/:compra_id", updateCompra);

router.post("/create", createCompra);

export { router };

// almacen_telas (tipo,metraje,articulo,empresa compra) -> corte (lote;taller,distribucion por modelo,estado,cantidad,talla) -> lavenderia (lote,cantidad,color,talla,estado,precio_unidad,lavanderia_asignada) -> acabados(lote,estado) -> almacen(lote;)

// 300 -> 200 -> 100 -> 50 -> 45
