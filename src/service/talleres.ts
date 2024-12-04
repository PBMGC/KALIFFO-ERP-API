import { query } from "../util/query";
import { _createProductoCompleto } from "./producto";

export const _createAcabado = async (acabado: any) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad_recibida,
    fecha_inicio,
    fecha_final,
  } = acabado;

  const queryText = `
    INSERT INTO taller_acabados (lote_id, color_id, talla, cantidad_recibida, fecha_inicio, fecha_final)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const result = await query(queryText, [
      lote_id,
      color_id,
      talla,
      cantidad_recibida,
      fecha_inicio,
      fecha_final,
    ]);

    return {
      message: "Acabado creado con éxito.",
      success: true,
      status: 201,
    };
  } catch (error: any) {
    return {
      message: "Error al crear el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// export const _updateAcabado = async (updateAcabado: any) => {
//   try {
//     const queryText = `CALL SP_UpdateAcabado(?,?,?,?,?,?,?,?)`;

//     await query(queryText, [
//       updateAcabado.acabado_id,
//       updateAcabado.lote_id || null,
//       updateAcabado.color_id || null,
//       updateAcabado.talla || null,
//       updateAcabado.cantidad_recibida || null,
//       updateAcabado.cantidad_enviada || null,
//       updateAcabado.fecha_inicio || null,
//       updateAcabado.fecha_final || null,
//     ]);

//     return {
//       message: "Acabado actualizado con éxito.",
//       success: true,
//       status: 200,
//     };
//   } catch (error: any) {
//     return {
//       message: "Error al actualizar el acabado.",
//       success: false,
//       error: error.message || error,
//       status: 500,
//     };
//   }
// };

export const _getAcabados = async () => {
  try {
    const queryText = `SELECT * FROM taller_acabados where estado != 0`;
    const result = await query(queryText);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los acabados.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getAcabado = async (acabado_id: number) => {
  try {
    const queryText = `SELECT * FROM taller_acabados WHERE acabado_id = ? and estado != 0`;
    const result = await query(queryText, [acabado_id]);

    if (result.data && result.data.length === 0) {
      return {
        message: "Acabado no encontrado.",
        success: false,
        status: 404,
      };
    }

    return {
      item: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getAcabadoLote = async (lote_id: string) => {
  try {
    const result = await query(
      "select ta.acabado_id,co.codigo,ta.talla,ta.cantidad_enviada,ta.cantidad_recibida,ta.estado,ta.fecha_inicio,ta.fecha_final from taller_acabados ta INNER JOIN color co on ta.color_id=co.color_id where lote_id = ?",
      [lote_id]
    );

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _activarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabados SET estado = 1 WHERE acabado_id = ? AND estado != 1";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido activado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba activado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al activar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _desactivarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabados SET estado = 0 WHERE acabado_id = ? AND estado != 0";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido desactivado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba desactivado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al desactivar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _sgteEstadoAcabadosPorLote = async (
  lote_id: string,
  tienda_id:string,
  almacen_id:string,
  detalles: { acabado_id: number; cantidad_recibida: number }[]
) => {
  try {
    const result = await query(
      "SELECT * FROM taller_acabados WHERE lote_id = ?",
      [lote_id]
    );
    const acabados = result.data;

    if (!acabados || acabados.length === 0) {
      return {
        message: "No se encontraron acabados asociados al lote",
        success: false,
        status: 404,
      };
    }

    const resultados = [];
    let cantidadTotal = 0;

    for (const detalle of detalles) {
      const acabado = acabados.find(
        (a: any) => a.acabado_id === detalle.acabado_id
      );

      if (!acabado) {
        resultados.push({
          acabado_id: detalle.acabado_id,
          message: "Acabado no encontrado en la base de datos",
          success: false,
          status: 404,
        });
        continue;
      }

      switch (acabado.estado) {
        case 0:
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Este acabado está desactivado",
            success: false,
            status: 400,
          });
          break;

        case 1:
          const updateAcabado1 = await query(
            "UPDATE taller_acabados SET estado = 2 WHERE acabado_id = ?",
            [detalle.acabado_id]
          );
          if (updateAcabado1.affectedRows > 0) {
            resultados.push({
              acabado_id: detalle.acabado_id,
              message: "El acabado ha pasado al estado 2 (en proceso)",
              nuevoEstado: 2,
              success: true,
              status: 200,
            });
          } else {
            resultados.push({
              acabado_id: detalle.acabado_id,
              message: "No se pudo actualizar el estado del acabado a 2",
              success: false,
              status: 500,
            });
          }
          break;

        //pasar al almacen
        case 2:
          if (!detalle.cantidad_recibida) {
            resultados.push({
              acabado_id: detalle.acabado_id,
              message: "Campo 'cantidad_recibida' obligatorio.",
              success: false,
              status: 400,
            });
            break;
          }

          if (detalle.cantidad_recibida > acabado.cantidad_enviada) {
            resultados.push({
              lavanderia_id: detalle.acabado_id,
              message: "La cantidad recibida es mayor a la cantidad enviada",
              success: false,
              status: 400,
            });
            break;
          }

          cantidadTotal += detalle.cantidad_recibida;
          const now = new Date();
          const fecha = now.toLocaleDateString("en-CA");

          const updateAcabado2 = await query(
            "UPDATE taller_acabados SET estado = 3, cantidad_recibida = ?, fecha_final = ? WHERE acabado_id = ?",
            [detalle.cantidad_recibida, now, detalle.acabado_id]
          );

          const updateLote = await query(
            "UPDATE lotes SET estado = 4 WHERE lote_id = ?",
            [lote_id]
          );

          if (updateAcabado2.affectedRows > 0 && updateLote.affectedRows > 0) {
            const datos = await query(
              `
              SELECT 
                    c.producto_id,
                    ta.color_id,
                    ta.cantidad_recibida as stock,
                    ta.talla
                FROM 
                    taller_acabados ta
                INNER JOIN 
                    lavanderia l ON ta.lavanderia_id = l.lavanderia_id
                INNER JOIN 
                    cortes c ON l.corte_id = c.corte_id
                WHERE 
                    ta.lote_id = ?
              `,
              [lote_id]
            );

            const productosFinales = datos.data.reduce((acc:any,producto:any)=>{
              const {producto_id,...detalle} = producto;
              const existe = acc.find(
                (item:any)=> item.producto_id===producto_id
              );
              if(existe){
                existe.detalle.push(detalle);
              }else{
                acc.push({producto_id,detalle:[detalle]})
              }
              return acc;
            },[])

            try {
              const response = await _createProductoCompleto(
                tienda_id,
                almacen_id,
                productosFinales.producto_id,
                productosFinales,
                lote_id,
              )
            } catch (error) {
              console.log(error)
            }

            // resultados.push({
            //   acabado_id: detalle.acabado_id,
            //   message: "El acabado ha pasado al estado 3 (finalizado)",
            //   nuevoEstado: 3,
            //   success: true,
            //   status: 200,
            // });
          } else {
            resultados.push({
              acabado_id: detalle.acabado_id,
              message:
                "No se pudo actualizar el estado del acabado a 3 o del lote",
              success: false,
              status: 500,
            });
          }
          break;

        case 3:
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Este acabado está finalizado",
            success: false,
            status: 400,
          });
          break;

        default:
          resultados.push({
            acabado_id: detalle.acabado_id,
            message: "Estado del acabado no reconocido",
            success: false,
            status: 400,
          });
          break;
      }
    }

    await query("UPDATE lotes SET cantidad_total = ? WHERE lote_id = ?", [
      cantidadTotal,
      lote_id,
    ]);

    return {
      message: "Proceso completado para todos los acabados del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      msg: "Error en _sgteEstadoAcabadosPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
