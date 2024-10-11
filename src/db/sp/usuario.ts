import { createSp } from "../../util/funcion_sp";

const queryGetReporteUsuario = `
SET @consulta = '
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
        (SELECT usuario_id, GROUP_CONCAT(CONCAT("(", fecha, ", " , hora_entrada, ", ", hora_salida, ")") ORDER BY fecha DESC SEPARATOR ", ") AS horarios
         FROM horario
         GROUP BY usuario_id) h ON u.usuario_id = h.usuario_id
    LEFT JOIN
        (SELECT usuario_id, GROUP_CONCAT(DISTINCT CONCAT("(", tipo, ", ", descripcion, ", ", fecha_creacion, ")") ORDER BY tipo SEPARATOR "; ") AS incidencias
         FROM incidencia
         GROUP BY usuario_id) i ON u.usuario_id = i.usuario_id
    LEFT JOIN
        (SELECT usuario_id, GROUP_CONCAT(DISTINCT CONCAT("(", fecha, ", " , montoPagado, ", ", montoFaltante, ")") ORDER BY montoPagado SEPARATOR ", ") AS pagos
         FROM pago
         GROUP BY usuario_id) pg ON u.usuario_id = pg.usuario_id
    WHERE
        u.usuario_id = ?
';

IF fecha_r IS NOT NULL AND fecha_r != '' THEN
    SET @consulta = CONCAT(@consulta, ' AND h.fecha = "', fecha_r, '" AND i.fecha_creacion = "', fecha_r, '" AND pg.fecha = "', fecha_r, '"');
END IF;

SET @consulta = CONCAT(@consulta, ' ORDER BY u.usuario_id;');

PREPARE stmt FROM @consulta;
EXECUTE stmt USING u_id;
DEALLOCATE PREPARE stmt;
`;

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

`;

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

export const initProcedureGetReporteUsuario = async () => {
  await createSp("SP_ReporteUsuario", queryGetReporteUsuario, "IN u_id INT,IN fecha_r DATE");
};

export const initProcedureGetUsuarios = async () => {
  await createSp(
    "SP_GetUsuarios",
    queryGetUsuarios,
    `
    IN p_rol INT, 
    IN p_tienda_id INT, 
    IN p_antiTienda_id INT
    `
  );
};

export const initProcedureGetUsuario = async () => {
  await createSp("SP_GetUsuario", queryGetUsuario, "IN u_id INT");
};

export const initiProcedureUpdateUsuario = async () => {
  await createSp(
    "SP_UpdateUsuario",
    queryUpdateUsuario,
    "u_id INT,p_nombre varchar(30),p_ap_paterno varchar(30),p_ap_materno varchar(30),p_fecha_nacimiento DATE,p_telefono varchar(10),p_dni varchar(10),p_sueldo INT,p_tienda_id INT,p_rol INT"
  );
};
