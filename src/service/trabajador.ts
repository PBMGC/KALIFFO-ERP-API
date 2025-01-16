import dotenv from "dotenv";
import { query } from "../util/query";
import { Trabajador } from "../interface/trabajador";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

/**
 * Crea un nuevo trabajador en la base de datos.
 * @param trabajador Objeto con los datos del trabajador.
 * @returns Resultado de la operación.
 */
export const _createTrabajador = async (trabajador: Trabajador) => {
  try {
    const result = await query("call SP_CreateTrabajador(?,?,?,?,?,?,?,?,?)", [
      trabajador.nombre,
      trabajador.ap_paterno,
      trabajador.ap_materno,
      trabajador.fecha_nacimiento,
      trabajador.telefono,
      trabajador.dni,
      trabajador.sueldo,
      trabajador.tienda_id || null,
      trabajador.rol,
    ]);

    // Si hubo un error en la consulta, se devuelve un mensaje de error
    if (result.error) {
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    // Si la creación fue exitosa
    return {
      message: "Trabajador creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error _createTrabajador",
      success: false,
      status: 500,
    };
  }
};

/**
 * Obtiene la lista de trabajadores según los filtros proporcionados.
 * @param rol Rol del trabajador (opcional).
 * @param tienda_id ID de la tienda (opcional).
 * @param antiTienda_id ID de la tienda anterior (opcional).
 * @returns Lista de trabajadores.
 */
export const _getTrabajadores = async (
  rol?: number,
  tienda_id?: number,
  antiTienda_id?: number
) => {
  try {
    const trabajadores = (await query(`CALL SP_GetTrabajadores(?,?,?)`, [
      rol || null,
      tienda_id || null,
      antiTienda_id || null,
    ])) as any;

    // Mapear los datos obtenidos para devolverlos en el formato adecuado
    const trabajadoresData = trabajadores.data[0].map((trabajador: any) => {
      return {
        ...trabajador,
      };
    });

    return {
      items: trabajadoresData,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
    return {
      message: "Error al obtener trabajadores",
      success: false,
      status: 500,
    };
  }
};

/**
 * Obtiene los datos de un trabajador específico.
 * @param trabajador_id ID del trabajador a obtener.
 * @returns Datos del trabajador.
 */
export const _getTrabajador = async (trabajador_id: string) => {
  try {
    const trabajador = (await query(`CALL SP_GetTrabajador(?)`, [
      trabajador_id,
    ])) as any;

    // Mapear los datos obtenidos para devolverlos en el formato adecuado
    const trabajadoresData = trabajador.data[0].map((trabajadorD: any) => {
      return {
        ...trabajadorD,
      };
    });

    return {
      items: trabajadoresData[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error _getTrabajador", error);
    return {
      message: "Error _getTrabajador",
      success: false,
      status: 500,
    };
  }
};

/**
 * Elimina un trabajador de la base de datos.
 * @param trabajador_id ID del trabajador a eliminar.
 * @returns Resultado de la operación.
 */
export const _deleteTrabajador = async (trabajador_id: string) => {
  try {
    await query(`Call SP_DeleteTrabajador(?)`, [trabajador_id]);

    return {
      message: "Trabajador eliminado exitosamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _deleteTrabajador",
      success: false,
      status: 500,
    };
  }
};

/**
 * Actualiza los datos de un trabajador en la base de datos.
 * @param trabajador Objeto con los datos a actualizar.
 * @returns Resultado de la operación.
 */
export const _updateTrabajador = async (trabajador: Partial<Trabajador>) => {
  try {
    // Llamada al procedimiento almacenado para actualizar el trabajador
    (await query(`CALL SP_UpdateTrabajador(?,?,?,?,?,?,?,?,?,?)`, [
      trabajador.trabajador_id,
      trabajador.nombre || null,
      trabajador.ap_paterno || null,
      trabajador.ap_materno || null,
      trabajador.fecha_nacimiento || null,
      trabajador.telefono || null,
      trabajador.dni || null,
      trabajador.sueldo || null,
      trabajador.tienda_id || null,
      trabajador.rol || null,
    ])) as any;

    return {
      message: "Trabajador actualizado",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _updateTrabajador",
      success: false,
      status: 500,
    };
  }
};

/**
 * Elimina un horario de asistencia.
 * @param horario_id ID del horario a eliminar.
 * @returns Resultado de la operación.
 */
export const _deleteAsistencia = async (horario_id: number) => {
  try {
    await query(`CALL SP_DeleteHorario(${horario_id})`);

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

/**
 * Genera un reporte en formato PDF para un trabajador específico.
 * @param res Objeto de respuesta HTTP.
 * @param trabajador_id ID del trabajador.
 * @returns Resultado de la operación.
 */
export const _generarReporte = async (res: any, trabajador_id: number,tipo:number) => {
  const consultas = ["1=1",`'fecha BETWEEN DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, "%Y-%m-01") AND LAST_DAY(CURRENT_DATE - INTERVAL 1 MONTH)'`]
  try {
    const PDFDocument = require("pdfkit-table");

    // Establecer cabeceras para la respuesta HTTP como un archivo PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');

    // Obtener datos del trabajador
    const dataUsuario: any = await query(
      `CALL SP_ReporteTrabajador(${trabajador_id},${consultas[tipo-1]})`
    );

    // Procesar horarios, pagos e incidencias de la base de datos
    const horariodata: any =
      dataUsuario?.data?.[0]?.[0]?.horarios != null
        ? dataUsuario.data[0][0].horarios.split("), (").map((item: string) => {
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

    const pagosData =
      dataUsuario.data[0][0].pagos != null
        ? dataUsuario.data[0][0].pagos.split("), (").map((item: string) => {
            const [fecha, pago_total, pago_faltante] = item
              .replace(/\(|\)/g, "")
              .trim()
              .split(", ");
            return {
              fecha: fecha,
              pago_total: pago_total,
              pago_faltante: pago_faltante,
            };
          })
        : [];

    const incidenciaTIPO: any = { 1: "Familiar", 2: "Laboral", 3: "Otros" };
    const incidenciasData =
      dataUsuario.data[0][0].incidencias != null
        ? dataUsuario.data[0][0].incidencias.split("; ").map((item: any) => {
            const [id, descripcion, fecha] = item
              .replace(/\(|\)/g, "")
              .trim()
              .split(", ");
            return {
              tipo: incidenciaTIPO[Number(id)],
              descripcion: descripcion,
              fecha: fecha,
            };
          })
        : [];

    // Crear documento PDF
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

    // Agregar logo y encabezado al documento PDF
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

    // Crear y mostrar las tablas con los datos del trabajador, horarios, pagos e incidencias
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

    // Función para generar las tablas dentro del documento PDF
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

      // Si la tabla no cabe en la página, agregar una nueva
      if (tablaAltura + posY > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
      }

      return posY + tablaAltura;
    };

    let posY = 120;

    // Generar las tablas
    posY = await nuevaTabla(tablaDatosTrabajador, posY);
    posY = await nuevaTabla(tablaDatosHorario, posY);
    posY = await nuevaTabla(tablaDatosPago, posY);
    posY = await nuevaTabla(tablaDatosIncidencias, posY);

    // Finalizar el documento PDF
    doc.end();
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};
