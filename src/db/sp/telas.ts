import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryUpdateTela = `
    UPDATE almacen_tela
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
    select a_t.tipo,COUNT(a_t.tipo) as "STOCK" from almacen_tela a_t group by a_t.tipo;
`;

const queryGetTelaPorTipo = `
  SELECT * FROM almacen_tela WHERE tipo = u_tipo AND estado = u_estado;
`;

const initProcedureGetTela = async () => {
  await createSp(
    "SP_GetTelaPorTipo",
    queryGetTelaPorTipo,
    "IN u_tipo varchar(15), IN u_estado INT"
  );
};

const initProcedureGetTelas = async () => {
  await createSp("SP_GetTelas", queryGetTelas);
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
  await eliminarProcedimiento("SP_GetTelaPorTipo");
  await eliminarProcedimiento("SP_UpdateTela");
};
