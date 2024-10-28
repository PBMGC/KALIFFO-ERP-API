import { Router } from "express";
import {
  createCompra,
  eliminarCompra,
  getCompras,
  getComprasDetalle,
  getEmpresas,
  getProductos,
  updateCompra,
} from "../controller/compras";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("", getCompras);
router.get("/detalle/:compra_id", getComprasDetalle);
router.get("/empresas",getEmpresas);
router.get("/productos",getProductos)

router.put("/update/:compra_id", updateCompra);

router.delete("/delete/:compra_id",eliminarCompra)

router.post("/create", createCompra);

export { router };

// almacen_telas (tipo,metraje,articulo,empresa compra) -> corte (lote;taller,distribucion por modelo,estado,cantidad,talla) -> lavenderia (lote,cantidad,color,talla,estado,precio_unidad,lavanderia_asignada) -> acabados(lote,estado) -> almacen(lote;)

// 300 -> 200 -> 100 -> 50 -> 45
