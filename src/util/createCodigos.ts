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

  const arrayIniciales = producto.nombre.split(" ");
  let iniciales = "";

  arrayIniciales.forEach((inicial: any) => {
    iniciales += inicial.charAt(0).toLowerCase();
  });

  const countResult = await query(
    `SELECT COUNT(*) as total FROM producto WHERE nombre LIKE ?`,
    [`${iniciales}%`]
  );

  const cantidadProductosConInicial = countResult.data[0].total;

  const codigo = `${iniciales}${cantidadProductosConInicial + 1}--${
    detalle.talla
  }`;

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
