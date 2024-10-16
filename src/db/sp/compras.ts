import { createSp } from "../../util/funcion_sp";

const queryUpdateCompra = `
     UPDATE compras
    SET
        empresa_proveedor = IF(p_empresa_proveedor IS NOT NULL AND p_empresa_proveedor != '', p_empresa_proveedor, empresa_proveedor),
        fecha_compra = IF(p_fecha_compra IS NOT NULL AND p_fecha_compra != '', p_fecha_compra, fecha_compra),
        cantidad = IF(p_cantidad IS NOT NULL AND p_cantidad != 0, p_cantidad, cantidad),
        total = IF(p_total IS NOT NULL AND p_total != 0, p_total, total),
        tienda_id = IF(p_tienda_id IS NOT NULL AND p_tienda_id != 0, p_tienda_id, tienda_id)
    WHERE compra_id = c_id;
`;

export const initiProcedureUpdateCompra = async () => {
  await createSp(
    "SP_UpdateCompra",
    queryUpdateCompra,
    "c_id INT ,p_empresa_proveedor varchar(30) ,p_fecha_compra DATE ,p_cantidad INT , p_total DECIMAL(10,2) , p_tienda_id INT"
  );
};

const queryUpdateCompraDetalle = `
UPDATE compras_detalle
    SET
        producto = IF(p_producto IS NOT NULL AND p_producto != '', p_producto, producto),
        cantidad = IF(p_cantidad IS NOT NULL AND p_cantidad != 0, p_cantidad, cantidad),
        total = IF(p_total IS NOT NULL AND p_total != 0, p_total, total)
    WHERE compraDetalle_id = c_id;
`;
 
export const initiProcedureUpdateCompraDetalle = async () => {
    await createSp(
      "SP_UpdateCompraDetalle",
      queryUpdateCompraDetalle,
      "c_id INT ,p_producto varchar(30) ,p_cantidad INT , p_total DECIMAL(10,2)"
    );
  };