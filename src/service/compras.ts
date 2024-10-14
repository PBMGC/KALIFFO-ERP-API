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

  if (detalle) {
    const compra_id = result.insertId;

    await _createCompraDetalle(compra_id, detalle);
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

export const _UpdateCompra = async (updatecompra: any) => {
  try {
    await query(`CALL SP_UpdateCompra(?,?,?,?,?,?)`, [
      updatecompra.compra_id,
      updatecompra.empresa_proveedor || null,
      updatecompra.fecha_compra || null,
      updatecompra.cantidad || null,
      updatecompra.total || null,
      updatecompra.tienda_id || null,
    ]);

    if (updatecompra.detalle.length > 0) {
      const detalleResult = await _UpdateCompraDetalle(
        updatecompra.detalle
      );

      if (!detalleResult.success) {
        return {
          message:
            "Compra actualizada, pero hubo un error al actualizar el detalle.",
          success: false,
          status: 500,
        };
      }
    }

    return {
      message: "Compra actualizada con éxito.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar la compra.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _UpdateCompraDetalle = async (detalle: any) => {
  try {
    for (const d of detalle) {
      await query(`CALL SP_UpdateCompraDetalle(?,?,?,?)`, [
        d.compraDetalle_id,
        d.producto || null,
        d.cantidad || null,
        d.total || null,
      ]);
    }

    return {
      message: "Detalle de compra actualizado con éxito.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar el detalle de la compra.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
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

export const _getComprasDetalle = async (compra_id: number) => {
  const queryCompra = `
      SELECT * FROM compras WHERE compras.compra_id=?;
    `;

  const queryDetalle = `
      SELECT compras_detalle.compraDetalle_id,compras_detalle.producto,
      compras_detalle.cantidad,compras_detalle.total FROM compras_detalle WHERE compras_detalle.compra_id=?;
    `;

  try {
    const [compraResult, detalleResult] = await Promise.all([
      query(queryCompra, [compra_id]),
      query(queryDetalle, [compra_id]),
    ]);

    if (!compraResult.success || !detalleResult.success) {
      return {
        message: compraResult.error || detalleResult.error,
        success: false,
        status: compraResult.status || detalleResult.status || 500,
      };
    }

    const compraConDetalle = {
      ...compraResult.data[0],
      detalle: detalleResult.data,
    };

    return {
      items: compraConDetalle,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
      status: 500,
    };
  }
};
