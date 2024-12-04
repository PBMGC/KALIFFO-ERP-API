import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { query } from "../util/query";
import { Usuario } from "../interface/usuario";

dotenv.config();

export const _createUsuario = async (usuario: Usuario) => {
  try {
    const hashPassword = await bcrypt.hash(usuario.password, 8);
    usuario.password = hashPassword;

    const result = await query(
      "INSERT INTO usuario (username, password, rol, id_tipo) values (?, ?, ?, ?)",
      [usuario.username, usuario.password, usuario.rol, usuario.id_tipo]
    );

    if (result.error) {
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    return {
      message: "usuario creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error _createUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _login = async (username: string, password: string) => {
  try {
    const resultUsuario = (await query(
      "select * from usuario where username = ?",
      [username]
    )) as any;

    const usuario = resultUsuario.data[0];

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return {
        message: "username o password incorrectos",
        success: false,
        status: 400,
      };
    }

    const token = jwt.sign(
      {
        rol_id: usuario.rol_id,
        id_tipo: usuario.id_tipo,
        username: usuario.username,
        rol: usuario.rol,
      },
      process.env.SECRET_KEY || "password"
    );

<<<<<<< HEAD
=======
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
        width: 500,
        x: 50,
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
>>>>>>> f719020c89cb94ece39d97c1a83a46a338cc92ec
    return {
      message: `Bienvenido ${usuario.username}`,
      rol: usuario.rol,
      id_tipo: usuario.id_tipo,
      token,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "error _login",
      success: false,
      status: 500,
    };
  }
};
<<<<<<< HEAD
=======

export const _login = async (dni: string, contraseña: string) => {
  try {
    const resultUsuario = (await query("select * from usuario where dni = ?", [
      dni,
    ])) as any;

    const usuario = resultUsuario.data[0];

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
        dni: usuario.dni,
      },
      process.env.SECRET_KEY || "contraseña_default"
    );

    return {
      message: `Bienvenido ${usuario.nombre}`,
      token,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "error _login",
      success: false,
      status: 500,
    };
  }
};

export const signUp = () => {
  try {
  } catch (error) {}
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
>>>>>>> f719020c89cb94ece39d97c1a83a46a338cc92ec
