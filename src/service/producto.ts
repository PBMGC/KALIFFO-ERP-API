import { Model } from "sequelize";
import { Producto as ProductoInterface } from "../interface/producto";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Color } from "../models/color";

export const _createProducto = async (
  producto: ProductoInterface,
  detalles: any
) => {
  try {
    console.log("Detalles => ", detalles);

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
      nsg: newProducto,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "_createProducto",
      success: false,
      status: 400,
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
    console.log(error);

    return {
      msg: "_getProductos",
      success: true,
      status: 200,
    };
  }
};

export const _getProducto = async (producto_id: number) => {
  try {
    const item = await Producto.findOne({
      where: { producto_id: producto_id },
    });

    // const detalles = await ProductoDetalle.findAll({
    //   where: { producto_id: producto_id },
    // });

    const detalles = await ProductoTienda.findAll({
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
    });

    return {
      item: { ...item?.dataValues, detalles },
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "_getProducto",
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
        msg: "Producto no encontrado",
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
        console.log(updatedProducto.stockGeneral);
      }
    }

    await producto.update(updatedProducto);
    console.log(producto);

    return {
      msg: producto,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "_updateProducto",
      success: false,
      status: 500,
    };
  }
};
