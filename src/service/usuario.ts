import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Horario } from "../models/horario";
import { Usuario } from "../models/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
import { Tienda } from "../models/tienda";
import sequelize from "../db/connection";
import { Incidencia } from "../models/incidencia";

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

    const countIncidencias = await Incidencia.count({ where: { usuario_id } });

    if (!item) {
      return {
        message: "Usuario no encontrado",
        success: false,
        status: 404,
      };
    }

    return {
      item: { ...item.dataValues, nroIncidencias: countIncidencias },
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

export const _horasTrabajadas = async (usuario_id: number) => {
  try {
    const items = await Horario.findAll({
      attributes: [
        "horario_id",
        "hora_entrada",
        "hora_salida",
        "fecha",
        "usuario_id",
        [
          sequelize.literal(
            "FLOOR(TIME_TO_SEC(TIMEDIFF(hora_salida, hora_entrada)) / 60)"
          ),
          "min_trabajados",
        ],
      ],
      where: { usuario_id },
    });

    return {
      items,
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

//Sql puro

export const _deleteAsistencia = async (horario_id: number) => {
  try {
    await sequelize.query(`
      CALL SP_DeleteHorario(${horario_id})`);

    return {
      message: "Eliminacion exitosa",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar la asistencia:", error);
    return {
      message: "Error al eliminar la asistencia",
      success: false,
      status: 500,
    };
  }
};

export const _generarReporte = async (usuario_id: number) => {
  try {
    const PDFDocument = require("pdfkit-table");
    const fs = require("fs");

    const data: any = await sequelize.query(
      `CALL SP_ReporteUsuario(${usuario_id})`
    );

    const horariodata: any = data[0].horarios
    .split('), (')
    .map((item:string) => {
      const [hora_entrada, hora_salida] = item
        .replace(/\(|\)/g, "") 
        .trim()
        .split(", "); 
      return {
        hora_entrada: hora_entrada,
        hora_salida: hora_salida 
      };
    });

    const pagosData = data[0].pagos
    .split('), (')
    .map((item:string)=>{
      const [pago_total,pago_faltante] = item
      .replace(/\(|\)/g, "") 
      .trim()
      .split(", "); 
      return {
        pago_total:pago_total,
        pago_faltante:pago_faltante
      }
    })

    console.log(pagosData)

    const incidenciaTIPO: any = { 1: "Familiar", 2: "Laboral", 3: "Otros" };
    const incidenciasData = data[0].incidencias.split("; ").map((item: any) => {
      const [id, descripcion, fecha] = item
        .replace(/\(|\)/g, "")
        .trim()
        .split(", ");
      return {
        tipo: incidenciaTIPO[Number(id)],
        descripcion: descripcion,
        fecha: fecha,
      };
    });

    const doc = new PDFDocument({
      bufferPages: true,
      title: "Reporte Usuario",
      permissions: {
        printing: "highResolution",
      },
    });

    doc.pipe(fs.createWriteStream(`reporte1.pdf`));

    doc.image("src/Img/logo.png", 10, 10, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });
    doc.text("KALIFFO SAC", 250, 50);
    doc.text("REPORTE DE TRABAJADOR", 210, 70);

    const tablaDatosTrabajador = {
      title: `Datos de ${data[0].nombre} ${data[0].ap_paterno} ${data[0].ap_materno}`,
      headers: [
        {
          label: "Nombre",
          property: "nombre",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Teléfono",
          property: "telefono",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "DNI",
          property: "dni",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Tienda",
          property: "tienda",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas: [
        {
          nombre:
            data[0].nombre +
            " " +
            data[0].ap_paterno +
            " " +
            data[0].ap_materno,
          telefono: data[0].telefono,
          dni: data[0].dni,
          tienda: data[0].tienda,
        },
      ],
    };

    await doc.table(tablaDatosTrabajador, {
      width: 450,
      x: 50,
      y: 120,
      prepareRow: (
        row: string[],
        indexColumn: number,
        indexRow: number,
        rectRow: { x: number; y: number; width: number; height: number },
        rectCell: { x: number; y: number; width: number; height: number }
      ) => {
        const { x, y, width, height } = rectCell;

        if (indexColumn === 0) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + height)
            .stroke();
        }

        doc
          .lineWidth(0.5)
          .moveTo(x + width, y)
          .lineTo(x + width, y + height)
          .stroke();

        if (indexRow === tablaDatosTrabajador.datas.length - 1) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y + height)
            .lineTo(x + width, y + height)
            .stroke();
        }
      },
    });

    const tablaDatosHorario = {
      title: "Asistencia del Trabajador",
      headers: [
        {
          label: "Hora de Entrada",
          property: "horadeentrada",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Hora de Salida",
          property: "horasalida",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Horas Trabajadas",
          property: "horatrabajadas",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas: horariodata.map((horario: any) => {
        return {
          horadeentrada: horario.hora_entrada,
          horasalida: horario.hora_salida,
          horatrabajadas: "8",
        };
      }),
    };

    await doc.table(tablaDatosHorario, {
      width: 450,
      x: 50,
      y: 200,
      prepareRow: (
        row: string[],
        indexColumn: number,
        indexRow: number,
        rectRow: { x: number; y: number; width: number; height: number },
        rectCell: { x: number; y: number; width: number; height: number }
      ) => {
        const { x, y, width, height } = rectCell;

        if (indexColumn === 0) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + height)
            .stroke();
        }

        doc
          .lineWidth(0.5)
          .moveTo(x + width, y)
          .lineTo(x + width, y + height)
          .stroke();

        if (indexRow === tablaDatosHorario.datas.length - 1) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y + height)
            .lineTo(x + width, y + height)
            .stroke();
        }
      },
    });

    const tablaDatosPago = {
      title: "Planilla de pagos del Trabajador",
      headers: [
        {
          label: "Fecha de pago",
          property: "fecha",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Monto Pagado",
          property: "montoP",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Monto Faltante",
          property: "montoF",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas: [{ fecha: "12/14/23", montoP: "1300", montoF: "0" }],
    };

    await doc.table(tablaDatosPago, {
      width: 450,
      x: 50,
      y: 280,
      prepareRow: (
        row: string[],
        indexColumn: number,
        indexRow: number,
        rectRow: { x: number; y: number; width: number; height: number },
        rectCell: { x: number; y: number; width: number; height: number }
      ) => {
        const { x, y, width, height } = rectCell;

        if (indexColumn === 0) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + height)
            .stroke();
        }

        doc
          .lineWidth(0.5)
          .moveTo(x + width, y)
          .lineTo(x + width, y + height)
          .stroke();

        if (indexRow === tablaDatosPago.datas.length - 1) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y + height)
            .lineTo(x + width, y + height)
            .stroke();
        }
      },
    });

    const tablaDatosIncidencias = {
      title: "Incidencias del Trabajador",
      headers: [
        {
          label: "Tipo",
          property: "tipo",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Fecha",
          property: "fecha",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Descripcion",
          property: "descripcion",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas: incidenciasData.map((incidencia:any)=>{
        return{
          tipo:incidencia.tipo,
          fecha:incidencia.fecha,
          descripcion:incidencia.descripcion
        }
      }),
    };

    await doc.table(tablaDatosIncidencias, {
      width: 450,
      x: 50,
      y: 350,
      prepareRow: (
        row: string[],
        indexColumn: number,
        indexRow: number,
        rectRow: { x: number; y: number; width: number; height: number },
        rectCell: { x: number; y: number; width: number; height: number }
      ) => {
        const { x, y, width, height } = rectCell;

        if (indexColumn === 0) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + height)
            .stroke();
        }

        doc
          .lineWidth(0.5)
          .moveTo(x + width, y)
          .lineTo(x + width, y + height)
          .stroke();

        if (indexRow === tablaDatosIncidencias.datas.length - 1) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y + height)
            .lineTo(x + width, y + height)
            .stroke();
        }
      },
    });

    doc.end();

    return {
      message: "Reporte generado exitosamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};
