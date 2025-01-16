import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryGetReporteTrabajador = `
SET @consulta = CONCAT(
        'SELECT 
            u.trabajador_id, 
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
            trabajador u 
        LEFT JOIN 
            tienda t ON u.tienda_id = t.tienda_id 
        LEFT JOIN 
            (SELECT trabajador_id, GROUP_CONCAT(CONCAT("(", fecha, ", ", hora_entrada, ", ", hora_salida, ")") ORDER BY fecha DESC SEPARATOR ", ") AS horarios
            FROM horario
            WHERE ', filtrado_u, ' 
            GROUP BY trabajador_id) h ON u.trabajador_id = h.trabajador_id 
        LEFT JOIN 
            (SELECT trabajador_id, GROUP_CONCAT(DISTINCT CONCAT("(", tipo, ", ", descripcion, ", ", fecha , ")") ORDER BY tipo SEPARATOR "; ") AS incidencias
            FROM incidencia
            WHERE ', filtrado_u, ' 
            GROUP BY trabajador_id) i ON u.trabajador_id = i.trabajador_id 
        LEFT JOIN 
            (SELECT trabajador_id, GROUP_CONCAT(DISTINCT CONCAT("(", fecha, ", ", montoPagado, ", ", montoFaltante, ")") ORDER BY montoPagado SEPARATOR ", ") AS pagos
            FROM pago
            WHERE ', filtrado_u, ' 
            GROUP BY trabajador_id) pg ON u.trabajador_id = pg.trabajador_id 
        WHERE 
            u.trabajador_id = ', u_id, ' 
        ORDER BY u.trabajador_id;'
    );

    PREPARE stmt FROM @consulta;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

`;

const queryGetTrabajadores = `
    SET @consulta = '
        SELECT 
            trabajador.trabajador_id,
            trabajador.nombre, 
            trabajador.ap_paterno,
            trabajador.ap_materno,
            trabajador.dni,
            trabajador.telefono,
            trabajador.tienda_id,
            tienda.tienda,
            trabajador.sueldo,
            IFNULL((SELECT COUNT(*) 
                    FROM incidencia 
                    WHERE incidencia.trabajador_id = trabajador.trabajador_id), 0) AS total_incidencias,
            IFNULL(FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(horario.hora_salida, horario.hora_entrada)) / 3600)), 0) AS total_horas_trabajadas
        FROM 
            trabajador 
        LEFT JOIN 
            horario ON trabajador.trabajador_id = horario.trabajador_id
        LEFT JOIN 
            tienda ON tienda.tienda_id = trabajador.tienda_id
        WHERE 
            1=1
    ';

    IF p_rol IS NOT NULL AND p_rol != '' THEN 
        SET @consulta = CONCAT(@consulta, ' AND trabajador.rol = ', p_rol);
    END IF;

    IF p_tienda_id IS NOT NULL AND p_tienda_id != '' THEN 
        SET @consulta = CONCAT(@consulta, ' AND trabajador.tienda_id = ', p_tienda_id);
    END IF;

    IF p_antiTienda_id IS NOT NULL AND p_antiTienda_id != '' THEN
        SET @consulta = CONCAT(@consulta, ' AND trabajador.tienda_id != ', p_antiTienda_id);
    END IF;

    SET @consulta = CONCAT(@consulta, ' GROUP BY trabajador.trabajador_id;');

    PREPARE stmt FROM @consulta;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
`;

const queryGetTrabajador = `
SELECT 
    trabajador.trabajador_id,
    trabajador.nombre, 
    trabajador.ap_paterno,
    trabajador.ap_materno,
    trabajador.dni,
    trabajador.telefono,
    trabajador.tienda_id,
    trabajador.sueldo,
    DATE_FORMAT(trabajador.fecha_nacimiento, '%d-%m-%Y') AS fecha_nacimiento,
    IFNULL((SELECT COUNT(*) 
            FROM incidencia 
            WHERE incidencia.trabajador_id = trabajador.trabajador_id), 0) AS total_incidencias,
    IFNULL(FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(horario.hora_salida, horario.hora_entrada)) / 3600)), 0) AS total_horas_trabajadas
FROM 
    trabajador 
LEFT JOIN 
    horario ON trabajador.trabajador_id = horario.trabajador_id
WHERE 
    trabajador.trabajador_id=u_id
GROUP BY 
    trabajador.trabajador_id;

`;

const queryUpdateTrabajador = `
UPDATE trabajador 
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
  WHERE trabajador_id = u_id;
`;

const queryDeleteTrabajador = `
    DELETE FROM trabajador WHERE trabajador_id = u_id;
`;

const queryCreateTrabajador = `
  INSERT INTO trabajador (nombre, ap_paterno, ap_materno, fecha_nacimiento, telefono, dni, sueldo, tienda_id, rol) 
  VALUES (p_nombre, p_ap_paterno, p_ap_materno, p_fecha_nacimiento, p_telefono, p_dni, p_sueldo, p_tienda_id, p_rol);`;

const initProcedureCreateTrabajador = async () => {
  await createSp(
    "SP_CreateTrabajador",
    queryCreateTrabajador,
    `
      IN p_nombre VARCHAR(50), 
      IN p_ap_paterno VARCHAR(50), 
      IN p_ap_materno VARCHAR(50), 
      IN p_fecha_nacimiento DATE, 
      IN p_telefono VARCHAR(15), 
      IN p_dni VARCHAR(10), 
      IN p_sueldo DECIMAL(10,2), 
      IN p_tienda_id INT, 
      IN p_rol INT
      `
  );
};

const initProcedureDeleteTrabajador = async () => {
  await createSp("SP_DeleteTrabajador", queryDeleteTrabajador, "IN u_id INT");
};

const initProcedureGetReporteTrabajador = async () => {
  await createSp(
    "SP_ReporteTrabajador",
    queryGetReporteTrabajador,
    `
    IN u_id INT,
    IN filtrado_u varchar(300)
    `
  );
};

const initProcedureGetTrabajadores = async () => {
  await createSp(
    "SP_GetTrabajadores",
    queryGetTrabajadores,
    `
    IN p_rol INT, 
    IN p_tienda_id INT, 
    IN p_antiTienda_id INT
    `
  );
};

const initProcedureGetTrabajador = async () => {
  await createSp("SP_GetTrabajador", queryGetTrabajador, "IN u_id INT");
};

const initiProcedureUpdateTrabajador = async () => {
  await createSp(
    "SP_UpdateTrabajador",
    queryUpdateTrabajador,
    "u_id INT,p_nombre varchar(30),p_ap_paterno varchar(30),p_ap_materno varchar(30),p_fecha_nacimiento DATE,p_telefono varchar(10),p_dni varchar(10),p_sueldo INT,p_tienda_id INT,p_rol INT"
  );
};

export const initProcedureTrabajador = async () => {
  await initProcedureDeleteTrabajador();
  await initProcedureGetTrabajadores();
  await initProcedureGetTrabajador();
  await initiProcedureUpdateTrabajador();
  await initProcedureGetReporteTrabajador();
  await initProcedureCreateTrabajador();
};

export const dropProcedureTrabajador = async () => {
  await eliminarProcedimiento("SP_DeleteTrabajador");
  await eliminarProcedimiento("SP_ReporteTrabajador");
  await eliminarProcedimiento("SP_GetTrabajadores");
  await eliminarProcedimiento("SP_GetTrabajador");
  await eliminarProcedimiento("SP_UpdateTrabajador");
  await eliminarProcedimiento("SP_CreateTrabajador");
};
