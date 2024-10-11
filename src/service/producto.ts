import redisClient from "../redis/redisClient";
import { createCodigo } from "../util/createCodigo";
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

export const _createProductoCompleto = async (
  tienda_id: number,
  producto_id: number,
  detalles: any
) => {
  let errors: any[] = [];

  for (let detalle of detalles) {
    try {
      const resultDetalle = await _createProductoDetalle({
        producto_id: producto_id,
        color_id: detalle.color_id,
        tienda_id: tienda_id,
        stock: detalle.stock,
      });

      const productoDetalle_id = resultDetalle.insertId;

      const codigo = await createCodigo(producto_id, detalle);

      const codigoExistente = await query(
        `SELECT COUNT(*) as total FROM productoTalla WHERE codigo = ?`,
        [codigo]
      );

      if (codigoExistente.data[0].total > 0) {
        errors.push({
          message: `Ya existe producto con color_id ${detalle.color_id} y talla ${detalle.talla}`,
          producto_id: producto_id,
          talla: detalle.talla,
          color_id: detalle.color_id,
        });
        continue;
      }

      await _createProductoTalla({
        productoDetalle_id: productoDetalle_id,
        talla: detalle.talla,
        codigo,
      });
    } catch (error: any) {
      console.log(error);

      errors.push({
        message: `Error al procesar el producto_id ${producto_id} con color_id ${detalle.color_id}`,
        error: error.message,
      });
    }
  }

  return {
    message:
      errors.length > 0
        ? "Se encontraron errores en algunos productos."
        : "Producto(s) creado(s) con éxito.",
    errors,
    success: errors.length === 0, // Si no hubo errores, success es true
    status: errors.length > 0 ? 400 : 201,
  };
};

export const _createProductoTalla = async (productoTalla: any) => {
  const { productoDetalle_id, talla, codigo } = productoTalla;

  const queryText = `
        INSERT INTO productoTalla (productoDetalle_id, talla, codigo)
        VALUES (?, ?, ?);
  `;

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

export const _createProductoDetalle = async (productoDetalle: any) => {
  const { producto_id, color_id, tienda_id, stock } = productoDetalle;

  const queryText = `
        INSERT INTO productoDetalle (producto_id, color_id, tienda_id, stock)
        VALUES (?, ?, ?, ?);
  `;

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
      status: result.status,
    };
  }

  return {
    message: "ProductoDetalle creado con éxito.",
    success: true,
    insertId: result.insertId,
    status: 201,
  };
};

export const _getProductos = async () => {
  const cacheKey = "productos";

  try {
    const cachedProductos = await redisClient.get(cacheKey);
    if (cachedProductos) {
      console.log("Productos obtenidos de caché");
      return {
        items: JSON.parse(cachedProductos),
        success: true,
        status: 200,
      };
    }

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
  } catch (error) {
    console.log(error);
    return {
      message: "Error al obtener productos.",
      success: false,
      status: 500,
    };
  }
};

export const _getProducto = async (producto_id: number) => {
  const queryBase = `
    SELECT p.*, COUNT(c.color_id) AS cantidad_colores
    FROM producto p
    LEFT JOIN productodetalle pd ON p.producto_id = pd.producto_id
    LEFT JOIN color c ON pd.color_id = c.color_id
    WHERE p.producto_id = ?
    GROUP BY p.producto_id;
  `;

  // const queryTienda = `
  //   SELECT tienda.tienda_id,tienda.tienda, SUM(productodetalle.stock) as "STOCK"
  //   FROM productodetalle
  //   INNER JOIN tienda ON tienda.tienda_id = productodetalle.tienda_id
  //   WHERE productodetalle.producto_id=?
  //   GROUP BY tienda.tienda;
  // `;

  // const queryColores = `
  //   SELECT productodetalle.productoDetalle_id,color.nombre, SUM(productodetalle.stock) as "STOCK"
  //   FROM productodetalle
  //   INNER JOIN color ON color.color_id = productodetalle.color_id
  //   WHERE productodetalle.producto_id=?
  //   GROUP BY color.nombre;
  // `;

  // const queryTallas = `
  //   SELECT talla, COUNT(*) AS cantidad
  //   FROM productotalla
  //   WHERE productoDetalle_id IN (
  //     SELECT productodetalle.productoDetalle_id
  //     FROM productodetalle
  //     WHERE producto_id=?
  //   )
  //   GROUP BY talla;
  // `;

  // Ejecutar todas las consultas en paralelo
  const [result1] = await Promise.all([
    query(queryBase, [producto_id]),
    // query(queryTienda, [producto_id]),
    // query(queryColores, [producto_id]),
    // query(queryTallas, [producto_id])
  ]);

  // if (!result1.success || !result2.success || !result3.success || !result4.success) {
  //   const error = result1.error || result2.error || result3.error || result4.error;
  //   return {
  //     message: error,
  //     success: false,
  //     status: result1.status || result2.status || result3.status || result4.status || 500,
  //   };
  // }

  if (!result1.success) {
    const error = result1.error;
    return {
      message: error,
      success: false,
      status: result1.status || 500,
    };
  }

  const DataProductos = {
    ...result1.data[0],
    // tiendas: result2.data,
    // colores: result3.data,
    // tallas: result4.data
  };

  return {
    item: DataProductos,
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
        SET nombre = ?, precioBase = ?, descuento = ?
        WHERE producto_id = ?`;

  const result = await query(queryText, [
    nombre,
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

export const _deleteProducto = async (
  producto_id: number,
  tienda_id: number
) => {
  const queryText = `DELETE FROM productodetalle WHERE producto_id = ? AND tienda_id=?`;

  const result = await query(queryText, [producto_id, tienda_id]);

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

export const _loseProductos = async (tienda_id: number) => {
  try {
    const consulta = (await query(`CALL SP_GetLoseProductosTienda(?)`, [
      tienda_id,
    ])) as any;
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
    const consulta = (await query(`CALL SP_ColoresProductos(?);`, [
      producto_id,
    ])) as any;

    console.log(consulta.data[0]);

    return {
      items: consulta.data[0],
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

export const _getDetalleProducto = async (
  producto_id: number,
  tienda_id: number,
  tipo: string
) => {
  try {
    let queryS: string;
    let params: Array<number>;

    if (tipo === "tiendas") {
      queryS = `
      SELECT tienda.tienda_id, tienda.tienda, SUM(productodetalle.stock) as "STOCK"
      FROM productodetalle
      INNER JOIN tienda ON tienda.tienda_id = productodetalle.tienda_id
      WHERE productodetalle.producto_id=?
      GROUP BY tienda.tienda;
      `;
      params = [producto_id];
    } else if (tipo === "colores") {
      queryS = `CALL SP_GetColoresProducto(?, ?);`;
      params = [producto_id, tienda_id];
    } else if (tipo === "tallas") {
      queryS = `
        SELECT talla, COUNT(*) AS cantidad 
        FROM productotalla 
        WHERE productoDetalle_id IN (
          SELECT productodetalle.productoDetalle_id 
          FROM productodetalle 
          WHERE producto_id=?
        ) 
        GROUP BY talla;
      `;
      params = [producto_id];
    } else {
      throw new Error("Tipo no válido");
    }

    const consulta = await query(queryS, params);

    let data;
    if (tipo === "colores") {
      data = consulta.data[0];
    } else {
      data = consulta.data;
    }

    return {
      items: data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : "Error desconocido",
      success: false,
      status: 500,
    };
  }
};

export const _getTallaProducto = async (detalle_id: number) => {
  try {
    const consulta = (await query(
      `
        SELECT talla, COUNT(*) AS cantidad FROM productotalla WHERE productoDetalle_id = ? GROUP BY talla;
      `,
      [detalle_id]
    )) as any;

    console.log(consulta.data);

    return {
      items: consulta.data,
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
