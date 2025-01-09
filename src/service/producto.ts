import redisClient from "../redis/redisClient";
import { createCodigoProductoTalla } from "../util/createCodigos";
import { query } from "../util/query";

// Función para crear un nuevo producto
export const _createProducto = async (producto: any) => {
  const { nombre, stockTotal, precioBase, descuento, estado } = producto;

  const queryText = `
        INSERT INTO producto (nombre, stockTotal, precioBase, descuento, estado)
        VALUES (?, ?, ?, ?, ?)`;

  // Ejecuta la consulta para insertar el producto
  const result = await query(queryText, [
    nombre,
    stockTotal,
    precioBase,
    descuento,
    estado,
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

// Función para crear un producto completo (detalle, tallas, etc.)
export const _createProductoCompleto = async (
  tienda_id: string | null = null,
  almacen_id: string | null = null,
  producto_id: number,
  detalles: any,
  lote_id: string
) => {
  let errors: any[] = [];

  // Itera sobre los detalles del producto (colores, tallas, etc.)
  for (let detalle of detalles) {
    try {
      // Crear el producto detalle
      const resultDetalle = await _createProductoDetalle({
        producto_id: producto_id,
        color_id: detalle.color_id,
        tienda_id: tienda_id,
        almacen_id: almacen_id,
        stock: detalle.stock,
        lote_id: lote_id,
      });

      const productoDetalle_id = resultDetalle.insertId;

      // Crear el código de producto talla
      const codigo = await createCodigoProductoTalla(producto_id, detalle);

      // Verificar si ya existe el código de producto talla
      const codigoExistente = await query(
        `SELECT COUNT(*) as total FROM productoTalla WHERE codigo = ?`,
        [codigo]
      );

      // Si existe, se agrega a los errores
      if (codigoExistente.data[0].total > 0) {
        errors.push({
          message: `Ya existe producto con color_id ${detalle.color_id} y talla ${detalle.talla}`,
          producto_id: producto_id,
          talla: detalle.talla,
          color_id: detalle.color_id,
        });
        continue;
      }

      // Crear la talla del producto
      await _createProductoTalla({
        stock: detalle.stock,
        productoDetalle_id: productoDetalle_id,
        talla: detalle.talla,
        codigo,
      });
    } catch (error: any) {
      // En caso de error, se agrega el error al arreglo
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

// Función para crear las tallas del producto
export const _createProductoTalla = async (productoTalla: any) => {
  const { stock, productoDetalle_id, talla, codigo } = productoTalla;

  // Crear una talla para cada unidad en stock
  for (var i = 0; i < stock; i++) {
    const queryText = `
      INSERT INTO productoTalla (productoDetalle_id, talla, codigo)
      VALUES (?, ?, ?);
    `;
    const result = await query(queryText, [productoDetalle_id, talla, codigo]);
  }

  return {
    message: "ProductoTalla creado con éxito.",
    success: true,
    status: 201,
  };
};

// Función para crear un detalle de producto (color, stock, etc.)
export const _createProductoDetalle = async (productoDetalle: any) => {
  const { producto_id, color_id, tienda_id, almacen_id, stock, lote_id } =
    productoDetalle;

  const queryText = `
    INSERT INTO productoDetalle (producto_id, color_id, stock, lote_id, tienda_id, almacen_id )
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  // Ejecuta la consulta para insertar el detalle del producto
  const result = await query(queryText, [
    producto_id,
    color_id,
    stock,
    lote_id,
    tienda_id,
    almacen_id,
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

// Función para obtener productos desde la base de datos (con caché)
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

    const queryText = `SELECT * FROM producto where estado=1`;
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

// Función para obtener información de un producto específico
export const _getProducto = async (producto_id: number) => {
  const queryBase = `
    SELECT p.*, COUNT(c.color_id) AS cantidad_colores
    FROM producto p
    LEFT JOIN productodetalle pd ON p.producto_id = pd.producto_id
    LEFT JOIN color c ON pd.color_id = c.color_id
    WHERE p.producto_id = ?
    GROUP BY p.producto_id;
  `;

  const [result1] = await Promise.all([query(queryBase, [producto_id])]);

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
  };

  return {
    item: DataProductos,
    success: true,
    status: 200,
  };
};

// Función para obtener los productos de una tienda específica
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

// Función para actualizar los datos de un producto
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

// Función para desactivar un producto (cambiar estado a false)
export const _desactivarProducto = async (producto_id: number) => {
  const queryText =
    "UPDATE producto SET estado = false WHERE producto_id = ? AND estado != false;";

  try {
    const result = await query(queryText, [producto_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El producto con ID ${producto_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró producto con ID ${producto_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar la producto:", error);
    return {
      message: error.message || "Error desconocido al desactivar producto.",
      success: false,
      status: 500,
    };
  }
};

// Función para activar un producto (cambiar estado a true)
export const _activarProducto = async (producto_id: number) => {
  const queryText =
    "UPDATE producto SET estado = true WHERE producto_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [producto_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El producto con ID ${producto_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró producto con ID ${producto_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar producto:", error);
    return {
      message: error.message || "Error desconocido al desactivar producto.",
      success: false,
      status: 500,
    };
  }
};

// Función para imprimir códigos de barras en un archivo PDF
export const _imprimirCodigo = async (res: any, lote_id: string) => {
  try {
    const JsBarcode = require("jsbarcode");
    const { createCanvas } = require("canvas");
    const PDFDocument = require("pdfkit-table");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="codigo_${lote_id}.pdf"`
    );

    const dataCodigos: any = await query(`
        SELECT 
          pt.codigo
        FROM 
            productotalla pt
        INNER JOIN 
            productodetalle pd ON pt.productoDetalle_id = pd.productoDetalle_id
        WHERE 
            pd.lote_id = ${lote_id};
      `);

    const doc = new PDFDocument({
      size: [100 * 2.83, 140 * 2.83],
      margin: 0,
    });

    doc.pipe(res);

    let posX = 0;
    let posY = 5;
    const spaceX = 4;
    const spaceY = 20;
    const barcodeWidth = 140;
    const barcodeHeight = 60;
    const maxCodesPerPage = 10;

    dataCodigos.data.forEach((item: any, i: number) => {
      const codigo = item.codigo;

      if (i > 0 && i % maxCodesPerPage === 0) {
        doc.addPage();
        posX = 0;
        posY = 5;
      }

      const canvas = createCanvas(barcodeWidth, barcodeHeight);
      JsBarcode(canvas, codigo, {
        format: "CODE128",
        width: 2,
        fontOptions: "bold",
        fontSize: 20,
        height: 100,
      });

      const imgData = canvas.toBuffer("image/png");

      doc.image(imgData, posX, posY, {
        width: barcodeWidth,
        height: barcodeHeight,
      });

      posX = (i + 1) % 2 === 0 ? 0 : posX + barcodeWidth + spaceX;
      posY += (i + 1) % 2 === 0 ? barcodeHeight + spaceY : 0;
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar el PDF");
  }
};
