import { Color } from "../models/color";
import { DetalleFactura } from "../models/detalleFactura";
import { Factura } from "../models/factura";
import { Horario } from "../models/horario";
import { Incidencia } from "../models/incidencia";
import { Pago } from "../models/pago";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Tienda } from "../models/tienda";
import { Usuario } from "../models/usuario";

export const initBD = async () => {
  await Tienda.sync();
  await Usuario.sync();
  await Horario.sync();
  await Incidencia.sync();
  await Producto.sync();
  await Color.sync();
  await ProductoDetalle.sync();
  await ProductoTienda.sync();
  await Pago.sync();
  await Factura.sync();
  await DetalleFactura.sync();
};

export const borrarBD = async () => {
  await DetalleFactura.drop();
  await Factura.drop();
  await Pago.drop();
  await ProductoTienda.drop();
  await ProductoDetalle.drop();
  await Color.drop();
  await Producto.drop();
  await Incidencia.drop();
  await Horario.drop();
  await Usuario.drop();
  await Tienda.drop();
};
