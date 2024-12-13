import { Horario } from "../interface/horario";
import { query } from "../util/query";

// Función para crear un nuevo registro de horario en la base de datos
// Recibe un objeto de tipo Horario y realiza una inserción en la tabla correspondiente
export const _createAsistencia = async (horario: Horario) => {
  const { hora_entrada, hora_salida, fecha, trabajador_id } = horario;

  const queryText = `
    INSERT INTO horario (hora_entrada, hora_salida, fecha, trabajador_id) 
    VALUES (?, ?, ?, ?)`;

  const result = await query(queryText, [
    hora_entrada,
    hora_salida,
    fecha,
    trabajador_id,
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

// Función para obtener todos los registros de horarios de la base de datos
// Permite filtrar los registros por el ID del usuario si se proporciona
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

// Función para calcular el total de horas trabajadas por un usuario en un rango de fechas
// Realiza la consulta sumando la diferencia en segundos entre hora de entrada y salida
export const _horasTrabajadas = async (
  fechaInicio: string,
  fechaFinal: string,
  usuario_id: number
) => {
  const queryText = `
  SELECT 
    u.usuario_id,
    u.sueldo,
    SEC_TO_TIME(SUM(TIMESTAMPDIFF(SECOND, h.hora_entrada, h.hora_salida))) AS horas_trabajadas
  FROM 
      horario h
  JOIN 
      usuario u ON h.usuario_id = u.usuario_id
  WHERE 
      h.usuario_id = ?
      AND h.fecha BETWEEN ? AND ?;
  `;
  const result = await query(queryText, [usuario_id, fechaInicio, fechaFinal]);

  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    item: result.data[0],
    success: true,
    status: 200,
  };
};
