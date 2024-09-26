import sequelize from "../db/connection";


//CREADORES
const crearProcedimiento = async (nombre: string, query: string, parametros: string = '') => {
  try {
    await sequelize.query(`
      CREATE PROCEDURE ${nombre}(${parametros})
      BEGIN
        ${query}
      END;
    `);
  } catch (error) {
    console.error(`Error al crear el procedimiento ${nombre}:`, error);
  }
};

const eliminarProcedimiento = async (nombre: string) => {
  try {
    await sequelize.query(`DROP PROCEDURE IF EXISTS ${nombre};`);
  } catch (error) {
    console.error(`Error al eliminar el procedimiento ${nombre}:`, error);
  }
};


//consulta
const queryColoresProductos = `
  SELECT c.color_id, c.nombre 
  FROM color c 
  INNER JOIN productodetalle p ON c.color_id = p.color_id 
  WHERE p.producto_id = id_p;
`;

export const initProcedureColoresProductos = async () => {
  await eliminarProcedimiento("SP_ColoresProductos");
  await crearProcedimiento("SP_ColoresProductos", queryColoresProductos,"IN id_p INT");
};

export const initProcedure = async () => {
  await initProcedureColoresProductos();
};
