import { query } from "./query";

export const createCodigoProductoTalla = async (
  producto_id: number,
  detalle: any
) => {
  const productoResult = await query(
    `SELECT * FROM producto WHERE producto_id = ?`,
    [producto_id]
  );

  const producto = productoResult.data[0];

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  const arrayIniciales = producto.nombre.split(" ");
  let iniciales = "";

  arrayIniciales.forEach((palabra: string) => {
    iniciales += palabra.charAt(0).toLowerCase();
  });

  const existingCodesResult = await query(
    `SELECT COUNT(*) as count
    FROM productoTalla 
    WHERE codigo LIKE ?;
    `,
    [`${iniciales}%`]
  );

  const existingCodes = existingCodesResult.data[0].count;

  const codigo = `${iniciales}${existingCodes + 1}--${detalle.talla}`;

  return codigo;
};
