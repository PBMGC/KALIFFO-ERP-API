import { DetalleVenta as DetalleVentaInteface } from "../interface/detalleVenta";
import { DetalleVenta } from "../models/detalleVenta";

export const _getDetalleVenta = async (codigo: string) => {
  const items = await DetalleVenta.findAll({ where: { codigo: codigo } });

  try {
    return {
      items,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getVenta",
      error,
      status: 400,
    };
  }
};

export const _createDetalleVenta = async (
  detalleVenta: DetalleVentaInteface
) => {
  try {
    if (
      await DetalleVenta.findOne({
        where: { detalleVenta_id: detalleVenta.detalleVenta_id },
      })
    ) {
      return {
        msg: "Esta venta ya existe",
        status: 400,
      };
    }

    await DetalleVenta.create(detalleVenta);

    return {
      msg: `Venta ${detalleVenta.detalleVenta_id} creado`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createDetalleVenta",
      error,
      status: 400,
    };
  }
};
