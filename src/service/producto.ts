import { Producto as ProductoInterface } from "../interface/producto";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Color } from "../models/color";
import sequelize from "../db/connection";

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

export const _getProductos = async () => {
  try {
    const items = await Producto.findAll();
    return {
      items,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getProductos",
      success: false,
      status: 500,
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

export const _getProductoDetalle = async (tienda_id: string) => {
  try {
    const items = await ProductoTienda.findAll({
      attributes: [
        // [sequelize.fn("sum", sequelize.col("stock")), "total_stock"],
        "productoDetalle.producto.producto_id",
        "productoDetalle.producto.precio",
        "productoDetalle.producto.descuento",
        "productoDetalle.producto.nombre",
        [
          sequelize.fn("GROUP_CONCAT", sequelize.col("productoDetalle.talla")),
          "tallas",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.col("productoDetalle.color_id")
          ),
          "colores",
        ],
        [sequelize.fn("SUM", sequelize.col("stock")), "total_stock"],
      ],
      where: { tienda_id: tienda_id },
      include: [
        {
          model: ProductoDetalle,
          attributes: [],
          include: [{ model: Producto, attributes: [] }],
        },
      ],
      group: ["productoDetalle.producto_id"],

      raw: true,
    });
    return {
      items,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "error _getProductoDetalle",
      success: false,
      status: 500,
    };
  }
};
