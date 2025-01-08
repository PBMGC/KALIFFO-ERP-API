import { query } from "../util/query";

// Función para crear una nueva compra y su detalle asociado
// Inserta los datos de la compra y opcionalmente llama a `_createCompraDetalle` para insertar los detalles
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

  return {
    message: "Compra creada con éxito.",
    success: true,
    status: 201,
  };
};

// Función para crear el detalle de una compra específica
// Inserta los productos, cantidades y totales relacionados con la compra
export const _createCompraDetalle = async (
  compra_id: number,
  detalleCompra: any
) => {
  const queryText = `
    INSERT INTO compras_detalle (compra_id,producto,cantidad,total) 
    VALUES (?, ?, ?, ?)`;

  for (const c of detalleCompra) {
    await query(queryText, [compra_id, c.producto, c.cantidad, c.total]);
  }

  return {
    message: "Detalle creado con éxito.",
    success: true,
    status: 201,
  };
};

// Función para actualizar una compra existente
// Actualiza la información general de la compra y su detalle si es necesario
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

// Función para actualizar el detalle de una compra
// Itera sobre los detalles y actualiza cada uno mediante un procedimiento almacenado
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

// Función para eliminar una compra de la base de datos
// Elimina la compra utilizando su `compra_id` y verifica si se afectaron filas
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
      msg: "Compra eliminada",
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

// Función para obtener las compras registradas
// Filtra por `tienda_id` si se proporciona, devolviendo la lista de compras
export const _getCompras = async (tienda_id: number | null) => {
  let queryText: string;
  let params: Array<number> = [];

  if (tienda_id) {
    queryText = `SELECT compra.compra_id,tienda.tienda,compra.empresa_proveedor,
    compra.fecha_compra,compra.cantidad,compra.total from compra inner join tienda on compra.tienda_id=tienda.tienda_id
     WHERE tienda_id = ?`;
    params = [tienda_id];
  } else {
    queryText = `SELECT compra.compra_id,
    tienda.tienda,compra.empresa_proveedor,compra.fecha_compra,compra.cantidad,compra.total from compra inner join tienda on compra.tienda_id=tienda.tienda_id`;
  }

  const result = await query(queryText, params.length ? params : undefined);

  const dataCompras = result.data.map((compra: any) => ({
    ...compra,
    fecha_compra: new Date(compra.fecha_compra).toISOString().split("T")[0],
  }));

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

// Función para obtener las empresas proveedoras únicas
// Agrupa por el campo `empresa_proveedor` y devuelve la lista
export const _getEmpresas = async () => {
  const queryText = `select compra.empresa_proveedor from compra group by compra.empresa_proveedor`;

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

// Función para obtener los productos únicos del detalle de compras
// Agrupa por el campo `producto` y devuelve la lista
export const _getProductos = async () => {
  const queryText = `select compra_detalle.producto from compra_detalle GROUP BY compra_detalle.producto`;

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

// Función para obtener los detalles de una compra específica
// Incluye información de la compra y su detalle relacionado
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
      fecha_compra: new Date(compraResult.data[0].fecha_compra)
        .toISOString()
        .split("T")[0],
    };

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
