import { query } from "../util/query";

/**
 * Crea una nueva incidencia en la base de datos.
 */
export const _createIncidencia = async (incidencia: any) => {
  const { tipo, descripcion, trabajador_id,fecha } = incidencia;
  incidencia.fecha = new Date(); // Establece la fecha de creación de la incidencia.

  try {
    // Llama al procedimiento almacenado para insertar una nueva incidencia en la base de datos.
    const result = await query("call SP_CreateIncidencia(?, ?, ?, ?)", [
      tipo,
      descripcion,
      trabajador_id,
      incidencia.fecha,
    ]);

    return {
      message: "EXITO AL AÑADIR", // Mensaje de éxito al agregar la incidencia.
      success: true,
      status: 201, // Código de estado HTTP para la creación exitosa.
    };
  } catch (error) {
    console.error("Error al crear incidencia:", error); // Registra el error en la consola.
    return {
      message: "error _createIncidencia", // Mensaje de error si ocurre un fallo.
      success: false,
      status: 500, // Código de estado HTTP para error en el servidor.
    };
  }
};

/**
 * Obtiene todas las incidencias o solo las de un usuario específico si se proporciona el ID de usuario.
 */
export const _getIncidencias = async (usuario_id?: number) => {
  try {
    // Llama al procedimiento almacenado para obtener las incidencias. Si se proporciona un ID de usuario, se filtra.
    const result = await query("call SP_GetIncidencias(?)", [
      usuario_id || null, // Si no se pasa un ID de usuario, se obtienen todas las incidencias.
    ]);

    return {
      items: result.data[0], // Devuelve la lista de incidencias obtenidas.
      success: true,
      status: 200, // Código de estado HTTP para operación exitosa.
    };
  } catch (error) {
    return {
      message: "error _getIncidencias", // Mensaje de error si ocurre un fallo.
      success: false,
      status: 500, // Código de estado HTTP para error en el servidor.
    };
  }
};

/**
 * Obtiene una incidencia específica por su ID.
 */
export const _getIncidencia = async (incidencia_id: number) => {
  try {
    // Llama al procedimiento almacenado para obtener una incidencia específica por ID.
    const result = await query("call SP_GetIncidencia(?)", [incidencia_id]);

    return {
      item: result.data[0][0], // Devuelve la incidencia obtenida.
      success: true,
      status: 200, // Código de estado HTTP para operación exitosa.
    };
  } catch (error) {
    return {
      message: "error _getIncidencia", // Mensaje de error si ocurre un fallo.
      success: false,
      status: 500, // Código de estado HTTP para error en el servidor.
    };
  }
};

/**
 * Elimina una incidencia por su ID.
 */
export const _deleteIncidencia = async (incidencia_id: number) => {
  try {
    // Llama al procedimiento almacenado para eliminar una incidencia por ID.
    const result = await query("call SP_DeleteIncidencia(?)", [incidencia_id]);

    // Verifica si la incidencia fue eliminada correctamente.
    if (result.data.affectedRows === 0) {
      return {
        message: "Error al borrar o no se encontró incidencia", // Mensaje si no se pudo eliminar la incidencia.
        success: false,
        status: 500, // Código de estado HTTP para error en el servidor.
      };
    }

    return {
      message: `Se eliminó incidencia con ID: ${incidencia_id}`, // Mensaje de éxito al eliminar la incidencia.
      success: true,
      status: 200, // Código de estado HTTP para operación exitosa.
    };
  } catch (error) {
    return {
      message: "error _deleteIncidencia", // Mensaje de error si ocurre un fallo.
      success: false,
      status: 500, // Código de estado HTTP para error en el servidor.
    };
  }
};

/**
 * Actualiza una incidencia con nuevos datos.
 */
export const _updateIncidencia = async (
  incidencia_id: number,
  updatedIncidencia: any
) => {
  const { tipo, descripcion } = updatedIncidencia;

  try {
    // Llama al procedimiento almacenado para actualizar una incidencia por ID.
    const result = await query(`CALL SP_UpdateIncidencia(?,?,?,?)`, [
      incidencia_id,
      tipo || null,
      descripcion || null,
      null,
    ]);

    // Verifica si la incidencia fue actualizada correctamente.
    if (result.affectedRows === 0) {
      return {
        message: "Incidencia no encontrada o no actualizada", // Mensaje si la incidencia no se encontró o no se actualizó.
        success: false,
        status: 404, // Código de estado HTTP para no encontrado.
      };
    }

    return {
      message: "Incidencia actualizada correctamente", // Mensaje de éxito al actualizar la incidencia.
      success: true,
      status: 200, // Código de estado HTTP para operación exitosa.
    };
  } catch (error) {
    console.error("Error al actualizar la incidencia:", error); // Registra el error en la consola.
    return {
      message: "error _updateIncidencia", // Mensaje de error si ocurre un fallo.
      success: false,
      status: 500, // Código de estado HTTP para error en el servidor.
    };
  }
};
