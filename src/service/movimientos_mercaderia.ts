import { query } from "../util/query";

// Función para obtener los movimientos de mercadería en función del ID de la tienda
export const _getmovimientos_mercaderia = async (tienda_id: number) => {
  try {
    let queryS: string;
    let params: Array<number> = []; // Inicializa el array de parámetros

    // Si se proporciona un ID de tienda, buscamos los movimientos donde la tienda es origen o destino
    if (tienda_id) {
      queryS = `
        SELECT * FROM movimientomercaderia
        WHERE movimientomercaderia.tienda_idI = ? 
        OR movimientomercaderia.tienda_idF = ?;
      `;
      params = [tienda_id, tienda_id];
    } else {
      // Si no se proporciona un ID de tienda, obtenemos todos los movimientos
      queryS = `
        SELECT * FROM movimientomercaderia;
      `;
    }

    // Imprime la consulta para depuración
    console.log(queryS);

    // Ejecutar la consulta y retornar los datos
    const data = await query(queryS, params);
    return {
      items: data.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "ERROR AL OBTENER MOVIMIENTOS",
      success: false,
      status: 500,
    };
  }
};

// Función para crear un nuevo movimiento de mercadería
export const _createmovimientos_mercaderia = async (movimiento: any) => {
  try {
    // Consulta para verificar si el producto existe en la tienda de destino
    const Queryvalidar =
      "SELECT productoDetalle.productoDetalle_id FROM productoDetalle WHERE producto_id = ? AND tienda_id = ?";

    // Ejecuta la consulta de validación
    const tiendaResult = (await query(Queryvalidar, [
      movimiento.producto_id,
      movimiento.tienda_idD,
    ])) as any;

    // Imprime el resultado de la consulta para depuración
    console.log(tiendaResult.data[0]);

    // Si el producto existe en la tienda destino
    if (tiendaResult.data.length > 0) {
      console.log("SI HAY "); // Producto encontrado
    } else {
      console.log("NO HAY WEY"); // Producto no encontrado
    }

    return {
      items: "HOLA", // Se debe reemplazar con los datos reales que se desean retornar
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "ERROR AL OBTENER MOVIMIENTOS",
      success: false,
      status: 500,
    };
  }
};
