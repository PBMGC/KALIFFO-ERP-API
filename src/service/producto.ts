import { Producto as ProductoInterface } from "../interface/producto";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Color } from "../models/color";
import sequelize from "../db/connection";
import { Op, where } from "sequelize";
import { Tienda } from "../models/tienda";

export const _createProducto = async (
  producto: ProductoInterface,
  detalles: any
) => {
  try {
    const newProducto = await Producto.create(producto);

    for (const detalle of detalles) {
      const newDetalle = await ProductoDetalle.create({
        codigo: detalle.codigo,
        talla: detalle.talla,
        color_id: detalle.color_id,
        producto_id: newProducto.producto_id || 0,
      });

      for (const tienda of detalle.tiendas) {
        await ProductoTienda.create({
          stock: tienda.stock,
          productoDetalle_id: newDetalle.productoDetalle_id || 0,
          tienda_id: tienda.tienda_id,
        });
        newProducto.stockGeneral += Number(tienda.stock);
      }
    }
    await newProducto.save();

    return {
      message: newProducto,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "error _createProducto",
      success: false,
      status: 500,
    };
  }
};

export const _getProductos = async (
  offset?: number,
  limit?: number,
  nombre?: string,
  color?: string,
  talla?: string,
  tienda_id?: number
) => {
  try {
    const filtrosProducto: any = {};
    const filtrosProductoDetalle: any = {};
    const filtrosColores: any = {};

    if (nombre) {
      filtrosProducto.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (color) {
      filtrosColores.nombre = color;
    }

    if (talla) {
      filtrosProductoDetalle.talla = talla;
    }

    const filtros: any = {
      attributes: [
        "productoDetalle.producto.producto_id",
        "productoDetalle.producto.nombre",
        "productoDetalle.producto.precio",
        "productoDetalle.producto.descuento",
        [sequelize.fn("SUM", sequelize.col("stock")), "stock"],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("productoDetalle.talla"))
          ),
          "tallas",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn(
              "DISTINCT",
              sequelize.col("productoDetalle.color.nombre")
            )
          ),
          "colores",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("productoDetalle.codigo"))
          ),
          "codigos",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("tienda.tienda"))
          ),
          "tiendas",
        ],
      ],
      include: [
        {
          model: ProductoDetalle,
          attributes: [],
          where: filtrosProductoDetalle,
          include: [
            {
              model: Producto,
              where: filtrosProducto,
              required: true,
              attributes: [],
            },
            { model: Color, where: filtrosColores, attributes: [] },
          ],
          required: true,
        },
        { model: Tienda, attributes: [] },
      ],
      where: {},
      group: "productoDetalle.producto_id",
      offset: offset || 0,
      limit: limit ? limit - (offset || 0) : undefined,
      raw: true,
    };

    if (tienda_id) {
      filtros.where.tienda_id = tienda_id;
    }

    const items = await ProductoTienda.findAll(filtros);

    return {
      items: items.map((item: any) => ({
        ...item,
        tallas: item.tallas ? item.tallas.split(",") : [],
        colores: item.colores ? item.colores.split(",") : [],
        codigos: item.codigos ? item.codigos.split(",") : [],
        tiendas: item.tiendas ? item.tiendas.split(",") : [],
      })),
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "_getProductos",
      success: true,
      status: 200,
    };
  }
};

export const _getProducto = async (producto_id: number, tienda_id?: string) => {
  try {
    const filtros: any = {
      where: {},
      include: [
        {
          model: ProductoDetalle,
          where: { producto_id: producto_id },
          include: [
            {
              model: Color,
            },
          ],
        },
      ],
    };

    if (tienda_id) {
      filtros.where.tienda_id = tienda_id;
    }

    const item = await Producto.findOne({
      where: { producto_id: producto_id },
    });

    if (!item) {
      return {
        message: `No se encotro producto con id => ${producto_id}`,
        success: false,
        status: 404,
      };
    }

    const detalles = await ProductoTienda.findAll(filtros);

    return {
      item: { ...item?.dataValues, detalles },
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "_getProducto",
      success: true,
      status: 200,
    };
  }
};

export const _updateProducto = async (
  producto_id: number,
  updatedProducto: ProductoInterface,
  detalles: any
) => {
  try {
    const producto = await Producto.findByPk(producto_id);

    if (!producto) {
      return {
        message: `No se encotro producto con id => ${producto_id}`,
        success: false,
        status: 404,
      };
    }

    updatedProducto.stockGeneral = 0;

    for (let detalle of detalles) {
      let newDetalle;

      if (!detalle.productoDetalle_id) {
        newDetalle = await ProductoDetalle.create({
          codigo: detalle.codigo,
          talla: detalle.talla,
          color_id: detalle.color_id,
          producto_id: producto_id,
        });
      } else {
        newDetalle = await ProductoDetalle.findByPk(detalle.productoDetalle_id);

        if (newDetalle) {
          await newDetalle.update({
            codigo: detalle.codigo,
            talla: detalle.talla,
            color_id: detalle.color_id,
          });
        }
      }

      for (const tienda of detalle.tiendas) {
        let productoTienda = await ProductoTienda.findOne({
          where: {
            productoDetalle_id: newDetalle?.productoDetalle_id,
            tienda_id: tienda.tienda_id,
          },
        });

        if (productoTienda) {
          await productoTienda.update({
            stock: tienda.stock,
          });
        } else {
          await ProductoTienda.create({
            stock: tienda.stock,
            productoDetalle_id: newDetalle?.productoDetalle_id || 0,
            tienda_id: tienda.tienda_id,
          });
        }

        updatedProducto.stockGeneral += Number(tienda.stock);
      }
    }

    await producto.update(updatedProducto);

    return {
      message: producto,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _updateProducto",
      success: false,
      status: 500,
    };
  }
};
