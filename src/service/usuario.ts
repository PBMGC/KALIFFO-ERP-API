import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { query } from "../util/query";

dotenv.config();

export const _createUsuario = async (usuario: any) => {
  try {
    const result = await query("call SP_CreateUsuario(?,?,?,?,?,?,?,?,?)", [
      usuario.nombre,
      usuario.ap_paterno,
      usuario.ap_materno,
      usuario.fecha_nacimiento,
      usuario.telefono,
      usuario.dni,
      usuario.sueldo,
      usuario.tienda_id || null,
      usuario.rol,
    ]);

    if (result.error) {
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    return {
      message: "Usuario creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error _createUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _getUsuarios = async (
  rol?: number,
  tienda_id?: number,
  antiTienda_id?: number
) => {
  try {
    const usuarios = (await query(`CALL SP_GetUsuarios(?,?,?)`, [
      rol || null,
      tienda_id || null,
      antiTienda_id || null,
    ])) as any;

    const usuariosData = usuarios.data[0].map((usuario: any) => {
      return {
        ...usuario,
      };
    });

    return {
      items: usuariosData,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return {
      message: "Error al obtener usuarios",
      success: false,
      status: 500,
    };
  }
};

export const _getUsuario = async (usuario_id: string) => {
  try {
    const usuario = (await query(`CALL SP_GetUsuario(?)`, [usuario_id])) as any;

    const usuariosData = usuario.data[0].map((usuarioD: any) => {
      return {
        ...usuarioD,
      };
    });

    return {
      items: usuariosData[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error _getUsuario", error);
    return {
      message: "Error _getUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _deleteUsuario = async (usuario_id: string) => {
  try {
    await query(`Call SP_DeleteUsuario(?)`, [usuario_id]);

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

export const _updateUsuario = async (usuario: any) => {
  try {
    (await query(`CALL SP_UpdateUsuario(?,?,?,?,?,?,?,?,?,?)`, [
      usuario.usuario_id,
      usuario.nombre || null,
      usuario.ap_paterno || null,
      usuario.ap_materno || null,
      usuario.fecha_nacimiento || null,
      usuario.telefono || null,
      usuario.dni || null,
      usuario.sueldo || null,
      usuario.tienda_id || null,
      usuario.rol || null,
    ])) as any;

    return {
      message: "Usuario actualizado",
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

export const _deleteAsistencia = async (horario_id: number) => {
  try {
    await query(`
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

export const _generarReporte = async (res: any, usuario_id: number) => {
  try {
    const PDFDocument = require("pdfkit-table");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');

    const dataUsuario: any = await query(
      `CALL SP_ReporteUsuario(${usuario_id})`
    );

    const horariodata: any = dataUsuario?.data?.[0]?.[0]?.horarios != null
    ? dataUsuario.data[0][0].horarios
        .split("), (")
        .map((item: string) => {
          const [fecha, hora_entrada, hora_salida] = item
            .replace(/\(|\)/g, "")
            .trim()
            .split(", ");
          return {
            fecha: fecha,
            hora_entrada: hora_entrada,
            hora_salida: hora_salida,
          };
        })
    : []; 
  

    const pagosData = dataUsuario.data[0][0].pagos!=null?
    dataUsuario.data[0][0].pagos.split("), (")
      .map((item: string) => {
        const [fecha, pago_total, pago_faltante] = item
          .replace(/\(|\)/g, "")
          .trim()
          .split(", ");
        return {
          fecha: fecha,
          pago_total: pago_total,
          pago_faltante: pago_faltante,
        };
      }):[];

    const incidenciaTIPO: any = { 1: "Familiar", 2: "Laboral", 3: "Otros" };
    const incidenciasData = dataUsuario.data[0][0].incidencias!=null?
      dataUsuario.data[0][0].incidencias.split("; ")
      .map((item: any) => {
        const [id, descripcion, fecha] = item
          .replace(/\(|\)/g, "")
          .trim()
          .split(", ");
        return {
          tipo: incidenciaTIPO[Number(id)],
          descripcion: descripcion,
          fecha: fecha,
        };
      }):[];

    const doc = new PDFDocument({
      bufferPages: true,
      title: "Reporte Usuario",
      permissions: {
        printing: "highResolution",
      },
      size: "A4",
      layout: "portrait",
    });

    doc.pipe(res);

    doc.image("src/Img/logo.png", 60, 10, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });
    doc.fontSize(20).text("KALIFFO SAC", 250, 50);
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("REPORTE DE TRABAJADOR", 190, 75);

    const tablaDatosTrabajador = {
      title: `Datos de ${dataUsuario.data[0][0].nombre} ${dataUsuario.data[0][0].ap_paterno} ${dataUsuario.data[0][0].ap_materno}`,
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
            dataUsuario.data[0][0].nombre +
            " " +
            dataUsuario.data[0][0].ap_paterno +
            " " +
            dataUsuario.data[0][0].ap_materno,
          telefono: dataUsuario.data[0][0].telefono,
          dni: dataUsuario.data[0][0].dni,
          tienda: dataUsuario.data[0][0].tienda,
        },
      ],
    };

    const tablaDatosHorario = {
      title: "Asistencia del Trabajador",
      headers: [
        {
          label: "Fecha",
          property: "fecha",
          headerAlign: "center",
          align: "center",
        },
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
          fecha: horario.fecha,
          horadeentrada: horario.hora_entrada,
          horasalida: horario.hora_salida,
          horatrabajadas: "8",
        };
      }),
    };

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
      datas: pagosData.map((pago: any) => {
        console.log(pago);
        return {
          fecha: pago.fecha,
          montoP: pago.pago_total,
          montoF: pago.pago_faltante,
        };
      }),
    };

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
      datas: incidenciasData.map((incidencia: any) => {
        return {
          tipo: incidencia.tipo,
          fecha: incidencia.fecha,
          descripcion: incidencia.descripcion,
        };
      }),
    };

    const nuevaTabla = async (tablaData: any, posY: number) => {
      const tablaAltura = await doc.table(tablaData, {
        width: 450,
        x: 70,
        y: posY,
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

      if (tablaAltura + posY > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
      }

      return posY + tablaAltura;
    };

    let posY = 120;

    posY = await nuevaTabla(tablaDatosTrabajador, posY);

    posY = await nuevaTabla(tablaDatosHorario, posY);

    posY = await nuevaTabla(tablaDatosPago, posY);

    posY = await nuevaTabla(tablaDatosIncidencias, posY);

    doc.end();
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};

// export const _horaEntrada = async (usuario_id: number) => {
//   try {
//     const now = new Date();
//     const fecha = now.toLocaleDateString("en-CA");
//     const horaEntrada = now.toLocaleTimeString("en-US", { hour12: false });

//     const asistenciaExistente = await Horario.findOne({
//       where: { fecha: fecha, usuario_id: usuario_id, hora_salida: null },
//     });

//     if (asistenciaExistente) {
//       return {
//         message: "Asistencia ya registrada para hoy",
//         success: false,
//         status: 400,
//       };
//     }

//     const newHorario = await Horario.create({
//       hora_entrada: horaEntrada,
//       hora_salida: null,
//       fecha: fecha,
//       usuario_id,
//     });

//     return {
//       message: newHorario,
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     return {
//       message: "error _horaEntrada",
//       success: false,
//       status: 500,
//     };
//   }
// };

// export const _horaSalida = async (usuario_id: number) => {
//   try {
//     const now = new Date();
//     const fecha = now.toLocaleDateString("en-CA");
//     const horaSalida = now.toLocaleTimeString("en-US", { hour12: false });

//     const asistencia = await Horario.findOne({
//       where: { usuario_id: usuario_id, fecha: fecha, hora_salida: null },
//     });

//     if (!asistencia) {
//       return {
//         message: "Primero debes registrar la hora de entrada",
//         success: false,
//         status: 400,
//       };
//     }

//     asistencia.hora_salida = horaSalida;
//     await asistencia.save();

//     return {
//       message: asistencia,
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     return {
//       message: "error _ horaSalida",
//       success: false,
//       status: 500,
//     };
//   }
// };

// export const _horasTrabajadas = async (usuario_id: number) => {
//   try {
//     const items = await Horario.findAll({
//       attributes: [
//         "horario_id",
//         "hora_entrada",
//         "hora_salida",
//         "fecha",
//         "usuario_id",
//         [
//           sequelize.literal(
//             "FLOOR(TIME_TO_SEC(TIMEDIFF(hora_salida, hora_entrada)) / 60)"
//           ),
//           "min_trabajados",
//         ],
//       ],
//       where: { usuario_id },
//     });

//     return {
//       items,
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     return {
//       message: "error _horasTrabajadas",
//       success: false,
//       status: 500,
//     };
//   }
// };

// //Sql puro
