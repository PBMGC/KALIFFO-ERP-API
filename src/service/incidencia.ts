import connection from "../db/connection";
import { query } from "../util/query";

export const _createIncidencia = async (incidencia: any) => {
  const { tipo,descripcion, usuario_id } = incidencia; // Asumiendo que tienes una descripción y un usuario ID
  incidencia.fecha_creacion = new Date();

  const query = `
    INSERT INTO incidencia (tipo,descripcion,usuario_id, fecha_creacion)
    VALUES (?,?, ?, ?)`;

  let conn;

  try {
    conn = await connection();

    if (!conn) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    const [result] = await conn.execute(query, [
      tipo,
      descripcion,
      usuario_id,
      incidencia.fecha_creacion,
    ]);
    return {
      message:"EXITO AL AÑADIR",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear incidencia:", error);
    return {
      msg: "error _createIncidencia",
      success: false,
      status: 500,
    };
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};

export const _getIncidencias = async (usuario_id?: number) => {
  const consulta = usuario_id
    ? `SELECT * FROM incidencia WHERE usuario_id = ?`
    : `SELECT * FROM incidencia`;

  try {
    const result = await query(consulta,[usuario_id]) as any;

    console.log(result.data)

    return {
      items: result.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    return {
      msg: "error _getIncidencias",
      success: false,
      status: 500,
    };
  }
};

export const _getIncidencia = async (incidencia_id: number) => {
  const query = `SELECT * FROM incidencia WHERE incidencia_id = ?`;

  let conn;

  try {
    conn = await connection();

    if (!conn) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    const [item] = (await conn.execute(query, [incidencia_id])) as any;

    if (item.length === 0) {
      return {
        msg: "Incidencia no encontrada",
        success: false,
        status: 404,
      };
    }

    return {
      item: item[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener la incidencia:", error);
    return {
      msg: "error _getIncidencia",
      success: false,
      status: 500,
    };
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};

export const _deleteIncidencia = async (incidencia_id: number) => {
  const query = `DELETE FROM incidencia WHERE incidencia_id = ?`;

  let conn;

  try {
    conn = await connection();

    if (!conn) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    const result = (await conn.execute(query, [incidencia_id])) as any;

    if (result[0].affectedRows === 0) {
      return {
        msg: "No se encontró la incidencia",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "Incidencia eliminada",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar la incidencia:", error);
    return {
      msg: "error _deleteIncidencia",
      success: false,
      status: 500,
    };
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};

export const _updateIncidencia = async (
  incidencia_id: number,
  updatedIncidencia: any
) => {
  const { tipo ,descripcion } = updatedIncidencia;

  try {

    const result = await query(`CALL SP_UpdateIncidencia(?,?,?,?)`,[
      incidencia_id,
      tipo||null,
      descripcion||null,
      null,
    ])

    if (result.affectedRows === 0) {
      return {
        msg: "Incidencia no encontrada o no actualizada",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "Incidencia actualizada correctamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al actualizar la incidencia:", error);
    return {
      msg: "error _updateIncidencia",
      success: false,
      status: 500,
    };
  }
};
