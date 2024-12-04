import { title } from "process";
import { query } from "../util/query";

export const _createTienda = async (tienda: any) => {
  const consulta = `
    INSERT INTO tienda (tienda, direccion, telefono)
    VALUES (?, ?, ?)
  `;

  try {
    const result = await query(consulta, [
      tienda.tienda,
      tienda.direccion,
      tienda.telefono,
    ]);

    return {
      message: "Tienda creada exitosamente.",
      data: result,
      success: true,
      status: 201,
    };
  } catch (error) {
    console.error("Error al crear la tienda:", error);
    return {
      message: "Error al crear la tienda. Intente nuevamente más tarde.",
      success: false,
      status: 500,
    };
  }
};

export const _getTiendas = async () => {
  try {
    const response = (await query(`CALL SP_GetTiendas()`)) as any;

    const tiendasData = response.data[0].map((tienda: any) => {
      return {
        ...tienda,
      };
    });

    return {
      items: tiendasData,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getTiendas",
      success: false,
      status: 500,
    };
  }
};

export const _getTienda = async (tienda_id: number) => {
  try {
    const response = (await query(`CALL SP_GetTienda(?)`, [tienda_id])) as any;

    const tiendaData = response.data[0].map((tienda: any) => {
      return {
        ...tienda,
      };
    });

    return {
      items: tiendaData[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "error _getTienda",
      success: false,
      status: 500,
    };
  }
};

export const _desactivarTienda = async (tienda_id: number) => {
  const queryText =
    "UPDATE tienda SET estado = false WHERE tienda_id = ? AND estado != false;";

  try {
    const result = await query(queryText, [tienda_id]);
    console.log(result);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _activarTienda = async (tienda_id: number) => {
  const queryText =
    "UPDATE tienda SET estado = true WHERE tienda_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [tienda_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _updateTienda = async (tienda_id: number, tienda: any) => {
  const queryText =
    "UPDATE tienda SET tienda = ?, direccion = ?, telefono = ? WHERE tienda_id = ?";

  const { nombre, direccion, telefono } = tienda;

  try {
    const result = await query(queryText, [
      nombre,
      direccion,
      telefono,
      tienda_id,
    ]);
    if (result.success && result.affectedRows > 0) {
      return {
        message: `La tienda con ID ${tienda_id} ha sido actualizada`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró una tienda con ID ${tienda_id}`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al actualizar la tienda:", error);
    return {
      message: error.message || "Error desconocido al desactivar la tienda.",
      success: false,
      status: 500,
    };
  }
};

export const _generarReporte = async (res: any, tienda_id: number) => {
  try {
    const PDFDocument = require("pdfkit-table");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');

    const dataTienda: any = await query(
      `CALL SP_GetReporteTienda(${tienda_id})`
    );

    const trabajadoresData = dataTienda.data[0][0].usuarios_info!=null?
    dataTienda.data[0][0].usuarios_info.split("), (")
      .map((item: string) => {
        const [
          usuario_id,
          nombre,
          apellido_p,
          apellido_m,
          telefono,
          dni,
          sueldo,
        ] = item.replace(/\(|\)/g, "").trim().split(",");
        return {
          usuario_id: usuario_id,
          nombre: nombre,
          apellido_p: apellido_p,
          apellido_m: apellido_m,
          telefono: telefono,
          dni:dni,
          sueldo: sueldo,
        };
      }):[];

    const productosData = dataTienda.data[0][0].productos_info!=null?
    dataTienda.data[0][0].productos_info.split("),(")
      .map((item: string) => {
        const [nombre_producto, color, lote, stock, talla, cantidad] = item
          .replace(/\(|\)/g, "")
          .trim()
          .split(",");
        return {
          nombre_producto: nombre_producto,
          color: color,
          lote: lote,
          stock: stock,
          talla: talla,
          cantidad: cantidad,
        };
      })
      .reduce((acc: any, producto: any) => {
        const { nombre_producto, ...detalle } = producto;
        const existente = acc.find(
          (item: any) => item.nombre_producto === nombre_producto
        );
        if (existente) {
          existente.detalle.push(detalle);
        } else {
          acc.push({ nombre_producto, detalle: [detalle] });
        }
        return acc;
      }, []):[];

    const doc = new PDFDocument({
      bufferPages: true,
      title: "Reporte Tienda",
      permissions: {
        printing: "highResolution",
      },
      size: "A4",
      layout: "portrait",
    });

    doc.pipe(res);

    // Cabecera del PDF
    doc.image("src/Img/logo.png", 60, 10, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });

    doc.fontSize(20).text("KALIFFO SAC", 250, 50);
    doc.font("Helvetica-Bold").fontSize(18).text("REPORTE DE TIENDA", 230, 75);

    // Tabla de datos de la tienda
    const tablaDatosTienda = {
      title: `Datos de ${dataTienda.data[0][0].tienda}`,
      headers: [
        {
          label: "Nombre",
          property: "tienda",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Direccion",
          property: "direccion",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Telefono",
          property: "telefono",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Stock Total",
          property: "total_stock",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Trabajadores Totales",
          property: "usuarios",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas: [
        {
          tienda: dataTienda.data[0][0].tienda,
          direccion: dataTienda.data[0][0].direccion,
          telefono: dataTienda.data[0][0].telefono,
          total_stock: dataTienda.data[0][0].total_stock?dataTienda.data[0][0].total_stock:null,
          usuarios: dataTienda.data[0][0].usuarios?dataTienda.data[0][0].usuarios:null,
        },
      ],
    };

    const tablaDatosTrabajadores={
      title:"TRABAJADORES",
      headers:[
        {
          label: "Nombre",
          property: "nombre_completo",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Telefono",
          property: "telefono",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "DNI",
          property: "dni",
          headerAlign: "center",
          align: "center",
        },
        {
          label: "Sueldo",
          property: "sueldo",
          headerAlign: "center",
          align: "center",
        },
      ],
      datas:trabajadoresData.map((trabajador:any)=>{
        return{
          nombre_completo:trabajador.nombre+" "+trabajador.apellido_p+" "+trabajador.apellido_m,
          telefono:trabajador.telefono,
          dni:trabajador.dni,
          sueldo:trabajador.sueldo
        }
      })
    }

    // Función para agregar nuevas tablas
    const nuevaTabla = async (tablaData: any, posY: number) => {
      const tablaAltura = await doc.table(tablaData, {
        width: 500,
        x: 55,
        y: posY,
        prepareRow: (
          row: string[],
          indexColumn: number,
          indexRow: number,
          rectRow: { x: number; y: number; width: number; height: number },
          rectCell: { x: number; y: number; width: number; height: number }
        ) => {
          const { x, y, width, height } = rectCell;
          if (indexColumn === 0) {
            doc
              .lineWidth(0.5)
              .moveTo(x, y)
              .lineTo(x, y + height)
              .stroke();
          }
          doc
            .lineWidth(0.5)
            .moveTo(x + width, y)
            .lineTo(x + width, y + height)
            .stroke();
        },
      });

      const nuevaY = posY + tablaAltura 

      if (tablaAltura + posY > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
      }

      return posY + tablaAltura;
    };

    let posY = 120;

    // Agregar la tabla de datos de la tienda
    posY = await nuevaTabla(tablaDatosTienda, posY);

    posY= await nuevaTabla(tablaDatosTrabajadores,posY)

    // Agregar tablas para productos
    for (const producto of productosData) {
      const tablaDatosProducto = {
        title: `${producto.nombre_producto}`,
        headers: [
          {
            label: "Color",
            property: "color",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "Lote",
            property: "lote",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "Stock",
            property: "stock",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "Talla",
            property: "talla",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "Cantidad",
            property: "cantidad",
            headerAlign: "center",
            align: "center",
          },
        ],
        datas: producto.detalle.map((detalle: any) => ({
          color: detalle.color,
          lote: detalle.lote,
          stock: detalle.stock,
          talla: detalle.talla,
          cantidad: detalle.cantidad,
        })),
      };

      posY = await nuevaTabla(tablaDatosProducto, posY);
    }

    doc.end();
  } catch (error) {
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};
