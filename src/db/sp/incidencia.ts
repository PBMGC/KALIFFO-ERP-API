import { createSp } from "../../util/funcion_sp";

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

export const initProcedureUpdateIncidencia = async () => {
  await createSp(
    "SP_UpdateIncidencia",
    queryUpdateIncidencias,
    "IN i_id INT, IN p_tipo INT, IN p_descripcion VARCHAR(50), IN p_fecha DATETIME"
  );
};

export const initProcedureDeleteIncidencia = async () => {
  await createSp("SP_DeleteIncidencia", queryDeleteIncidencia, "IN i_id INT");
};
