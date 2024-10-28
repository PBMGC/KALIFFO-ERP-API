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
      const detalleResult = await _UpdateCompraDetalle(updatecompra.detalle);

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

export const _eliminarCompra = async (compra_id: number) => {
  const queryS = `DELETE FROM compras where compra_id=?`;

  try {
    const result = (await query(queryS, [compra_id])) as any;

    if (result.affectedRows === 0) {
      return {
        msg: "No se encontró la compra",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "compra eliminada",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar la compra:", error);
    return {
      msg: "Error al eliminar la compra",
      success: false,
      status: 500,
    };
  }
};

export const _getCompras = async (tienda_id: number | null) => {
  let queryText: string;
  let params: Array<number> = [];

  if (tienda_id) {
    queryText = `SELECT compras.compra_id,tienda.tienda,compras.empresa_proveedor,
    compras.fecha_compra,compras.cantidad,compras.total from compras inner join tienda on compras.tienda_id=tienda.tienda_id
     WHERE tienda_id = ?`;
    params = [tienda_id];
  } else {
    queryText = `SELECT compras.compra_id,
    tienda.tienda,compras.empresa_proveedor,compras.fecha_compra,compras.cantidad,compras.total from compras inner join tienda on compras.tienda_id=tienda.tienda_id`;
  }

  const result = await query(queryText, params.length ? params : undefined);

  const dataCompras = result.data.map((compra:any)=>({
    ...compra,
    fecha_compra:new Date(compra.fecha_compra).toISOString().split("T")[0]
  }))


  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    items: dataCompras,
    success: true,
    status: 200,
  };
};

export const _getEmpresas = async () => {
  const queryText = `select compras.empresa_proveedor from compras group by compras.empresa_proveedor`;

  const result = await query(queryText);

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

export const _getProductos = async () => {
  const queryText = `select compras_detalle.producto from compras_detalle GROUP BY compras_detalle.producto`;

  const result = await query(queryText);

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
     SELECT compras.compra_id,tienda.tienda,compras.empresa_proveedor,compras.fecha_compra,compras.cantidad,compras.total from compras inner join tienda 
     on compras.tienda_id=tienda.tienda_id where compras.compra_id=?
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

    const compraFixed = {
      ...compraResult.data[0],
      fecha_compra: new Date(compraResult.data[0].fecha_compra).toISOString().split("T")[0],
    }


    

    const compraConDetalle = {
      ...compraFixed,
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
