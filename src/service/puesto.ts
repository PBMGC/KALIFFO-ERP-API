import { Puesto as PuestoInterface } from "../interface/puesto";
import { Puesto } from "../models/puesto";

export const _createPuesto = async (puesto: PuestoInterface) => {
  try {
    if (await Puesto.findOne({ where: { puesto: puesto.puesto } })) {
      return {
        msg: "este puesto ya existe",
        succes: false,
        status: 400,
      };
    }

    const newPuesto = await Puesto.create(puesto);

    return {
      msg: newPuesto,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_createPuesto",
      succes: false,
      status: 400,
    };
  }
};

export const _getPuestos = async () => {
  try {
    const items = await Puesto.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_getPuestos",
      succes: true,
      status: 400,
    };
  }
};
