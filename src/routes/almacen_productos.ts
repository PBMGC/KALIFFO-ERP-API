import { Router } from "express";
import { createAlmacen_Productos, getAlmacenProductos } from "../controller/almacen_productos";

const router = Router();

//update,eliminar,getproductos y trigger
router.get("/",getAlmacenProductos)
router.post("/create",createAlmacen_Productos)


export {router};