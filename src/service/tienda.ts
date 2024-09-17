import { Model } from "sequelize";
import sequelize from "../db/connection";
import { Tienda as TiendaInterface } from "../interface/tienda";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Tienda } from "../models/tienda";
import { Producto } from "../models/producto";
import { Usuario } from "../models/usuario";

export const _createTienda = async (tienda: TiendaInterface) => {
  try {
    const newTienda = await Tienda.create(tienda);

    return {
      message: newTienda,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "error _createTienda",
      success: false,
      status: 500,
    };
  }
};

export const _getTiendas = async () => {
  try {
    const stockPorTienda = await ProductoTienda.findAll({
      attributes: [
        "tienda_id",
        [sequelize.fn("SUM", sequelize.col("stock")), "stock"],
      ],
      include: { model: Tienda },
      group: ["tienda_id"],
    });

    return {
      items: stockPorTienda,
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
    const item = await Tienda.findOne({ where: { tienda_id } });

    const productos = await ProductoTienda.findAll({
      where: { tienda_id },
      include: [
        {
          model: ProductoDetalle,
          attributes: [],
          include: [
            {
              model: Producto,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "tienda_id",
        "productoDetalle.producto.producto_id",
        "productoDetalle.producto.nombre",
        "productoDetalle.producto.precio",
        "productoDetalle.producto.descuento",
      ],
      group: "producto_id",
      raw: true,
    });

    const usuarios = await Usuario.findAll({
      where: { tienda_id },
      attributes: { exclude: ["contraseña", "createdAt", "updatedAt"] },
    });
    if (!item) {
      return {
        msg: "Tienda no encontrada",
        success: false,
        status: 404,
      };
    }

    return {
      item: { ...item.dataValues, productos, usuarios },
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
