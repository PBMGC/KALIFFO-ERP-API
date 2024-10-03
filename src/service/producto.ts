import { query } from "../util/query";

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

export const _createProductoDetalle = async (productoDetalle: any) => {
  const { producto_id, color_id, tienda_id, stock } = productoDetalle;

  const queryText = `
        INSERT INTO productoDetalle (producto_id, color_id, tienda_id, stock)
        VALUES (?, ?, ?, ?)`;

  const result = await query(queryText, [
    producto_id,
    color_id,
    tienda_id,
    stock,
  ]);

  if (!result.success) {
    console.error("error");
    return {
      message: "error _createProductoDetalle",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "ProductoDetalle creado con éxito.",
    success: true,
    status: 201,
  };
};

export const _createProductoTalla = async (productoTalla: any) => {
  const { productoDetalle_id, talla, codigo } = productoTalla;

  const queryText = `
        INSERT INTO productoTalla (productoDetalle_id, talla, codigo)
        VALUES (?, ?, ?)`;

  const result = await query(queryText, [productoDetalle_id, talla, codigo]);

  if (!result.success) {
    console.error("error");
    return {
      message: "error _createProductoTalla",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "ProductoTalla creado con éxito.",
    success: true,
    status: 201,
  };
};

export const _getProductos = async () => {
  const queryText = `SELECT * FROM producto`;

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

export const _getProducto = async (producto_id: number) => {
  const queryText = `SELECT * FROM producto WHERE producto_id = ?`;

  const result = await query(queryText, [producto_id]);

  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 404,
    };
  }

  return {
    item: result.data,
    success: true,
    status: 200,
  };
};

export const _getProductosTienda = async (tienda_id: number) => {

  const result = await query(`CALL SP_GetProductosTienda(?)`, [tienda_id]);

  const TiendaProductosData = result.data[0].map((producto: any) => {
    return {
      ...producto,
    };
  });
  
  return {
    items: TiendaProductosData,
    success: true,
    status: 200,
  };
};

export const _updateProducto = async (producto: any) => {
  const { producto_id, nombre, stockTotal, precioBase, descuento } = producto;

  const queryText = `
        UPDATE producto 
        SET nombre = ?, stockTotal = ?, precioBase = ?, descuento = ?
        WHERE producto_id = ?`;

  const result = await query(queryText, [
    nombre,
    stockTotal,
    precioBase,
    descuento,
    producto_id,
  ]);

  if (!result.success) {
    console.error("Error al actualizar el producto:", result.error);
    return {
      message: "Error al actualizar el producto. Intente nuevamente más tarde.",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "Producto actualizado con éxito.",
    success: true,
    status: 200,
  };
};

export const _deleteProducto = async (producto_id: number) => {
  const queryText = `DELETE FROM producto WHERE producto_id = ?`;

  const result = await query(queryText, [producto_id]);

  if (!result.success) {
    console.error("Error al borrar el producto:", result.error);
    return {
      message: "Error al borrar el producto. Intente nuevamente más tarde.",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "Producto borrado con éxito.",
    success: true,
    status: 200,
  };
};

export const _loseProductos = async (tienda_id: string) => {
  try {
    const consulta = (await query(`CALL SP_GetLoseProductosTienda(?)`,[tienda_id])) as any;
    return {
      items: consulta.data[0],
      success: true,
      status: 202,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "_loseProductos",
      success: false,
      status: 404,
    };
  }
};

export const _getColoresProducto = async (producto_id: number) => {
  try {
    const [data] = (await query(`CALL SP_ColoresProductos(?);`, [
      producto_id,
    ])) as any;

    return {
      data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};
