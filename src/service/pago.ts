import { query } from "../util/query";

export const _createPago = async (pago: any) => {
  try {
    const { usuario_id, montoPagado, montoFaltante, fecha } = pago;
    const sql = `
      INSERT INTO pago (montoPagado, montoFaltante, fecha, usuario_id)
      VALUES (?, ?, ?, ?);
    `;
    await query(sql, [montoFaltante, montoPagado, fecha, usuario_id]);

    return {
      message: "Pago creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return {
      message: "Error al crear el pago",
      success: false,
      status: 500,
    };
  }
};

export const _getPagos = async (usuario_id: number) => {
  try {
    const sql = `
      SELECT * FROM pago WHERE usuario_id = ?;
    `;
    const result = await query(sql, [usuario_id]);
    
    const dataPagos = result.data.map((pago: any) => ({
      ...pago,
      fecha: new Date(pago.fecha).toISOString().split('T')[0] // Formato YYYY-MM-DD
    }));

    return {
      items: dataPagos,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    return {
      message: "Error al obtener los pagos",
      success: false,
      status: 500,
    };
  }
};

export const _deletePagos = async (pago_id: number) => {
  try {
    const sql = `
      DELETE FROM pago WHERE pago_id = ?;
    `;
    await query(sql, [pago_id]);

    return {
      message: "Eliminación exitosa",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    return {
      message: "Error al eliminar el pago",
      success: false,
      status: 500,
    };
  }
};

export const _updatePago = async (
  pago_id: number,
  pago: {
    montoPagado?: number;
    montoFaltante?: number;
    fecha?: string;
    usuario_id: string;
  }
) => {
  try {
    const { montoPagado, montoFaltante, fecha, usuario_id } = pago;

    const camposActualizar: string[] = [];
    const valores: any[] = [];

    if (montoPagado !== undefined) {
      camposActualizar.push("montoPagado = ?");
      valores.push(montoPagado);
    }

    if (montoFaltante !== undefined) {
      camposActualizar.push("montoFaltante = ?");
      valores.push(montoFaltante);
    }

    if (fecha) {
      camposActualizar.push("fecha = ?");
      valores.push(fecha);
    }

    if (usuario_id) {
      camposActualizar.push("usuario_id = ?");
      valores.push(usuario_id);
    }

    if (camposActualizar.length === 0) {
      return {
        message: "No se proporcionaron campos para actualizar",
        success: false,
        status: 400,
      };
    }

    valores.push(pago_id);

    const sql = `
      UPDATE pago
      SET ${camposActualizar.join(", ")}
      WHERE pago_id = ?;
    `;

    await query(sql, valores);

    return {
      message: "Pago actualizado exitosamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    return {
      message: "Error al actualizar el pago",
      success: false,
      status: 500,
    };
  }
};
