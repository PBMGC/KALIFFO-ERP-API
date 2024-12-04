import { query } from "./query";

export const createCodigoProductoTalla = async (
  producto_id: number,
  detalle: any
) => {
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

  //iniciales + talla
  const codigo = `${inicialProducto}${
    cantidadProductosConInicial + 1
  }-${producto_id}${detalle.color_id}-${detalle.talla}`;

  return codigo;
};

export const createCodigoVenta = async (
  tipoComprobante: number,
  tienda_id: number
) => {
  const result = await query(`SELECT COUNT(*) as numero FROM venta;`);

  let codigo =
    tipoComprobante === 1
      ? `BT${tienda_id}${result.data[0].numero + 1}`
      : `FT${tienda_id}${result.data[0].numero + 1}`;

  return codigo;
};
