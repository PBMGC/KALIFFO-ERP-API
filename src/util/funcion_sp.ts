import { executeDDL } from "./query";

export const createSp = async (
  nombre: string,
  queryCodigo: string,
  parametros: string = ""
) => {
  try {
    const sql = `
      CREATE PROCEDURE ${nombre}(${parametros})
      BEGIN
        ${queryCodigo}
      END;
    `;
    await executeDDL(sql);
  } catch (error) {
    console.error(`Error al crear el procedimiento ${nombre}:`, error);
  }
};

export const eliminarProcedimiento = async (nombre: string) => {
  try {
    const sql = `DROP PROCEDURE IF EXISTS ${nombre};`;
    await executeDDL(sql);
  } catch (error) {
    console.error(`Error al eliminar el procedimiento ${nombre}:`, error);
  }
};
