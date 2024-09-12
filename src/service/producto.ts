import { Producto as ProductoInterface } from "../interface/producto";
import { ProductoDetalle as ProductoDetalleInterface } from "../interface/productoDetalle";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";

export const _createProducto = async (
  producto: ProductoInterface,
  detalles: ProductoDetalleInterface[]
) => {
  try {
    const newProducto = await Producto.create(producto);

    for (const detalle of detalles) {
      detalle.producto_id = newProducto.producto_id || 0;
      await ProductoDetalle.create(detalle);
      newProducto.stockGeneral += detalle.stock;
    }

    await newProducto.save();

    return {
      msg: "producto creado",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_createProducto",
      success: true,
      status: 200,
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

    const detalles = await ProductoDetalle.findAll({
      where: { producto_id: producto_id },
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
  detalles: ProductoDetalleInterface[]
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

    for (let detalle of detalles) {
      if (detalle.productoDetalle_id == null) {
        delete detalle.productoDetalle_id;
        await ProductoDetalle.create({ ...detalle, producto_id: producto_id });
      } else {
        await ProductoDetalle.update(detalle, {
          where: { productoDetalle_id: detalle.productoDetalle_id },
        });
      }
      updatedProducto.stockGeneral += detalle.stock;
    }

    await producto.update(updatedProducto);

    return {
      msg: "Producto actualizado",
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
