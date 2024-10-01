import { query } from "../util/query";

export const _createColor = async (color: any) => {
  const { nombre, codigo } = color;

  const queryText = `
    INSERT INTO color (nombre, codigo) 
    VALUES (?, ?)`;

  const result = await query(queryText, [nombre, codigo]);

  if (!result.success) {
    console.error("Error al crear el color:", result.error);
    return {
      message: "Error al crear el color. Intente nuevamente más tarde.",
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
  const queryText = `SELECT * FROM color`;

  const result = await query(queryText);

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
