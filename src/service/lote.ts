import { Lote } from "../interface/lote";
import { query } from "../util/query";

// Función para crear un nuevo lote en la base de datos
export const _createLote = async (lote: Lote) => {
  try {
    // Obtener el último código de lote generado
    const result = await query(
      `SELECT codigo_lote FROM lote ORDER BY lote_id DESC LIMIT 1`,
      []
    );

    let codigo;

    // Si existen lotes previos, genera el código del nuevo lote basado en el último
    if (result && result.data.length > 0) {
      const ultimoLote = result.data[0].codigo_lote;
      const numero = parseInt(ultimoLote.split("-")[1]) + 1;
      codigo = `LT-${numero.toString().padStart(2, "0")}`;
    } else {
      // Si no hay lotes previos, asigna el código inicial "LT-01"
      codigo = "LT-01";
    }

    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaHoy = new Date().toISOString().slice(0, 10);

    // Insertar un nuevo lote en la base de datos
    const resultInsert = await query(
      `
        INSERT INTO lote (codigo_lote, fecha_creacion, tipo_tela, metraje, productos)
        VALUES (?, ?, ?, ?, ?);`,
      [codigo, fechaHoy, lote.tipo_tela, lote.metraje, lote.productos]
    );

    // Manejo de errores en la inserción
    if (!resultInsert.success) {
      console.error("Error al crear el lote:", resultInsert.error);
      return {
        message: "Error al crear el lote. Intente nuevamente más tarde.",
        success: false,
        status: resultInsert.status || 500,
      };
    }

    return {
      message: "Lote creado con éxito.",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error interno. Intente nuevamente más tarde.",
      success: false,
      status: 500,
    };
  }
};

// Función para obtener todos los lotes activos (estado != 0)
export const _getLotes = async () => {
  try {
    const result = await query(`select * from lote where estado !=0`, []);
    return {
      items: result.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "Error _getLotes",
      success: false,
      status: 500,
    };
  }
};

// Función para obtener un lote específico por su ID
export const _getLote = async (lote_id: number) => {
  try {
    const result = await query(
      `select * from lote where estado !=0 and lote_id = ?;`,
      [lote_id]
    );
    return {
      item: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "Error _getLotes",
      success: false,
      status: 500,
    };
  }
};

// Función para obtener los productos asociados a un lote específico
export const _getLoteProductos = async (lote_id: number) => {
  try {
    // Obtener el lote desde la base de datos
    const resultLote = await query("SELECT * FROM lote WHERE lote_id = ?", [
      lote_id,
    ]);
    const lote = resultLote.data[0];

    // Verificar que el lote existe y contiene productos
    if (!lote || !lote.productos) {
      return {
        msg: "Lote no encontrado o no tiene productos",
        success: false,
        status: 404,
      };
    }

    // Convertir la lista de productos (string de IDs) a un array de números
    const productosArray = lote.productos.split(",").map(Number);

    // Obtener los productos asociados al lote
    const productos = await query(
      `SELECT * FROM producto WHERE producto_id IN (${productosArray
        .map(() => "?")
        .join(",")})`,
      productosArray
    );

    return {
      items: productos.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error en _getLoteProductos:", error);
    return {
      msg: "Error _getLoteProductos",
      success: false,
      status: 500,
    };
  }
};
