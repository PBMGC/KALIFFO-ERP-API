import { query } from "../util/query";

export const _createTienda = async (tienda: any) => {
  const consulta = `
    INSERT INTO tienda (tienda, direccion, telefono)
    VALUES (?, ?, ?)
  `;

  try {
    const result = await query(consulta, [
      tienda.tienda,
      tienda.direccion,
      tienda.telefono,
    ]);

    return {
      message: "Tienda creada exitosamente.",
      data: result,
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear la tienda:", error);
    return {
      message: "Error al crear la tienda. Intente nuevamente más tarde.",
      success: false,
      status: 500,
    };
  }
};

export const _getTiendas = async () => {
  try {
    const response = (await query(`CALL SP_GetTiendas()`)) as any;

    const tiendasData = response.data[0].map((tienda: any) => {
      return {
        ...tienda,
      };
    });

    return {
      items: tiendasData,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getTiendas",
      success: false,
      status: 500,
    };
  }
};

export const _getTienda = async (tienda_id: number) => {
  try {
    const response = (await query(`CALL SP_GetTienda(?)`, [tienda_id])) as any;

    const tiendaData = response.data[0].map((tienda: any) => {
      return {
        ...tienda,
      };
    });

    return {
      items: tiendaData[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "error _getTienda",
      success: false,
      status: 500,
    };
  }
};

export const _desactivarTienda = async (tienda_id: number) => {
  const queryText =
    "UPDATE tienda SET estado = false WHERE tienda_id = ? AND estado != false;";

  try {
    const result = await query(queryText, [tienda_id]);
    console.log(result);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _activarTienda = async (tienda_id: number) => {
  const queryText =
    "UPDATE tienda SET estado = true WHERE tienda_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [tienda_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _updateTienda = async (tienda_id: number, tienda: any) => {
  const queryText =
    "UPDATE tienda SET tienda = ?, direccion = ?, telefono = ? WHERE tienda_id = ?";

  const { nombre, direccion, telefono } = tienda;

  try {
    const result = await query(queryText, [
      nombre,
      direccion,
      telefono,
      tienda_id,
    ]);
    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido actualizada`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id}`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al actualizar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _generarReporte = async (res:any,tienda_id:number)=>{
  
}