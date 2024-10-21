import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryUpdateIncidencias = `
  UPDATE incidencia
  SET 
      tipo = IF(p_tipo IS NOT NULL AND p_tipo != '', p_tipo, tipo), 
      descripcion = IF(p_descripcion IS NOT NULL AND p_descripcion != '', p_descripcion, descripcion), 
      fecha_creacion = IF(p_fecha IS NOT NULL, p_fecha, fecha_creacion)
  WHERE incidencia_id = i_id;
`;

const queryDeleteIncidencia = `
  DELETE FROM incidencia WHERE incidencia_id = i_id;
`;

const queryGetIncidencias = `
      IF p_usuario_id IS NOT NULL THEN
        -- Si el usuario_id es proporcionado, filtra por usuario_id
        SELECT * FROM incidencia WHERE usuario_id = p_usuario_id;
    ELSE
        -- Si usuario_id es NULL, retorna todas las incidencias
        SELECT * FROM incidencia;
    END IF;
`;

const queryGetIncidencia = `
    SELECT * FROM incidencia WHERE incidencia_id = p_incidencia_id;
`;

const queryCreateIncidencia = `
    INSERT INTO incidencia (tipo, descripcion, usuario_id, fecha_creacion)
    VALUES (p_tipo, p_descripcion, p_usuario_id, p_fecha_creacion);
`;

const initProcedureCreateIncidencia = async () => {
  await createSp(
    "SP_CreateIncidencia",
    queryCreateIncidencia,
    "IN p_tipo INT, IN p_descripcion TEXT, IN p_usuario_id INT,  IN p_fecha_creacion DATETIME"
  );
};

const initProcedureGetIncidencia = async () => {
  await createSp(
    "SP_GetIncidencia",
    queryGetIncidencia,
    "IN p_incidencia_id INT"
  );
};

const initProcedureGetIncidencias = async () => {
  await createSp(
    "SP_GetIncidencias",
    queryGetIncidencias,
    "IN p_usuario_id INT"
  );
};

const initProcedureUpdateIncidencia = async () => {
  await createSp(
    "SP_UpdateIncidencia",
    queryUpdateIncidencias,
    "IN i_id INT, IN p_tipo INT, IN p_descripcion VARCHAR(50), IN p_fecha DATETIME"
  );
};

const initProcedureDeleteIncidencia = async () => {
  await createSp("SP_DeleteIncidencia", queryDeleteIncidencia, "IN i_id INT");
};

export const initProcedureIncidencia = async () => {
  await initProcedureDeleteIncidencia();
  await initProcedureGetIncidencias();
  await initProcedureUpdateIncidencia();
  await initProcedureGetIncidencia();
  await initProcedureCreateIncidencia();
};

export const dropProcedureIncidencia = async () => {
  await eliminarProcedimiento("SP_UpdateIncidencia");
  await eliminarProcedimiento("SP_GetIncidencias");
  await eliminarProcedimiento("SP_GetIncidencia");
  await eliminarProcedimiento("SP_DeleteIncidencia");
  await eliminarProcedimiento("SP_CreateIncidencia");
};
