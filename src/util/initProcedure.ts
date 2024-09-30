import sequelize from "../db/connection";

//CREADORES
const crearProcedimiento = async (
  nombre: string,
  query: string,
  parametros: string = ""
) => {
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
  await crearProcedimiento(
    "SP_ColoresProductos",
    queryColoresProductos,
    "IN id_p INT"
  );
};

const queryUpdateIncidencias = `
   UPDATE incidencia
   SET
     tipo = IFNULL(p_tipo, tipo),
     descripcion = IFNULL(p_descripcion, descripcion),
     fecha_creacion = IFNULL(p_fecha, fecha_creacion)
   WHERE incidencia_id = i_id;
`;

export const initProcedureUpdateIncidencia = async () => {
  await eliminarProcedimiento("SP_UpdateIncidencia");
  await crearProcedimiento(
    "SP_UpdateIncidencia",
    queryUpdateIncidencias,
    "IN i_id INT, IN p_tipo INT, IN p_descripcion VARCHAR(50), IN p_fecha DATETIME"
  );
};

const queryDeleteIncidencia = `
  DELETE FROM incidencia WHERE incidencia_id = i_id;
`;

export const initProcedureDeleteIncidencia = async () => {
  await eliminarProcedimiento("SP_DeleteIncidencia");
  await crearProcedimiento(
    "SP_DeleteIncidencia",
    queryDeleteIncidencia,
    "IN i_id INT"
  );
};

const queryDeleteHorario = `
  DELETE FROM horario WHERE horario_id = h_id;
`;

export const initProcedureDeleteHorario = async () => {
  await eliminarProcedimiento("SP_DeleteHorario");
  await crearProcedimiento(
    "SP_DeleteHorario",
    queryDeleteHorario,
    "IN h_id INT"
  );
};

const queryGetReporteUsuario = `
  SELECT 
    u.usuario_id, 
    u.nombre, 
    u.ap_paterno, 
    u.ap_materno, 
    u.telefono, 
    u.dni, 
    t.tienda, 
    h.horarios,
    i.incidencias,
    pg.pagos
FROM 
    usuario u 
LEFT JOIN 
    tienda t ON u.tienda_id = t.tienda_id 
LEFT JOIN 
    (SELECT usuario_id, GROUP_CONCAT(CONCAT("(", hora_entrada, ', ', hora_salida, ")") ORDER BY fecha DESC SEPARATOR ', ') AS horarios 
     FROM horario 
     GROUP BY usuario_id) h ON u.usuario_id = h.usuario_id 
LEFT JOIN 
    (SELECT usuario_id, GROUP_CONCAT(DISTINCT CONCAT("(", tipo, ", ", descripcion,", ",fecha_creacion,")") ORDER BY tipo SEPARATOR "; ") AS incidencias 
     FROM incidencia 
     GROUP BY usuario_id) i ON u.usuario_id = i.usuario_id 
LEFT JOIN 
    (SELECT usuario_id, GROUP_CONCAT(DISTINCT CONCAT("(", montoPagado, ", ", montoFaltante, ", ", fecha,")") ORDER BY montoPagado SEPARATOR ", ") AS pagos 
     FROM pago 
     GROUP BY usuario_id) pg ON u.usuario_id = pg.usuario_id 
WHERE 
    u.usuario_id = u_id
ORDER BY 
    u.usuario_id;

`;

export const initProcedureGetReporteUsuario = async () =>{
  await eliminarProcedimiento("SP_ReporteUsuario")
  await crearProcedimiento("SP_ReporteUsuario",queryGetReporteUsuario,"IN u_id INT")
}

const queryDeletePago = `
  DELETE FROM pago WHERE pago_id = p_id;
`;

export const initProcedureDeletePago = async () =>{
  await eliminarProcedimiento("SP_DeletePago")
  await crearProcedimiento("SP_DeletePago",queryDeletePago,"IN p_id INT")
}

export const initProcedure = async () => {
  await initProcedureColoresProductos();
  await initProcedureUpdateIncidencia();
  await initProcedureDeleteIncidencia();
  await initProcedureDeleteHorario();
  await initProcedureGetReporteUsuario();
  await initProcedureDeletePago();
};
