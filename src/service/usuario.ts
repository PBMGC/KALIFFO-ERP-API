import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Horario } from "../models/horario";
import { Usuario } from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
import { Tienda } from "../models/tienda";
import sequelize from "../db/connection";
dotenv.config();

export const _createUsuario = async (usuario: UsuarioInterface) => {
  try {
    if (await Usuario.findOne({ where: { dni: usuario.dni } })) {
      return {
        message: "Este DNI ya está en uso",
        success: false,
        status: 400,
      };
    }

    if (usuario.tienda_id) {
      if (
        !(await Tienda.findOne({ where: { tienda_id: usuario.tienda_id } }))
      ) {
        return {
          message: "Esta tienda no existe",
          success: false,
          status: 400,
        };
      }
    }

    const hashPassword = await bcrypt.hash(usuario.contraseña, 8);
    usuario.contraseña = hashPassword;

    const newUsuario = await Usuario.create(usuario);

    return {
      message: "Usuario creado exitosamente",
      data: newUsuario,
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return {
      message: "error _createUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _getUsuarios = async (
  inicio?: number,
  final?: number,
  nombre?: string,
  rol?: number,
  tienda_id?: number,
  antiTienda_id?: number
) => {
  try {
    const filtros: any = {
      include: {
        model: Tienda,
        attributes: ["tienda_id", "tienda"],
      },
      where: {},

      offset: inicio || 0,
      limit: final ? final - (inicio || 0) : undefined,
    };

    if (nombre) {
      filtros.where.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (rol) {
      filtros.where.rol = rol;
    }

    if (tienda_id) {
      filtros.where.tienda_id = tienda_id;
    }

    if (antiTienda_id) {
      filtros.where.tienda_id = { [Op.ne]: antiTienda_id };
    }

    const items = await Usuario.findAll(filtros);

    const transformedItems = items.map((item: any) => {
      const tienda = item.tienda;
      const { contraseña, createdAt, updatedAt, ...userWithoutPassword } =
        item.toJSON();

      return {
        ...userWithoutPassword,
        tienda_id: tienda ? tienda.tienda_id : null,
        tienda: tienda ? tienda.tienda : null,
      };
    });

    return {
      items: transformedItems,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getUsuarios",
      success: false,
      status: 500,
    };
  }
};

export const _getUsuario = async (usuario_id: string) => {
  try {
    const item = await Usuario.findOne({
      where: { usuario_id: usuario_id },
    });

    if (!item) {
      return {
        message: "Usuario no encontrado",
        success: false,
        status: 404,
      };
    }

    return {
      item,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _deleteUsuario = async (usuario_id: string) => {
  try {
    const usuario = await Usuario.findOne({
      where: { usuario_id: usuario_id },
    });

    if (!usuario) {
      return {
        message: "Usuario no encontrado",
        success: false,
        status: 404,
      };
    }

    await usuario.destroy();

    return {
      message: "Usuario eliminado exitosamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _deleteUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _updateUsuario = async (usuario: Partial<UsuarioInterface>) => {
  try {
    const updateUsuario = await Usuario.findOne({
      where: { usuario_id: usuario.usuario_id },
    });

    if (!updateUsuario) {
      return {
        message: "Usuario no encontrado",
        success: false,
        status: 404,
      };
    }

    await updateUsuario.update(usuario);

    return {
      message: updateUsuario,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _updateUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _login = async (dni: string, contraseña: string) => {
  try {
    const usuario = await Usuario.findOne({
      where: { dni: dni },
    });

    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return {
        message: "DNI o contraseña incorrectos",
        success: false,
        status: 400,
      };
    }

    const token = jwt.sign(
      {
        usuario_id: usuario.usuario_id,
        nombre: usuario.nombre,
        dni: usuario.dni,
      },
      process.env.SECRET_KEY || "default_secret_key"
    );

    return {
      message: `Bienvenido ${usuario.nombre}`,
      token,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _login",
      success: false,
      status: 500,
    };
  }
};

export const _horaEntrada = async (usuario_id: number) => {
  try {
    const now = new Date();
    const fecha = now.toLocaleDateString("en-CA");
    const horaEntrada = now.toLocaleTimeString("en-US", { hour12: false });

    const asistenciaExistente = await Horario.findOne({
      where: { fecha: fecha, usuario_id: usuario_id, hora_salida: null },
    });

    if (asistenciaExistente) {
      return {
        message: "Asistencia ya registrada para hoy",
        success: false,
        status: 400,
      };
    }

    const newHorario = await Horario.create({
      hora_entrada: horaEntrada,
      hora_salida: null,
      fecha: fecha,
      usuario_id,
    });

    return {
      message: newHorario,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _horaEntrada",
      success: false,
      status: 500,
    };
  }
};

export const _horaSalida = async (usuario_id: number) => {
  try {
    const now = new Date();
    const fecha = now.toLocaleDateString("en-CA");
    const horaSalida = now.toLocaleTimeString("en-US", { hour12: false });

    const asistencia = await Horario.findOne({
      where: { usuario_id: usuario_id, fecha: fecha, hora_salida: null },
    });

    if (!asistencia) {
      return {
        message: "Primero debes registrar la hora de entrada",
        success: false,
        status: 400,
      };
    }

    asistencia.hora_salida = horaSalida;
    await asistencia.save();

    return {
      message: asistencia,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _ horaSalida",
      success: false,
      status: 500,
    };
  }
};

export const _horasTrabajadas = async (
  usuario_id: number,
  fechaInicio: string,
  fechaFin: string
) => {
  try {
    const horasTrabajadas = await Horario.findAll({
      where: {
        usuario_id: usuario_id,
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      attributes: [
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("TIMESTAMPDIFF(HOUR, hora_entrada, hora_salida)")
          ),
          "totalHoras",
        ],
      ],
      raw: true,
    });

    return {
      message: horasTrabajadas,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _horasTrabajadas",
      success: false,
      status: 500,
    };
  }
};
