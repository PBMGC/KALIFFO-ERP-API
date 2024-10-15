import { createCodigoVenta } from "../util/createCodigos";
import { query } from "../util/query";

export const _createVenta = async (venta: any) => {
  const {
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

  const codigo = await createCodigoVenta(tipoComprobante, tienda_id);

  // return {
  //   message: `codigo creado ${codigo}`,
  //   success: false,
  //   status: 400,
  // };
  const ventaExistente = (await query(`SELECT * FROM venta WHERE codigo = ?`, [
    codigo,
  ])) as any;

  if (ventaExistente.data.length !== 0) {
    return {
      message: "Este código de venta ya existe.",
      success: false,
      status: 400,
    };
  }

  const queryTextVenta = `
    INSERT INTO venta 
    (codigo, tipoVenta, tipoComprobante, fecha, totalBruto, totalIgv, totalNeto, tipoPago, dni, ruc, direccion, telefono, nombre, tienda_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
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

    const venta_id = resultVenta.insertId;

    const detallesResult = await _createDetalleVenta(venta_id, detalles);

    if (!detallesResult.success) {
      return {
        message: "Venta creada, pero algunos detalles tuvieron errores.",
        success: false,
        errors: detallesResult.errors,
        status: 400,
      };
    }

    return {
      message: "Venta y detalles creados con éxito.",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear la venta o detalles:", error);
    return {
      message: "Error al crear la venta o detalles",
      success: false,
      status: 500,
    };
  }
};

export const _createDetalleVenta = async (
  venta_id: number,
  detallesVenta: any[]
) => {
  const queryText = `
    INSERT INTO detalleVenta (venta_id, productoDetalle_id, codigo, cantidad, precioUnitario, precioNeto, igv)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  let errors: any[] = [];

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
      });
    }
  }

  if (errors.length > 0) {
    return {
      message: "Se encontraron errores al crear algunos detalles de la venta.",
      errors,
      success: false,
      status: 400,
    };
  }

  return {
    message: "Detalles de venta creados con éxito.",
    success: true,
    status: 201,
  };
};

export const _getVentas = async (tipoComprobante?: number) => {
  try {
    let queryVentas = `
      SELECT 
        v.*, 
        t.tienda, 
        SUM(dv.cantidad) AS total_cantidad
      FROM venta v
      JOIN tienda t ON t.tienda_id = v.tienda_id
      JOIN detalleVenta dv ON dv.venta_id = v.venta_id
    `;

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
      items: resultVentas.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return {
      message: "Error al obtener las ventas",
      success: false,
      status: 500,
    };
  }
};

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
        status: 404,
      };
    }

    const venta = resultVenta.data[0];

    const queryDetalles = `
      SELECT * FROM detalleVenta WHERE venta_id = ?
    `;
    const resultDetalles = await query(queryDetalles, [venta_id]);

    venta.detalles = resultDetalles.data;

    return {
      item: resultVenta.data[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener la venta:", error);
    return {
      message: "Error al obtener la venta",
      success: false,
      status: 500,
    };
  }
};

export const _desactivarVenta = async (venta_id: number) => {
  const queryText =
    "UPDATE venta SET estado = false WHERE venta_id = ? AND estado != false;";

  try {
    const result = await query(queryText, [venta_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La venta con ID ${venta_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró venta con ID ${venta_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar la venta:", error);
    return {
      message: error.message || "Error desconocido al desactivar venta.",
      success: false,
      status: 500,
    };
  }
};

export const _activarVenta = async (venta_id: number) => {
  const queryText =
    "UPDATE venta SET estado = true WHERE venta_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [venta_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La venta con ID ${venta_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró venta con ID ${venta_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar venta:", error);
    return {
      message: error.message || "Error desconocido al activar venta.",
      success: false,
      status: 500,
    };
  }
};
