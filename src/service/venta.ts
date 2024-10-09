import { query } from "../util/query";

export const _createDetalleVenta = async (venta: any) => {
  const queryText = `
  INSERT INTO detalleVenta (nombre, stockTotal, precioBase, descuento)
  VALUES (?, ?, ?, ?)`;
};

export const _createProducto = async (producto: any) => {
  const { nombre, stockTotal, precioBase, descuento } = producto;

  const queryText = `
        INSERT INTO producto (nombre, stockTotal, precioBase, descuento)
        VALUES (?, ?, ?, ?)`;

  const result = await query(queryText, [
    nombre,
    stockTotal,
    precioBase,
    descuento,
  ]);

  if (!result.success) {
    console.error("Error al crear el producto:", result.error);
    return {
      message: "error _createProducto",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "Producto creado con éxito.",
    success: true,
    status: 201,
  };
};
