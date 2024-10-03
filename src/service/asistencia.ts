import { query } from "../util/query";

export const _createAsistencia = async (horario: any) => {
  const { hora_entrada, hora_salida, fecha, usuario_id } = horario;

  const queryText = `
    INSERT INTO horario (hora_entrada, hora_salida, fecha, usuario_id) 
    VALUES (?, ?, ?, ?)`;

  const result = await query(queryText, [
    hora_entrada,
    hora_salida,
    fecha,
    usuario_id,
  ]);

  if (!result.success) {
    console.error("Error al crear el horario:", result.error);
    return {
      message: "Error al crear el horario. Intente nuevamente más tarde.",
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "Horario creado con éxito.",
    success: true,
    status: 201,
  };
};

export const _getAsistencias = async (ususario_id?: number) => {
  let queryText = `
  SELECT *, 
    TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) AS min_trabajadas,
    TIMESTAMPDIFF(HOUR, hora_entrada, hora_salida) AS horas_trabajadas  
  FROM horario`;

  if (ususario_id) {
    queryText += ` WHERE usuario_id = ?`;
  }

  const result = await query(queryText, ususario_id ? [ususario_id] : []);

  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    items: result.data,
    success: true,
    status: 200,
  };
};
