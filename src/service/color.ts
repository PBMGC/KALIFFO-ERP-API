import { Color } from "../interface/color";
import { query } from "../util/query";

// Función para crear un nuevo color utilizando un procedimiento almacenado
// Recibe un objeto de tipo Color y llama al procedimiento almacenado SP_CreateColor
export const _createColor = async (color: Color) => {
  const { nombre, codigo } = color;

  const result = await query("call SP_CreateColor(?, ?)", [nombre, codigo]);

  if (!result.success) {
    return {
      error: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    message: "Color creado con éxito.",
    success: true,
    status: 201,
  };
};

// Función para obtener todos los colores registrados llamando a un procedimiento almacenado
// Utiliza SP_GetColores para recuperar los colores desde la base de datos
export const _getColores = async () => {
  const result = await query("call SP_GetColores()");

  if (!result.success) {
    return {
      message: result.error,
      success: false,
      status: result.status || 500,
    };
  }

  return {
    items: result.data[0] || [],
    success: true,
    status: 200,
  };
};
