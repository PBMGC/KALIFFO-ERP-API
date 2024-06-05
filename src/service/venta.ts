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

export const _getVenta = async (codigo: string) => {
  const item = await Venta.findOne({ where: { codigo: codigo } });

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
    if (await Venta.findOne({ where: { codigo: venta.codigo } })) {
      return {
        msg: "Esta venta ya existe",
        status: 400,
      };
    }

    await Venta.create(venta);

    return {
      msg: `Venta ${venta.codigo} creado`,
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

export const _deleteVente = async (codigo: string) => {
  try {
    if (!(await Venta.findOne({ where: { codigo: codigo } }))) {
      return {
        msg: `La venta con codigo ${codigo} no existe`,
        status: 400,
      };
    }
    await Venta.destroy({ where: { codigo: codigo } });

    return {
      msg: `La venta con codigo ${codigo} a sido eliminada`,
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
        where: { codigo: venta.codigo },
      }))
    ) {
      return {
        msg: `La venta con codigo ${venta.codigo} no existe`,
        status: 400,
      };
    }

    await Venta.update(venta, {
      where: { codigo: venta.codigo },
    });

    return {
      msg: `La venta con codigo ${venta.codigo} a sido actualizada`,
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
