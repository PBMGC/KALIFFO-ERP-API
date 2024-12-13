import { query } from "../util/query";

// Función para crear una venta
export const _createVenta = async (venta: any) => {
  const {
    codigo,
    tipoVenta,
    tipoComprobante,
    fecha,
    totalBruto,
    totalIgv,
    totalNeto,
    tipoPago,
    dni,
    ruc,
    direccion,
    telefono,
    nombre,
    tienda_id,
    detalles,
  } = venta;

  // Verifica si el código de venta ya existe en la base de datos
  const ventaExistente = (await query(`SELECT * FROM venta WHERE codigo = ?`, [
    "FS-1",
  ])) as any;

  if (ventaExistente.data.length !== 0) {
    return {
      message: "Este código de venta ya existe.",
      success: false,
      status: 400, // Estado 400 indica que la solicitud tiene un error
    };
  }

  // Consulta SQL para insertar la venta en la base de datos
  const queryTextVenta = `
    INSERT INTO venta 
    (codigo, tipoVenta, tipoComprobante, fecha, totalBruto, totalIgv, totalNeto, tipoPago, dni, ruc, direccion, telefono, nombre, tienda_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    // Ejecuta la inserción de la venta
    const resultVenta = await query(queryTextVenta, [
      codigo,
      tipoVenta,
      tipoComprobante,
      fecha,
      totalBruto,
      totalIgv,
      totalNeto,
      tipoPago,
      dni,
      ruc,
      direccion,
      telefono,
      nombre,
      tienda_id,
    ]);

    const venta_id = resultVenta.insertId; // Obtiene el ID de la venta insertada

    // Llama a la función para crear los detalles de la venta
    const detallesResult = await _createDetalleVenta(venta_id, detalles);

    if (!detallesResult.success) {
      return {
        message: "Venta creada, pero algunos detalles tuvieron errores.",
        success: false,
        errors: detallesResult.errors,
        status: 400, // Estado 400 indica que hubo un error en algunos detalles
      };
    }

    return {
      message: "Venta y detalles creados con éxito.",
      success: true,
      status: 201, // Estado 201 indica que la creación fue exitosa
    };
  } catch (error) {
    console.error("Error al crear la venta o detalles:", error);
    return {
      message: "Error al crear la venta o detalles",
      success: false,
      status: 500, // Estado 500 indica un error en el servidor
    };
  }
};

// Función para crear los detalles de una venta
export const _createDetalleVenta = async (
  venta_id: number,
  detallesVenta: any[]
) => {
  const queryText = `
    INSERT INTO detalleVenta (venta_id, productoDetalle_id, codigo, cantidad, precioUnitario, precioNeto, igv)
    VALUES (?, ?, ?, ?, ?, ?, ?)`; // Consulta SQL para insertar los detalles de la venta

  let errors: any[] = []; // Array para almacenar los errores de los detalles

  // Itera sobre cada detalle de la venta y lo inserta en la base de datos
  for (let detalle of detallesVenta) {
    try {
      await query(queryText, [
        venta_id,
        detalle.productoDetalle_id,
        detalle.codigo,
        detalle.cantidad,
        detalle.precioUnitario,
        detalle.precioNeto,
        detalle.igv,
      ]);
    } catch (error: any) {
      console.error("Error al crear detalle de venta:", error);
      errors.push({
        productoDetalle_id: detalle.productoDetalle_id,
        message: error.message,
      }); // Guarda los errores para cada detalle que no se pudo insertar
    }
  }

  if (errors.length > 0) {
    return {
      message: "Se encontraron errores al crear algunos detalles de la venta.",
      errors,
      success: false,
      status: 400, // Estado 400 indica errores en los detalles
    };
  }

  return {
    message: "Detalles de venta creados con éxito.",
    success: true,
    status: 201, // Estado 201 indica que los detalles fueron creados exitosamente
  };
};

// Función para obtener todas las ventas, opcionalmente filtradas por tipo de comprobante
export const _getVentas = async (tipoComprobante?: number) => {
  try {
    let queryVentas = `
      SELECT 
        v.*, 
        t.tienda, 
        SUM(dv.cantidad) AS cantidad
      FROM venta v
      JOIN tienda t ON t.tienda_id = v.tienda_id
      JOIN detalleVenta dv ON dv.venta_id = v.venta_id
    `;

    // Filtra por tipo de comprobante si se proporciona
    if (tipoComprobante) {
      queryVentas += ` WHERE v.tipoComprobante = ?`;
    }

    queryVentas += `
      GROUP BY v.venta_id, t.tienda;
    `;

    const resultVentas = tipoComprobante
      ? await query(queryVentas, [tipoComprobante])
      : await query(queryVentas);

    return {
      items: resultVentas.data, // Retorna todas las ventas obtenidas
      success: true,
      status: 200, // Estado 200 indica que la recuperación fue exitosa
    };
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return {
      message: "Error al obtener las ventas",
      success: false,
      status: 500, // Estado 500 indica un error en el servidor
    };
  }
};

// Función para obtener una venta específica por su ID
export const _getVenta = async (venta_id: number) => {
  try {
    const queryVenta = `
      SELECT * FROM venta WHERE venta_id = ? 
    `;
    const resultVenta = (await query(queryVenta, [venta_id])) as any;

    if (resultVenta.length === 0) {
      return {
        message: "Venta no encontrada",
        success: false,
        status: 404, // Estado 404 indica que la venta no fue encontrada
      };
    }

    const venta = resultVenta.data[0];

    // Consulta los detalles de la venta
    const queryDetalles = `
      SELECT * FROM detalleVenta WHERE venta_id = ? 
    `;
    const resultDetalles = await query(queryDetalles, [venta_id]);

    venta.detalles = resultDetalles.data; // Agrega los detalles a la venta

    return {
      item: resultVenta.data[0], // Retorna la venta con sus detalles
      success: true,
      status: 200, // Estado 200 indica éxito en la recuperación
    };
  } catch (error) {
    console.error("Error al obtener la venta:", error);
    return {
      message: "Error al obtener la venta",
      success: false,
      status: 500, // Estado 500 indica un error en el servidor
    };
  }
};

// Función para desactivar una venta (establecer su estado a 0)
export const _desactivarVenta = async (venta_id: number) => {
  const queryText =
    "UPDATE venta SET estado = 0 WHERE venta_id = ? AND estado != 0;"; // Consulta SQL para desactivar la venta

  try {
    const result = await query(queryText, [venta_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La venta con ID ${venta_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200, // Estado 200 indica que la venta fue desactivada exitosamente
      };
    } else {
      return {
        message: `No se encontró venta con ID ${venta_id} o ya estaba desactivada.`,
        success: false,
        status: 400, // Estado 400 indica que no se pudo desactivar la venta
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar la venta:", error);
    return {
      message: error.message || "Error desconocido al desactivar venta.",
      success: false,
      status: 500, // Estado 500 indica un error en el servidor
    };
  }
};

// Función para activar una venta (establecer su estado a true)
export const _activarVenta = async (venta_id: number) => {
  const queryText =
    "UPDATE venta SET estado = true WHERE venta_id = ? AND estado != true;"; // Consulta SQL para activar la venta

  try {
    const result = await query(queryText, [venta_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La venta con ID ${venta_id} ha sido activada correctamente.`,
        success: true,
        status: 200, // Estado 200 indica que la venta fue activada exitosamente
      };
    } else {
      return {
        message: `No se encontró venta con ID ${venta_id} o ya estaba activada.`,
        success: false,
        status: 400, // Estado 400 indica que no se pudo activar la venta
      };
    }
  } catch (error: any) {
    console.error("Error al activar venta:", error);
    return {
      message: error.message || "Error desconocido al activar venta.",
      success: false,
      status: 500, // Estado 500 indica un error en el servidor
    };
  }
};
