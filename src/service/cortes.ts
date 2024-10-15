import { query } from "../util/query";

export const _createCorte = async (corte: any) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tela_id,
  } = corte;

  const queryText = `
        INSERT INTO cortes (lote_id ,taller_id ,producto_id ,cantidad ,talla ,metraje_asignado ,tela_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tela_id,
  ]);

  // if (!result.success) {
  //   console.error("Error al crear la compra:", result.error);
  //   return {
  //     message: "Error al crear el compra. Intente nuevamente más tarde.",
  //     success: false,
  //     status: result.status || 500,
  //   };
  // }

  return {
    message: "tela creada con éxito.",
    success: true,
    status: 201,
  };
};
