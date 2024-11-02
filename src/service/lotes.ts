import { query } from "../util/query";

export const _createLote = async () => {
  const queryText = `SELECT codigo_lote FROM lotes ORDER BY lote_id DESC LIMIT 1`;

  try {
    const result = await query(queryText);

    let codigo;

    if (result && result.data.length > 0) {
      const ultimoLote = result.data[0].codigo_lote;
      const numero = parseInt(ultimoLote.split("-")[1]) + 1;
      codigo = `LT-${numero.toString().padStart(2, "0")}`;
    } else {
      codigo = "LT-01";
    }

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const queryInsert = `
        INSERT INTO lotes (codigo_lote, fecha_creacion) 
        VALUES (?, ?)`;

    const resultInsert = await query(queryInsert, [codigo, fechaHoy]);

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

// export const _sgtEstadoLote = async (lote_id: number) => {
//   try {
//     const result = await query("SELECT * FROM lotes WHERE lote_id = ?", [
//       lote_id,
//     ]);

//     const lote = result.data[0] as any;

//     if (lote.estado === 4 || lote.estado === 0) {
//       return {
//         message: "El lote ya está en el último estado o esta desactivado",
//         success: true,
//         status: 200,
//       };
//     }

//     const updateLote = await query(
//       "UPDATE lotes SET estado = ? WHERE lote_id = ?",
//       [lote.estado + 1, lote_id]
//     );

//     if (updateLote.affectedRows > 0) {
//       return {
//         message: "El estado del lote ha sido actualizado",
//         item: updateLote,
//         success: false,
//         status: 400,
//       };
//     } else {
//       return {
//         message: "No se pudo actualizar el estado del lote",
//         success: false,
//         status: 400,
//       };
//     }
//   } catch (error) {
//     return {
//       msg: "Error en _sgtEstadoLote",
//       success: false,
//       status: 500,
//     };
//   }
// };

// export const _UpdateLote = async (
//   lote_id: number,
//   estado: number,
//   etapa: string
// ) => {
//   try {
//     let queryS;

//     //lote 1 a 2 quitar estado ,etapa

//     if (etapa === "cortes") {
//       queryS = `
//             UPDATE cortes SET estado = ? WHERE lote_id = ?;
//         `;
//     } else if (etapa === "lavanderia") {
//       queryS = `
//             UPDATE lavanderia SET estado = ? WHERE lote_id = ?;
//         `;
//     } else {
//       return {
//         message: "Etapa no válida.",
//         success: false,
//         status: 400,
//       };
//     }

//     await query(queryS, [estado, lote_id]);

//     return {
//       message: "Lote actualizado con éxito.",
//       success: true,
//       status: 200,
//     };
//   } catch (error: any) {
//     return {
//       message: "Error al actualizar el lote.",
//       success: false,
//       error: error.message || error,
//       status: 500,
//     };
//   }
// };

export const _getLotes = async () => {
  const queryText = `select * from lotes where estado !=0`;

  try {
    const result = await query(queryText, []);
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
