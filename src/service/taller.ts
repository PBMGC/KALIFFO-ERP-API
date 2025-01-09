import { query } from "../util/query";
import { _createProductoCompleto, _imprimirCodigo } from "./producto";

// Función para crear un nuevo registro de 'acabado' (acabado o proceso de finalización)
export const _createAcabado = async (acabado: any) => {
  const {
    lote_id, // ID del lote
    color_id, // ID del color
    talla, // Talla
    cantidad_recibida, // Cantidad recibida
    fecha_inicio, // Fecha de inicio
    fecha_final, // Fecha final
  } = acabado;

  // Consulta SQL para insertar un nuevo registro en la tabla 'taller_acabado'
  const queryText = `
    INSERT INTO taller_acabado (lote_id, color_id, talla, cantidad_recibida, fecha_inicio, fecha_final)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    // Ejecutar la consulta para insertar los datos
    const result = await query(queryText, [
      lote_id,
      color_id,
      talla,
      cantidad_recibida,
      fecha_inicio,
      fecha_final,
    ]);

    // Retorna un mensaje de éxito si la inserción fue exitosa
    return {
      message: "Acabado creado con éxito.",
      success: true,
      status: 201,
    };
  } catch (error: any) {
    // Retorna un mensaje de error en caso de fallo
    return {
      message: "Error al crear el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para obtener todos los 'acabados' (procesos de finalización) que no están en estado inactivo
export const _getAcabados = async () => {
  try {
    const queryText = `SELECT * FROM taller_acabado where estado != 0`;
    const result = await query(queryText);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los acabados.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para obtener un 'acabado' (proceso de finalización) específico por su ID
export const _getAcabado = async (acabado_id: number) => {
  try {
    const queryText = `SELECT * FROM taller_acabado WHERE acabado_id = ? and estado != 0`;
    const result = await query(queryText, [acabado_id]);

    if (result.data && result.data.length === 0) {
      return {
        message: "Acabado no encontrado.",
        success: false,
        status: 404,
      };
    }

    return {
      item: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para obtener todos los 'acabados' de un 'lote' (lote de producción)
export const _getAcabadoLote = async (lote_id: string) => {
  try {
    const result = await query(
      "SELECT ta.acabado_id, co.codigo, ta.talla, ta.cantidad_enviada, ta.cantidad_recibida, ta.estado, ta.fecha_inicio, ta.fecha_final FROM taller_acabado ta INNER JOIN color co on ta.color_id = co.color_id WHERE lote_id = ?",
      [lote_id]
    );

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para activar un 'acabado' (pasarlo al estado activo)
export const _activarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabado SET estado = 1 WHERE acabado_id = ? AND estado != 1";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido activado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba activado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al activar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para desactivar un 'acabado' (pasarlo al estado inactivo)
export const _desactivarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabado SET estado = 0 WHERE acabado_id = ? AND estado != 0";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido desactivado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba desactivado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al desactivar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// Función para realizar una transición de estado de todos los 'acabados' de un 'lote' (lote de producción)
export const _sgteEstadoAcabadosPorLote = async (
  res: any,
  lote_id: string,
  tienda_id: string,
  almacen_id: string,
  detalles: { acabado_id: number; cantidad_recibida: number }[] // Detalles de cada acabado y su cantidad recibida
) => {
  try {
    const result = await query(
      "SELECT * FROM taller_acabado WHERE lote_id = ?",
      [lote_id]
    );
    const acabados = result.data;

    if (!acabados || acabados.length === 0) {
      return {
        message: "No se encontraron acabados asociados al lote",
        success: false,
        status: 404,
      };
    }

    const resultados: any[] = [];
    let cantidadTotal = 0;

    // Recorre los detalles de los acabados y procesa según su estado
    for (const detalle of detalles) {
      const acabado = acabados.find(
        (a: any) => a.acabado_id === detalle.acabado_id
      );

      if (!acabado) {
        resultados.push({
          acabado_id: detalle.acabado_id,
          message: "Acabado no encontrado en la base de datos",
          success: false,
          status: 404,
        });
        continue;
      }

      // Switch para procesar según el estado actual del acabado
      switch (acabado.estado) {
        case 0: // Inactivo
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Este acabado está desactivado",
            success: false,
            status: 400,
          });
          break;

        case 1: // Activo
          console.log("============");
          console.log("Entro al caso 1");
          await caso1(detalle.acabado_id, resultados); // Procesa transición a estado 2
          break;

        case 2: // En proceso
          console.log("============");
          console.log("Entro al caso 2");
          await caso2(
            lote_id,
            tienda_id,
            almacen_id,
            detalle.acabado_id,
            detalle.cantidad_recibida,
            acabado.cantidad_enviada,
            resultados,
            cantidadTotal,
            res
          );
          break;

        case 3: // Finalizado
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Este acabado está finalizado",
            success: false,
            status: 400,
          });
          break;

        default:
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Estado del acabado no reconocido",
            success: false,
            status: 400,
          });
          break;
      }
    }

    // Actualiza la cantidad total del lote después de procesar todos los acabados
    await query("UPDATE lote SET cantidad_total = ? WHERE lote_id = ?", [
      cantidadTotal,
      lote_id,
    ]);

    return {
      message: "Proceso completado para todos los acabados del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    console.error("Error en _sgteEstadoAcabadosPorLote:", error);
    return {
      message: "Error en _sgteEstadoAcabadosPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};

// Función para procesar la transición de estado de un 'acabado' cuando está en estado activo (estado 1)
const caso1 = async (acabado_id: number, resultados: any[]) => {
  try {
    console.log("============");
    console.log("Entro a la funcion caso 1");
    const { affectedRows } = await query(
      "UPDATE taller_acabado SET estado = 2 WHERE acabado_id = ?",
      [acabado_id]
    );

    // Retorna el resultado de la operación de actualización
    resultados.push({
      acabado_id,
      message:
        affectedRows > 0
          ? "El acabado ha pasado al estado 2 (en proceso)"
          : "No se pudo actualizar el estado del acabado a 2",
      nuevoEstado: affectedRows > 0 ? 2 : undefined,
      success: affectedRows > 0,
      status: affectedRows > 0 ? 200 : 500,
    });
  } catch (error) {
    console.error("Error en caso1:", error);
    resultados.push({
      acabado_id,
      message: "Ocurrió un error al intentar actualizar el acabado",
      success: false,
      status: 500,
    });
  }
};

// Función para procesar la transición de estado cuando el 'acabado' está en proceso (estado 2)
const caso2 = async (
  lote_id: string,
  tienda_id: string,
  almacen_id: string,
  acabado_id: number,
  cantidad_recibida: number,
  cantidad_enviada: number,
  resultados: any[],
  cantidad_total: number,
  res: any
) => {
  console.log("============");
  console.log("Entro a la funcion caso 2");

  // Validaciones antes de procesar la transición de estado
  if (!cantidad_recibida) {
    return resultados.push({
      acabado_id,
      message: "Campo 'cantidad_recibida' obligatorio.",
      success: false,
      status: 400,
    });
  }

  if (cantidad_recibida > cantidad_enviada) {
    return resultados.push({
      acabado_id,
      message: "La cantidad recibida es mayor a la cantidad enviada",
      success: false,
      status: 400,
    });
  }

  cantidad_total += cantidad_recibida; // Actualiza la cantidad total

  const now = new Date().toISOString();

  try {
    // Actualiza los registros de 'acabado' y 'lote'
    const [updateAcabado, updateLote] = await Promise.all([
      query(
        "UPDATE taller_acabado SET estado = 3, cantidad_recibida = ?, fecha_final = ? WHERE acabado_id = ?",
        [cantidad_recibida, now, acabado_id]
      ),
      query("UPDATE lote SET estado = 4 WHERE lote_id = ?", [lote_id]),
    ]);

    if (updateAcabado.affectedRows > 0 && updateLote.affectedRows > 0) {
      const datos = await obtenerProductosTaller(lote_id); // Obtiene los productos asociados al lote
      await procesoCrearProductos(datos, tienda_id, almacen_id, lote_id, res); // Crea los productos
    } else {
      resultados.push({
        acabado_id,
        message: "No se pudo actualizar el estado del acabado o del lote.",
        success: false,
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error en caso2:", error);
    resultados.push({
      acabado_id,
      message: "Error al actualizar estado.",
      success: false,
      status: 500,
    });
  }
};

// Función para obtener los detalles de productos asociados a un 'lote' desde el taller
async function obtenerProductosTaller(lote_id: string) {
  return await query(
    `
    SELECT 
          c.producto_id,
          ta.color_id,
          ta.cantidad_recibida as stock,
          ta.talla
      FROM 
          taller_acabado ta
      INNER JOIN 
          lavanderia l ON ta.lavanderia_id = l.lavanderia_id
      INNER JOIN 
          corte c ON l.corte_id = c.corte_id
      WHERE 
          ta.lote_id = ?
    `,
    [lote_id]
  );
}

// Función para manejar la creación de productos basados en los datos procesados
async function procesoCrearProductos(
  datos: any,
  tienda_id: string,
  almacen_id: string,
  lote_id: string,
  res: any
) {
  const productosOrdenados = datos.data.reduce((acc: any, producto: any) => {
    const { producto_id, ...detalle } = producto;
    const existe = acc.find((item: any) => item.producto_id === producto_id);
    if (existe) {
      existe.detalle.push(detalle);
    } else {
      acc.push({ producto_id, detalle: [detalle] });
    }
    return acc;
  }, []);

  // Crear productos para cada producto agrupado
  for (const producto of productosOrdenados) {
    await _createProductoCompleto(
      tienda_id,
      almacen_id,
      producto.producto_id,
      producto.detalle,
      lote_id
    );
  }

  return;
}
