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
