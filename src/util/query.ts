import connection from "../db/connection";

export const query = async (consulta: string, params?: any[]) => {
  let conn;

  try {
    conn = await connection();

    if (!conn) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    const [result] = (await conn.execute(consulta, params)) as any;

    return {
      success: true,
      data: result,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    console.error("Error en la consulta:", error);
    return {
      error: error instanceof Error ? error.message : "Error desconocido",
      success: false,
      status: 400,
    };
  } finally {
    if (conn) await conn.end();
  }
};
