import sequelize from "../db/connection";

const crearProcedimiento = async () => {
  try {
    await sequelize.query(`
      CREATE PROCEDURE SumarUnoMasUno()
      BEGIN
        SELECT 5 + 1 AS Resultado;
      END;
    `);
  } catch (error) {
    console.log("error al crear el procedimiento");
    console.error(error);
  }
};

const eliminarProcedimiento = async () => {
  try {
    await sequelize.query(`DROP PROCEDURE IF EXISTS SumarUnoMasUno;`);
  } catch (error) {
    console.log("error al eliminar procedimientos");
    console.error(error);
  }
};

export const initProcedure = async () => {
  await eliminarProcedimiento();
  await crearProcedimiento();
};
