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
        tipo = IF(p_tipo IS NOT NULL AND p_tipo != '', p_tipo, tipo), 
        descripcion = IF(p_descripcion IS NOT NULL AND p_descripcion != '', p_descripcion, descripcion), 
        fecha_creacion = IF(p_fecha IS NOT NULL, p_fecha, fecha_creacion)
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

const queryGetUsuarios = `
SELECT 
    usuario.usuario_id,
    CONCAT(usuario.nombre, " ", usuario.ap_paterno, " ", usuario.ap_materno) AS nombre_completo,
    usuario.dni,
    usuario.telefono,
    usuario.tienda_id,
    IFNULL((SELECT COUNT(*) 
             FROM incidencia 
             WHERE incidencia.usuario_id = usuario.usuario_id), 0) AS total_incidencias,
    IFNULL(FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(horario.hora_salida, horario.hora_entrada)) / 3600)), 0) AS total_horas_trabajadas
FROM 
    usuario 
LEFT JOIN 
    horario ON usuario.usuario_id = horario.usuario_id
WHERE 
    usuario.rol = u_rol
GROUP BY 
    usuario.usuario_id;
`

export const initProcedureGetUsuarios= async () =>{
  await eliminarProcedimiento("SP_GetUsuarios")
  await crearProcedimiento("SP_GetUsuarios",queryGetUsuarios,"IN u_rol INT")
}

const queryGetUsuario = `
SELECT 
    usuario.usuario_id,
    usuario.nombre, 
    usuario.ap_paterno,
    usuario.ap_materno,
    usuario.dni,
    usuario.telefono,
    usuario.tienda_id,
    usuario.sueldo,
    IFNULL((SELECT COUNT(*) 
             FROM incidencia 
             WHERE incidencia.usuario_id = usuario.usuario_id), 0) AS total_incidencias,
    IFNULL(FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(horario.hora_salida, horario.hora_entrada)) / 3600)), 0) AS total_horas_trabajadas
FROM 
    usuario 
LEFT JOIN 
    horario ON usuario.usuario_id = horario.usuario_id
WHERE 
    usuario.usuario_id=u_id
GROUP BY 
    usuario.usuario_id;

`

export const initProcedureGetUsuario= async () =>{
  await eliminarProcedimiento("SP_GetUsuario")
  await crearProcedimiento("SP_GetUsuario",queryGetUsuario,"IN u_id INT")
}

const queryUpdateUsuario = `
  UPDATE usuario 
  SET
    nombre = IF(p_nombre IS NOT NULL AND p_nombre != '',p_nombre,nombre),
    ap_paterno = IF(p_ap_paterno IS NOT NULL AND p_ap_paterno != '',p_ap_paterno,ap_paterno),
    ap_materno = IF(p_ap_materno IS NOT NULL AND p_ap_materno != '',p_ap_materno,ap_materno),
    fecha_nacimiento = IF(p_fecha_nacimiento IS NOT NULL AND p_fecha_nacimiento != '',p_fecha_nacimiento,fecha_nacimiento),
    telefono = IF(p_telefono IS NOT NULL AND p_telefono != '',p_telefono,telefono),
    dni= IF(p_dni IS NOT NULL AND p_dni != '',p_dni,dni),
    sueldo= IF(p_sueldo IS NOT NULL AND p_sueldo != '',p_sueldo,sueldo),
    tienda_id=IF(p_tienda_id IS NOT NULL AND p_tienda_id != '',p_tienda_id,tienda_id),
    rol=IF(p_rol IS NOT NULL AND p_rol != '',p_rol,rol)
    WHERE usuario_id = u_id;
`;

export const initiProcedureUpdateUsuario = async () =>{
  await eliminarProcedimiento("SP_UpdateUsuario");
  await crearProcedimiento("SP_UpdateUsuario",queryUpdateUsuario,
    "u_id INT,p_nombre varchar(30),p_ap_paterno varchar(30),p_ap_materno varchar(30),p_fecha_nacimiento DATE,p_telefono varchar(10),p_dni varchar(10),p_sueldo INT,p_tienda_id INT,p_rol INT"
  )
}

const queryDeleteUsuario =`
  Delete from usuario where usuario_id = u_id;
`

export const initiProcedureDeleteUsuario = async()=>{
  await eliminarProcedimiento("SP_DeleteUsuario")
  await crearProcedimiento("SP_DeleteUsuario",queryDeleteUsuario,
    "u_id INT"
  )
}


export const initProcedure = async () => {
  await initProcedureColoresProductos();
  await initProcedureUpdateIncidencia();
  await initProcedureDeleteIncidencia();
  await initProcedureDeleteHorario();
  await initProcedureGetUsuarios();
  await initProcedureGetUsuario();
  await initiProcedureUpdateUsuario();
  await initiProcedureDeleteUsuario();
  await initProcedureGetReporteUsuario();
  await initProcedureDeletePago();
};
