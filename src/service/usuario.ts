import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Horario } from "../models/horario";
import { Usuario } from "../models/usuario";

export const _createUsuario = async (usuario: UsuarioInterface) => {
  try {
    if (await Usuario.findOne({ where: { dni: usuario.dni } })) {
      return {
        msg: "este dni ya esta en uso",
        succes: false,
        status: 400,
      };
    }

    const newUsuario = await Usuario.create(usuario);

    return {
      msg: newUsuario,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_createUsuario",
      succes: false,
      status: 400,
    };
  }
};

export const _getUsuarios = async () => {
  try {
    const items = await Usuario.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_getUsuarios",
      succes: false,
      status: 400,
    };
  }
};

export const _getUsuario = async (dni: string) => {
  try {
    const item = await Usuario.findOne({
      where: { dni: dni },
    });
    return {
      item,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: "_getUsuario",
      succes: false,
      status: 400,
    };
  }
};

export const _deleteUsuario = async (dni: string) => {
  try {
    const usuario = await Usuario.findOne({ where: { dni } });

    if (!usuario) {
      return {
        msg: "No existe usuario con este DNI",
        success: false,
        status: 404,
      };
    }

    await usuario.destroy();

    return {
      msg: "usuario eliminado",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_deleteUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _updateUsuario = async (usuario: Partial<UsuarioInterface>) => {
  try {
    const updateUsuario = await Usuario.findOne({
      where: { dni: usuario.dni },
    });

    if (!updateUsuario) {
      return {
        msg: "No se encontró un usuario con este DNI",
        success: false,
        status: 404,
      };
    }

    await updateUsuario.update(usuario);

    return {
      msg: "Usuario actualizado",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_updateUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _login = async (usuario_id: number, contraseña: string) => {
  try {
    const usuario = await Usuario.findOne({
      where: { usuario_id: usuario_id },
    });

    if (!usuario || usuario.contraseña === contraseña) {
      return {
        msg: "usuario o contraseña incorrecto",
        succes: false,
        status: 400,
      };
    }

    return {
      msg: `bienvenido ${usuario.nombre}`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_login",
      succes: false,
      status: 400,
    };
  }
};

export const _horaEntrada = async (usuario_id: number) => {
  try {
    const now = new Date();

    const newHorario = await Horario.create({
      hora_entrada: now.toLocaleTimeString("en-US", { hour12: false }),
      hora_salida: null,
      fecha: now.toLocaleDateString("en-CA"),
      usuario_id,
    });

    return {
      msg: newHorario,
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "_horaEntrada",
      succes: false,
      status: 400,
    };
  }
};

export const _horaSalida = async (usuario_id: number) => {
  const now = new Date();

  const asistencia = await Horario.findOne({
    where: { usuario_id: usuario_id, fecha: now.toLocaleDateString("en-CA") },
  });

  if (!asistencia) {
    return {
      msg: "error",
      succes: false,
      status: 400,
    };
  }

  asistencia.hora_salida = now.toLocaleTimeString("en-US", { hour12: false });
  await asistencia.save();

  return {
    msg: asistencia,
    succes: true,
    status: 200,
  };
};
