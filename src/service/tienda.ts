import { Tienda as TiendaInterface } from "../interface/tienda";
import { Tienda } from "../models/tienda";

export const _createTienda = async (tienda: TiendaInterface) => {
  try {
    if (await Tienda.findOne({ where: { tienda: tienda.tienda } })) {
      return {
        msg: "esta tienda ya existe",
        succes: false,
        status: 400,
      };
    }

    const newTienda = await Tienda.create(tienda);

    return {
      msg: newTienda,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_createTienda",
      succes: false,
      status: 400,
    };
  }
};

export const _getTiendas = async () => {
  try {
    const items = await Tienda.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_getTienda",
      succes: true,
      status: 400,
    };
  }
};
