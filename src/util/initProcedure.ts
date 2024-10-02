import { executeDDL } from "./query";

// CREADORES
const crearProcedimiento = async (
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
    await executeDDL(sql); // Usar executeDDL para crear el procedimiento
  } catch (error) {
    console.error(`Error al crear el procedimiento ${nombre}:`, error);
  }
};

const eliminarProcedimiento = async (nombre: string) => {
  try {
    const sql = `DROP PROCEDURE IF EXISTS ${nombre};`;
    await executeDDL(sql); // Usar executeDDL para eliminar el procedimiento
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
    (SELECT usuario_id, GROUP_CONCAT(DISTINCT CONCAT("(", montoPagado, ", ", montoFaltante, ")") ORDER BY montoPagado SEPARATOR ", ") AS pagos
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
    SET @consulta = '
        SELECT 
            usuario.usuario_id,
            usuario.nombre, 
            usuario.ap_paterno,
            usuario.ap_materno,
            usuario.dni,
            usuario.telefono,
            usuario.tienda_id,
            tienda.tienda,
            usuario.sueldo,
            IFNULL((SELECT COUNT(*) 
                    FROM incidencia 
                    WHERE incidencia.usuario_id = usuario.usuario_id), 0) AS total_incidencias,
            IFNULL(FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(horario.hora_salida, horario.hora_entrada)) / 3600)), 0) AS total_horas_trabajadas
        FROM 
            usuario 
        LEFT JOIN 
            horario ON usuario.usuario_id = horario.usuario_id
        LEFT JOIN 
            tienda ON tienda.tienda_id = usuario.tienda_id
        WHERE 
            1=1
    ';

    IF p_rol IS NOT NULL AND p_rol != '' THEN 
        SET @consulta = CONCAT(@consulta, ' AND usuario.rol = ', p_rol);
    END IF;

    IF p_tienda_id IS NOT NULL AND p_tienda_id != '' THEN 
        SET @consulta = CONCAT(@consulta, ' AND usuario.tienda_id = ', p_tienda_id);
    END IF;

    IF p_antiTienda_id IS NOT NULL AND p_antiTienda_id != '' THEN
        SET @consulta = CONCAT(@consulta, ' AND usuario.tienda_id != ', p_antiTienda_id);
    END IF;

    SET @consulta = CONCAT(@consulta, ' GROUP BY usuario.usuario_id;');
      
    PREPARE stmt FROM @consulta;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
`;

export const initProcedureGetUsuarios = async () => {
    await eliminarProcedimiento("SP_GetUsuarios");

    await crearProcedimiento("SP_GetUsuarios", queryGetUsuarios, `
        IN p_rol INT, 
        IN p_tienda_id INT, 
        IN p_antiTienda_id INT
    `);
};


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

const queryGetTiendas =`
SELECT 
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  SUM(productodetalle.stock) AS total_stock,
  COUNT(DISTINCT usuario.tienda_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN 
  productodetalle ON productodetalle.tienda_id = tienda.tienda_id
LEFT JOIN 
  usuario ON usuario.tienda_id = tienda.tienda_id
GROUP BY 
  tienda.tienda, tienda.direccion, tienda.telefono;
`;

export const initiProcedureGetTiendas = async () =>{
  await eliminarProcedimiento("SP_GetTiendas");
  await crearProcedimiento("SP_GetTiendas",queryGetTiendas,
  )
}

const queryGetTienda =`
SELECT 
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  SUM(productodetalle.stock) AS total_stock,
  COUNT(DISTINCT usuario.tienda_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN 
  productodetalle ON productodetalle.tienda_id = tienda.tienda_id
LEFT JOIN 
  usuario ON usuario.tienda_id = tienda.tienda_id
WHERE tienda.tienda_id = t_id;
`;

export const initiProcedureGetTienda = async () =>{
  await eliminarProcedimiento("SP_GetTienda");
  await crearProcedimiento("SP_GetTienda",queryGetTienda,"IN t_id INT")
}



export const initProcedure = async () => {
  await initProcedureColoresProductos();
  await initProcedureUpdateIncidencia();
  await initProcedureDeleteIncidencia();
  await initProcedureDeleteHorario();
  await initProcedureGetUsuarios();
  await initProcedureGetUsuario(); 
  await initiProcedureUpdateUsuario();
  await initProcedureGetReporteUsuario();
  await initiProcedureGetTiendas();
  await initiProcedureGetTienda();
  await initProcedureDeletePago();
};
