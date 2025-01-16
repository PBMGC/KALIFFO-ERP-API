import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryUpdateIncidencias = `
  UPDATE incidencia
  SET 
      tipo = IF(p_tipo IS NOT NULL AND p_tipo != '', p_tipo, tipo), 
      descripcion = IF(p_descripcion IS NOT NULL AND p_descripcion != '', p_descripcion, descripcion), 
      fecha= IF(p_fecha IS NOT NULL, p_fecha, fecha)
  WHERE incidencia_id = i_id;
`;

const queryDeleteIncidencia = `
  DELETE FROM incidencia WHERE incidencia_id = i_id;
`;

const queryGetIncidencias = `
      IF p_trabajador_id IS NOT NULL THEN
        SELECT * FROM incidencia WHERE trabajador_id = p_trabajador_id;
    ELSE
        SELECT * FROM incidencia;
    END IF;
`;

const queryGetIncidencia = `
    SELECT * FROM incidencia WHERE incidencia_id = p_incidencia_id;
`;

const queryCreateIncidencia = `
    INSERT INTO incidencia (tipo, descripcion, trabajador_id, fecha)
    VALUES (p_tipo, p_descripcion, p_trabajador_id, p_fecha);
`;

const initProcedureCreateIncidencia = async () => {
  await createSp(
    "SP_CreateIncidencia",
    queryCreateIncidencia,
    "IN p_tipo INT, IN p_descripcion TEXT, IN p_trabajador_id INT,  IN p_fecha DATETIME"
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
    "IN p_trabajador_id INT"
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
 