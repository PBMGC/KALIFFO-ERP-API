import { createSp } from "../../util/funcion_sp";

const queryUpdateCorte = `
    UPDATE cortes
    SET
        taller_id = IF(p_taller_id IS NOT NULL, p_taller_id, taller_id),
        producto_id = IF(p_producto_id IS NOT NULL, p_producto_id, producto_id),
        cantidad = IF(p_cantidad IS NOT NULL, p_cantidad, cantidad),
        talla = IF(p_talla IS NOT NULL AND p_talla != '', p_talla, talla),
        metraje_asignado = IF(p_metraje_asignado IS NOT NULL, p_metraje_asignado, metraje_asignado),
        tipo_tela = IF(p_tipo_tela IS NOT NULL AND p_tipo_tela != '', p_tipo_tela, tipo_tela)
    WHERE corte_id = c_id;
`;

export const initiProcedureUpdateCorte= async () => {
    await createSp(
      "SP_UpdateCorte",
      queryUpdateCorte,
      "c_id INT ,p_taller_id INT ,p_producto_id INT, p_cantidad INT, p_talla INT, p_metraje_asignado DECIMAL(10,2), p_tipo_tela VARCHAR(20)"
    );
  };