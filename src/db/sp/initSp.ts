import { eliminarProcedimiento } from "../../util/funcion_sp";
import {
  initiProcedureUpdateCompra,
  initiProcedureUpdateCompraDetalle,
} from "./compras";
import { initiProcedureUpdateCorte } from "./cortes";
import { initProcedureDeleteHorario } from "./horario";

import { initProcedureDeletePago } from "./pago";
import {
  initiProcedureGetDetalleProducto,
  initProcedureColoresProductos,
  initProcedureGetColoresProductos,
} from "./producto";
import { dropProcedureTela, initProcedureTela } from "./telas";
import {
  initiProcedureGetLoseProductosTienda,
  initiProcedureGetProductoTienda,
  initiProcedureGetTienda,
  initiProcedureGetTiendas,
} from "./tienda";

import dotenv from "dotenv";
import { dropProcedureUsuario, initProcedureUsuario } from "./usuario";
import { dropProcedureColor, initProcedureColor } from "./color";
import { dropProcedureIncidencia, initProcedureIncidencia } from "./incidencia";
import { dropProcedureAlmacenProductos, initProcedureAlmacenProductos } from "./almacen_productos";

dotenv.config();

export const initSp = async () => {
  try {
    await dropSp();

    //usuario
    await initProcedureUsuario();

    //color
    await initProcedureColor();

    //incidencias
    await initProcedureIncidencia();

    //tela
    await initProcedureTela();

    //almacen Productos 
    await initProcedureAlmacenProductos(); 

    await initProcedureColoresProductos();
    await initProcedureDeleteHorario();

    await initiProcedureGetTiendas();
    await initiProcedureGetTienda();
    await initProcedureDeletePago();
    await initiProcedureGetProductoTienda();
    await initiProcedureGetLoseProductosTienda();
    await initiProcedureGetDetalleProducto();
    await initProcedureGetColoresProductos();
    await initiProcedureUpdateCompra();
    await initiProcedureUpdateCompraDetalle();
    await initiProcedureUpdateCorte();
    console.log("Se crearon los sp");
  } catch (error) {
    console.error("Error al inicializar procedimientos almacenados:", error);
  }
};

export const dropSp = async () => {
  try {
    //usuario
    await dropProcedureUsuario();

    //color
    await dropProcedureColor();

    //incidencia
    await dropProcedureIncidencia();

    //tela
    await dropProcedureTela();

    //almacen productos
    await dropProcedureAlmacenProductos();

    //tienda
    await eliminarProcedimiento("SP_GetLoseProductosTienda");
    await eliminarProcedimiento("SP_GetProductosTienda");
    await eliminarProcedimiento("SP_GetTiendas");
    await eliminarProcedimiento("SP_GetTienda");

    //producto
    await eliminarProcedimiento("SP_ColoresProductos");
    await eliminarProcedimiento("SP_GetDetalleProducto");
    await eliminarProcedimiento("SP_GetColoresProducto");

    //pago
    await eliminarProcedimiento("SP_DeletePago");

    //horario
    await eliminarProcedimiento("SP_DeleteHorario");

    //compras
    await eliminarProcedimiento("SP_UpdateCompra");
    await eliminarProcedimiento("SP_UpdateCompraDetalle");

    //cortes
    await eliminarProcedimiento("SP_UpdateCorte");

    console.log("Se borraron los sp");
  } catch (error) {
    console.log("error al borrar sp");
  }
};
