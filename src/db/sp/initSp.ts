import { eliminarProcedimiento } from "../../util/funcion_sp";
import { initiProcedureUpdateCompra, initiProcedureUpdateCompraDetalle } from "./compras";
import { initProcedureDeleteHorario } from "./horario";
import {
  initProcedureDeleteIncidencia,
  initProcedureUpdateIncidencia,
} from "./incidencia";
import { initProcedureDeletePago } from "./pago";
import {
  initiProcedureGetDetalleProducto,
  initProcedureColoresProductos,
  initProcedureGetColoresProductos,
} from "./producto";
import {
  initiProcedureGetLoseProductosTienda,
  initiProcedureGetProductoTienda,
  initiProcedureGetTienda,
  initiProcedureGetTiendas,
} from "./tienda";
import {
  initiProcedureUpdateUsuario,
  initProcedureGetReporteUsuario,
  initProcedureGetUsuario,
  initProcedureGetUsuarios,
} from "./usuario";
import dotenv from "dotenv";

dotenv.config();

export const initSp = async () => {
  try {
    await dropSp();

    await initProcedureColoresProductos();
    await initProcedureUpdateIncidencia();
    await initProcedureDeleteIncidencia();
    await initProcedureDeleteHorario();
    await initProcedureGetUsuarios();
    await initProcedureGetUsuario();
    await initiProcedureUpdateUsuario();
    await initProcedureGetReporteUsuario();
    await initiProcedureGetTiendas();
    await initiProcedureGetTienda();
    await initProcedureDeletePago();
    await initiProcedureGetProductoTienda();
    await initiProcedureGetLoseProductosTienda();
    await initiProcedureGetDetalleProducto();
    await initProcedureGetColoresProductos();
    await initiProcedureUpdateCompra();
    await initiProcedureUpdateCompraDetalle();

    console.log("Se crearon los sp");
  } catch (error) {
    console.error("Error al inicializar procedimientos almacenados:", error);
  }
};

export const dropSp = async () => {
  try {
    //usuario
    await eliminarProcedimiento("SP_ReporteUsuario");
    await eliminarProcedimiento("SP_GetUsuarios");
    await eliminarProcedimiento("SP_GetUsuario");
    await eliminarProcedimiento("SP_UpdateUsuario");

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

    //incidencia
    await eliminarProcedimiento("SP_DeleteIncidencia");
    await eliminarProcedimiento("SP_UpdateIncidencia");

    //horario
    await eliminarProcedimiento("SP_DeleteHorario");

    //compras
    await eliminarProcedimiento("SP_UpdateCompra");
    await eliminarProcedimiento("SP_UpdateCompraDetalle");

    console.log("Se borraron los sp");
  } catch (error) {
    console.log("error al borrar sp");
  }
};
