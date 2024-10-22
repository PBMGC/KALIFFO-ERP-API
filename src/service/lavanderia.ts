import { query } from "../util/query";

export const _createLavanderia = async (lavanderia: any) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = lavanderia;

  const queryText = `
        INSERT INTO lavanderia (lote_id,color_id,talla,cantidad,precio_unidad,lavanderia_asignada,fecha_envio,fecha_recepcion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
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
    message: "envio a lavanderia creada con éxito.",
    success: true,
    status: 201,
  };
};
