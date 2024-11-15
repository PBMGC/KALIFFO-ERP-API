import { Router } from "express";
import { createAlmacen_Productos } from "../controller/almacen_productos";

const router = Router();

//update,eliminar,getproductos y trigger
router.post("/create",createAlmacen_Productos)


export {router};