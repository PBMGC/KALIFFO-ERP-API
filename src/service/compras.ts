import { query } from "../util/query";

export const _createCompra = async (compra: any) => {
  const {
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle,
  } = compra;

  const queryText = `
      INSERT INTO compras (empresa_proveedor,fecha_compra,cantidad,total,tienda_id) 
      VALUES (?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
  ]);

  console.log(
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle
  );

  const compra_id = result.insertId;

  await _createCompraDetalle(compra_id, detalle);

  // if (!result.success) {
  //   console.error("Error al crear la compra:", result.error);
  //   return {
  //     message: "Error al crear el compra. Intente nuevamente más tarde.",
  //     success: false,
  //     status: result.status || 500,
  //   };
  // }

  return {
    message: "compra creada con éxito.",
    success: true,
    status: 201,
  };
};

export const _createCompraDetalle = async (
  compra_id: number,
  detalleCompra: any
) => {
  const queryText = `
    INSERT INTO compras_detalle (compra_id,producto,cantidad,total) 
    VALUES (?, ?, ?, ?)`;

  for (const c of detalleCompra) {
    console.log(c);

    const result = await query(queryText, [
      compra_id,
      c.producto,
      c.cantidad,
      c.total,
    ]);
  }

  // if (!result.success) {
  //   console.error("Error al crear la compra:", result.error);
  //   return {
  //     message: "Error al crear el compra. Intente nuevamente más tarde.",
  //     success: false,
  //     status: result.status || 500,
  //   };
  // }

  return {
    message: "detalle creado con éxito.",
    success: true,
    status: 201,
  };
};

export const _getCompras = async (tienda_id: number | null) => {
  let queryText: string;
  let params: Array<number> = [];

  if (tienda_id) {
    queryText = `SELECT * FROM compras WHERE tienda_id = ?`;
    params = [tienda_id];
  } else {
    queryText = `SELECT * FROM compras`;
  }

  const result = await query(queryText, params.length ? params : undefined);

  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    items: result.data,
    success: true,
    status: 200,
  };
};
