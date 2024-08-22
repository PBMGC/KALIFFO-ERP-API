import { Rol as RolInterface } from "../interface/rol";
import { Rol } from "../models/rol";

export const _createRol = async (rol: RolInterface) => {
  try {
    if (await Rol.findOne({ where: { rol: rol.rol } })) {
      return {
        msg: "este rol ya existe",
        succes: false,
        status: 400,
      };
    }

    const newRol = await Rol.create(rol);

    return {
      msg: newRol,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_createRol",
      succes: false,
      status: 400,
    };
  }
};

export const _getRoles = async () => {
  try {
    const items = await Rol.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_getRoles",
      succes: true,
      status: 400,
    };
  }
};
