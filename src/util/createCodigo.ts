import { query } from "./query";

export const createCodigo = async (producto_id: number, detalle: any) => {
  const productoResult = await query(
    `select * from producto where producto_id = ?`,
    [producto_id]
  );

  const producto = productoResult.data[0];

  const inicialProducto = producto.nombre.charAt(0).toLowerCase();

  const countResult = await query(
    `SELECT COUNT(*) as total FROM producto WHERE nombre LIKE ?`,
    [`${inicialProducto}%`]
  );

  const cantidadProductosConInicial = countResult.data[0].total;

  const codigo = `${inicialProducto}${
    cantidadProductosConInicial + 1
  }-${producto_id}${detalle.color_id}-${detalle.talla}`;

  return codigo;
};
