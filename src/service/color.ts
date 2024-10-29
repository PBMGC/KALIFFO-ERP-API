import { Color } from "../interface/color";
import { query } from "../util/query";

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
    items: result.data,
    success: true,
    status: 200,
  };
};
