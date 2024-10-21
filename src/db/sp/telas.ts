import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryUpdateTela = `
    UPDATE almacen_telas
    SET
        tipo = IF(p_tipo IS NOT NULL AND p_tipo != '', p_tipo, tipo),
        metraje = IF(p_metraje IS NOT NULL AND p_metraje != 0, p_metraje, metraje),
        articulo = IF(p_articulo IS NOT NULL AND p_articulo != 0, p_articulo, articulo),
        empresa_compra = IF(p_empresa_compra IS NOT NULL AND p_empresa_compra != '', p_empresa_compra, empresa_compra),
        estado = IF(p_estado IS NOT NULL, p_estado, estado),
        fecha_compra = IF(p_fecha_compra IS NOT NULL, p_fecha_compra, fecha_compra)
    WHERE tela_id = p_t_id;
`;

const queryGetTelas = `
    SELECT * FROM almacen_telas
    WHERE (u_tipo IS NULL OR u_tipo = '' OR tipo = u_tipo);
`;

const queryGetTela = `
  SELECT * FROM almacen_telas WHERE tela_id = u_tela_id;
`;

const initProcedureGetTela = async () => {
  await createSp("SP_GetTela", queryGetTela, "IN u_tela_id INT");
};

const initProcedureGetTelas = async () => {
  await createSp("SP_GetTelas", queryGetTelas, "IN u_tipo VARCHAR(255)");
};

const initiProcedureUpdateTela = async () => {
  await createSp(
    "SP_UpdateTela",
    queryUpdateTela,
    "p_t_id INT , p_tipo VARCHAR(15), p_metraje DECIMAL(10, 2), p_articulo INT, p_empresa_compra VARCHAR(15), p_estado INT, p_fecha_compra DATE"
  );
};

export const initProcedureTela = async () => {
  await initProcedureGetTelas();
  await initProcedureGetTela();
  await initiProcedureUpdateTela();
};

export const dropProcedureTela = async () => {
  await eliminarProcedimiento("SP_GetTelas");
  await eliminarProcedimiento("SP_GetTela");
  await eliminarProcedimiento("SP_UpdateTela");
};
