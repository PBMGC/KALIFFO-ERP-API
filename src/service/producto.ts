import { Producto as ProductoInterface } from "../interface/producto";
import { Producto } from "../models/producto";

export const _getProductos = async () => {
  const items = await Producto.findAll();

  try {
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getProductos",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _getProducto = async (producto_id: string) => {
  const item = await Producto.findOne({ where: { producto_id: producto_id } });

  try {
    return {
      item,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getProducto",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _createProducto = async (producto: ProductoInterface) => {
  try {
    await Producto.create(producto);

    return {
      msg: `Producto ${producto.nombre} creado`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "error _createProducto",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _deleteProducto = async (producto_id: string) => {
  try {
    if (!(await Producto.findOne({ where: { producto_id: producto_id } }))) {
      return {
        msg: `El cliente con id ${producto_id} no existe`,
        succes: false,
        status: 400,
      };
    }
    await Producto.destroy({ where: { producto_id: producto_id } });

    return {
      msg: `El cliente con id ${producto_id} a sido eliminado`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteProducto",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _updateProducto = async (producto: ProductoInterface) => {
  try {
    if (
      !(await Producto.findOne({
        where: { producto_id: producto.producto_id },
      }))
    ) {
      return {
        msg: `El producto con id => ${producto.producto_id} no existe`,
        succes: false,
        status: 400,
      };
    }

    await Producto.update(producto, {
      where: { producto_id: producto.producto_id },
    });

    return {
      msg: `El producto ${producto.producto_id} ha sido actualizado con exito`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateProducto",
      error,
      succes: false,
      status: 400,
    };
  }
};
