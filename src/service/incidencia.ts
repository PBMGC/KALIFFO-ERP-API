import { query } from "../util/query";

export const _createIncidencia = async (incidencia: any) => {
  const { tipo, descripcion, usuario_id } = incidencia;
  incidencia.fecha_creacion = new Date();

  try {
    const result = await query("call SP_CreateIncidencia(?, ?, ?, ?)", [
      tipo,
      descripcion,
      usuario_id,
      incidencia.fecha_creacion,
    ]);

    return {
      message: "EXITO AL AÑADIR",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear incidencia:", error);
    return {
      message: "error _createIncidencia",
      success: false,
      status: 500,
    };
  }
};

export const _getIncidencias = async (usuario_id?: number) => {
  try {
    const result = await query("call SP_GetIncidencias(?)", [
      usuario_id || null,
    ]);

    return {
      items: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getIncidencias",
      success: false,
      status: 500,
    };
  }
};

export const _getIncidencia = async (incidencia_id: number) => {
  try {
    const result = await query("call SP_GetIncidencia(?)", [incidencia_id]);

    return {
      item: result.data[0][0],
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getIncidencia",
      success: false,
      status: 500,
    };
  }
};

export const _deleteIncidencia = async (incidencia_id: number) => {
  try {
    const result = await query("call SP_DeleteIncidencia(?)", [incidencia_id]);

    if (result.data.affectedRows === 0) {
      return {
        message: "Error al borrar o no se encontro incidencia",
        success: false,
        status: 500,
      };
    }

    return {
      message: `Se elimino incidencia con id : ${incidencia_id}`,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _deleteIncidencia",
      success: false,
      status: 500,
    };
  }
};

export const _updateIncidencia = async (
  incidencia_id: number,
  updatedIncidencia: any
) => {
  const { tipo, descripcion } = updatedIncidencia;

  try {
    const result = await query(`CALL SP_UpdateIncidencia(?,?,?,?)`, [
      incidencia_id,
      tipo || null,
      descripcion || null,
      null,
    ]);

    if (result.affectedRows === 0) {
      return {
        message: "Incidencia no encontrada o no actualizada",
        success: false,
        status: 404,
      };
    }

    return {
      message: "Incidencia actualizada correctamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al actualizar la incidencia:", error);
    return {
      message: "error _updateIncidencia",
      success: false,
      status: 500,
    };
  }
};
