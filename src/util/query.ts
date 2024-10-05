import connection from "../db/connection";

// Función para ejecutar consultas generales (SELECT, UPDATE, DELETE)
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
      insertId: result.insertId || null,
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

// Función para ejecutar comandos DDL
export const executeDDL = async (ddl: string) => {
  let conn;

  try {
    conn = await connection();

    if (!conn) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    await conn.query(ddl); // Ejecutar el DDL directamente

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en la ejecución del DDL:", error);
    return {
      error: error instanceof Error ? error.message : "Error desconocido",
      success: false,
      status: 400,
    };
  } finally {
    if (conn) await conn.end();
  }
};
