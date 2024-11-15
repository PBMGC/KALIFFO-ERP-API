import { Corte } from "../interface/corte";
import { query } from "../util/query";
import { _createLavanderia } from "./lavanderia";

export const _createCorte = async (corte: Corte) => {
  const { lote_id, taller_id, producto_id, cantidad_enviada, talla } = corte;

  try {
    await query(
      `
        INSERT INTO cortes (lote_id ,taller_id ,producto_id ,cantidad_enviada ,talla) 
        VALUES (?, ?, ?, ?, ?)`,
      [lote_id, taller_id, producto_id, cantidad_enviada, talla]
    );

    await query(
      `
      UPDATE lotes 
      SET cantidad_total = cantidad_total + ?
      WHERE lote_id = ?;
    `,
      [cantidad_enviada, lote_id]
    );

    return {
      message: "corte creada con éxito.",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error al crear corte.",
      success: false,
      status: 500,
    };
  }
};

export const _createCorteArray = async (corte: any, lote_id: number) => {
  const { detalles, producto_id } = corte;
  const errors: any[] = [];
  const successDetails: any[] = [];

  for (const detalle of detalles) {
    const { taller_id, cantidad_enviada, talla } = detalle;

    try {
      await query(
        `
        INSERT INTO cortes (lote_id, taller_id, producto_id, cantidad_enviada, talla) 
        VALUES (?, ?, ?, ?, ?)`,
        [lote_id, taller_id, producto_id, cantidad_enviada, talla]
      );

      await query(
        `
        UPDATE lotes 
        SET cantidad_total = cantidad_total + ?
        WHERE lote_id = ?;
        `,
        [cantidad_enviada, lote_id]
      );

      successDetails.push({
        lote_id,
        taller_id,
        producto_id,
        cantidad_enviada,
        talla,
      });
    } catch (error: any) {
      errors.push({
        error: error.message,
        detalle: {
          lote_id,
          taller_id,
          producto_id,
          cantidad_enviada,
          talla,
        },
      });
    }
  }

  if (errors.length === 0) {
    return {
      message: "Todos los cortes se crearon con éxito.",
      success: true,
      status: 201,
      data: successDetails,
    };
  } else {
    return {
      message: "Algunos cortes no se pudieron crear.",
      success: false,
      status: 207,
      errors: errors,
      successfulDetails: successDetails,
    };
  }
};

export const _UpdateCorte = async (updateCorte: any) => {
  try {
    await query(`CALL SP_UpdateCorte(?,?,?,?,?,?,?)`, [
      updateCorte.corte_id,
      updateCorte.taller_id || null,
      updateCorte.producto_id || null,
      updateCorte.cantidad || null,
      updateCorte.talla || null,
      updateCorte.metraje_asignado || null,
      updateCorte.tipo_tela || null,
    ]);

    return {
      message: "Corte actualizada con éxito.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar el corte.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCortes = async () => {
  try {
    const queryText = `SELECT * FROM cortes`;
    const result = await query(queryText);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los cortes.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCortesPorLote = async (lote_id: number) => {
  try {
    const queryText = `
    SELECT 
      cortes.estado, 
      cortes.corte_id, 
      usuario.nombre as taller,
      producto.nombre ,
      cortes.cantidad_enviada,
      cortes.cantidad_recibida,
      cortes.talla
    FROM cortes 
    inner JOIN usuario on cortes.taller_id = usuario.usuario_id INNER JOIN producto on producto.producto_id = cortes.producto_id where cortes.lote_id= ? and cortes.estado != 0
    `;
    const result = await query(queryText, [lote_id]);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los cortes.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getTallas = async () => {
  try {
    const queryText = `SELECT cortes.talla from cortes group by cortes.talla`;
    const result = await query(queryText);
    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener las tallas.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCorte = async (corte_id: number) => {
  try {
    const queryText = `SELECT * FROM cortes WHERE corte_id = ?`;
    const result = await query(queryText, [corte_id]);

    return {
      item: result.data,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el corte.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _desactivarCorte = async (corte_id: number) => {
  const queryText =
    "UPDATE cortes SET estado = 0 WHERE corte_id = ? AND estado != 0;";

  try {
    const result = await query(queryText, [corte_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El corte con ID ${corte_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró corte con ID ${corte_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar corte:", error);
    return {
      message: error.message || "Error desconocido al desactivar corte.",
      success: false,
      status: 500,
    };
  }
};

export const _activarCorte = async (corte_id: number) => {
  const queryText =
    "UPDATE cortes SET estado = true WHERE corte_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [corte_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El corte con ID ${corte_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró corte con ID ${corte_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar corte:", error);
    return {
      message: error.message || "Error desconocido al activar corte.",
      success: false,
      status: 500,
    };
  }
};

export const _sgteEstadoCortesPorLote = async (
  lote_id: number,
  detalles: { corte_id: number; cantidad_recibida: number; taller_id: number }[]
) => {
  try {
    const result = await query("SELECT * FROM cortes WHERE lote_id = ?", [
      lote_id,
    ]);
    const cortes = result.data;

    if (!cortes || cortes.length === 0) {
      return {
        message: "No se encontraron cortes asociados al lote",
        success: false,
        status: 404,
      };
    }

    const resultados = [];
    let cantidadTotal = 0;

    for (const detalle of detalles) {
      const corte = cortes.find((c: any) => c.corte_id === detalle.corte_id);

      if (!corte) {
        resultados.push({
          corte_id: detalle.corte_id,
          message: "Corte no encontrado en la base de datos",
          success: false,
          status: 404,
        });
        continue;
      }

      switch (corte.estado) {
        case 0:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Este corte está desactivado",
            success: false,
            status: 400,
          });
          break;

        case 1:
          if (detalle.taller_id === undefined || detalle.taller_id === null) {
            return {
              corte_id: detalle.corte_id,
              message: "Campo 'taller_id' obligatorio.",
              success: false,
              status: 400,
            };
          }
          console.log(detalle.taller_id);

          const updateCorte1 = await query(
            "UPDATE cortes SET estado = 2, taller_id = ? WHERE corte_id = ?",
            [detalle.taller_id, detalle.corte_id]
          );
          if (updateCorte1.affectedRows > 0) {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "El corte ha pasado al estado 2 (en proceso)",
              nuevoEstado: 2,
              success: true,
              status: 200,
            });
          } else {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "No se pudo actualizar el estado del corte a 2",
              success: false,
              status: 500,
            });
          }
          break;

        case 2:
          if (
            detalle.cantidad_recibida === undefined ||
            detalle.cantidad_recibida === null
          ) {
            return {
              corte_id: detalle.corte_id,
              message: "Campo 'cantidad_recibida' obligatorio.",
              success: false,
              status: 400,
            };
          }

          cantidadTotal += detalle.cantidad_recibida;

          const updateCorte2 = await query(
            "UPDATE cortes SET estado = 3, cantidad_recibida = ? WHERE corte_id = ?",
            [detalle.cantidad_recibida, detalle.corte_id]
          );

          const updateLote = await query(
            "UPDATE lotes SET estado = 2 WHERE lote_id = ?",
            [lote_id]
          );

          if (updateCorte2.affectedRows > 0 && updateLote.affectedRows > 0) {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "El corte ha pasado al estado 3 (finalizado)",
              nuevoEstado: 3,
              success: true,
              status: 200,
            });
          } else {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "No se pudo actualizar el estado del corte a 3 o lote",
              success: false,
              status: 500,
            });
          }
          break;

        case 3:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Este corte está finalizado",
            success: false,
            status: 400,
          });
          break;

        default:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Estado del corte no reconocido",
            success: false,
            status: 400,
          });
          break;
      }

      if (corte.estado == 2) {
        await query("UPDATE lotes SET cantidad_total = ? WHERE lote_id = ?", [
          cantidadTotal,
          lote_id,
        ]);
      }
    }

    return {
      message: "Proceso completado para todos los cortes del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    console.log(error);

    return {
      msg: "Error en _sgteEstadoCortesPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
