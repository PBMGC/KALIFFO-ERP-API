import { createSp } from "../../util/funcion_sp";

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

export const initiProcedureUpdateTela = async () => {
    await createSp(
      "SP_UpdateTela",
      queryUpdateTela,
      "p_t_id INT , p_tipo VARCHAR(15), p_metraje DECIMAL(10, 2), p_articulo INT, p_empresa_compra VARCHAR(15), p_estado INT, p_fecha_compra DATE"
    );
  };