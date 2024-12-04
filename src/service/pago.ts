import { query } from "../util/query";

export const _createPago = async (pago: any) => {
  try {
    const { trabajador_id, montoPagado, montoFaltante, fecha } = pago;
    const sql = `
      INSERT INTO pago (montoPagado, montoFaltante, fecha, trabajador_id)
      VALUES (?, ?, ?, ?);
    `;
    await query(sql, [montoFaltante, montoPagado, fecha, trabajador_id]);

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

export const _getPagos = async (trabajador_id: number) => {
  try {
    const sql = `
      SELECT * FROM pago WHERE trabajador_id = ?;
    `;
    const result = await query(sql, [trabajador_id]);

    const dataPagos = result.data.map((pago: any) => ({
      ...pago,
      fecha: new Date(pago.fecha).toISOString().split("T")[0], // Formato YYYY-MM-DD
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
    trabajador_id: string;
  }
) => {
  try {
    const { montoPagado, montoFaltante, fecha, trabajador_id } = pago;

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

    if (trabajador_id) {
      camposActualizar.push("trabajador_id = ?");
      valores.push(trabajador_id);
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
