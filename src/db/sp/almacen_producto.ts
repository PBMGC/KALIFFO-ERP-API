import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryUpdateAlmacen_Producto = `
    UPDATE almacen_producto
    SET
        nombre_almacen = IF(p_nombre_almacen IS NOT NULL AND p_nombre_almacen != '', p_nombre_almacen, nombre_almacen),
        direccion = IF(p_direccion IS NOT NULL AND p_direccion != '', p_direccion, direccion)
    WHERE almacen_id = p_a_id;
`;

const initProcedureUpdateAlmacen_Productos = async () => {
  await createSp(
    "sp_UpdateAlmacen_Producto",
    queryUpdateAlmacen_Producto,
    "p_a_id INT,p_nombre_almacen VARCHAR(30),p_direccion VARCHAR(40)"
  );
};

export const initProcedureAlmacenProductos = async () => {
  await initProcedureUpdateAlmacen_Productos();
};

export const dropProcedureAlmacenProductos = async () => {
  await eliminarProcedimiento("sp_UpdateAlmacen_Producto");
};
