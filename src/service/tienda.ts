// import { Model } from "sequelize";
// import sequelize from "../db/connection";
// import { Tienda as TiendaInterface } from "../interface/tienda";
// import { ProductoDetalle } from "../models/productoDetalle";
// import { ProductoTienda } from "../models/productoTienda";
// import { Tienda } from "../models/tienda";
// import { Producto } from "../models/producto";
// import { Usuario } from "../models/usuario";

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

// export const _getTiendas = async () => {
//   try {
//     const stockPorTienda = await ProductoTienda.findAll({
//       attributes: [
//         "tienda_id",
//         [sequelize.fn("SUM", sequelize.col("stock")), "stock"],
//       ],
//       include: { model: Tienda },
//       group: ["tienda_id"],
//     });

//     return {
//       items: stockPorTienda,
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     return {
//       message: "error _getTiendas",
//       success: false,
//       status: 500,
//     };
//   }
// };

// export const _getTienda = async (tienda_id: number) => {
//   try {
//     const item = await Tienda.findOne({ where: { tienda_id } });
//     const nroUsuarios = await Usuario.count({ where: { tienda_id } });
//     const stockTotal = await ProductoTienda.sum("stock", {
//       where: { tienda_id },
//     });

//     return {
//       item: { ...item?.dataValues, nroUsuarios, stockTotal },
//       success: true,
//       status: 200,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       msg: "error _getTienda",
//       success: false,
//       status: 500,
//     };
//   }
// };
