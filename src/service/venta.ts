import { Venta as VentaInteface } from "../interface/venta";
import { Venta } from "../models/venta";

export const _getVentas = async () => {
  const items = await Venta.findAll();

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

export const _getVenta = async (codigo_venta: string) => {
  const item = await Venta.findOne({ where: { codigo_venta: codigo_venta } });

  try {
    return {
      item,
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

export const _createVenta = async (venta: VentaInteface) => {
  try {
    if (await Venta.findOne({ where: { codigo_venta: venta.codigo_venta } })) {
      return {
        msg: "Esta venta ya existe",
        status: 400,
      };
    }

    await Venta.create(venta);

    return {
      msg: `Venta ${venta.codigo_venta} creado`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createVenta",
      error,
      status: 400,
    };
  }
};

export const _deleteVente = async (codigo_venta: string) => {
  try {
    if (!(await Venta.findOne({ where: { codigo_venta: codigo_venta } }))) {
      return {
        msg: `La venta con codigo_venta ${codigo_venta} no existe`,
        status: 400,
      };
    }
    await Venta.destroy({ where: { codigo_venta: codigo_venta } });

    return {
      msg: `La venta con codigo_venta ${codigo_venta} a sido eliminada`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteVente",
      error,
      status: 400,
    };
  }
};

export const _updateVenta = async (venta: VentaInteface) => {
  try {
    if (
      !(await Venta.findOne({
        where: { codigo_venta: venta.codigo_venta },
      }))
    ) {
      return {
        msg: `La venta con codigo_venta ${venta.codigo_venta} no existe`,
        status: 400,
      };
    }

    await Venta.update(venta, {
      where: { codigo_venta: venta.codigo_venta },
    });

    return {
      msg: `La venta con codigo_venta ${venta.codigo_venta} a sido actualizada`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateVenta",
      error,
      status: 400,
    };
  }
};
