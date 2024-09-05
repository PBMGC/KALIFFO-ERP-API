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
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "_createProducto",
      succes: true,
      status: 200,
    };
  }
};
