import sequelize from "../db/connection";

const createProcedure = async () => {
  await sequelize.query(`
    CREATE PROCEDURE SumarUnoMasUno()
    BEGIN
      SELECT 5 + 1 AS Resultado;
    END;
  `);
};

const borrarProcedure = async () => {
  await sequelize.query(`DROP PROCEDURE IF EXISTS SumarUnoMasUno;`);
};

export const initProcedure = async () => {
  await borrarProcedure();
  await createProcedure();
};
