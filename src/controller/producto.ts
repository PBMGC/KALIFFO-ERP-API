import { Request, response, Response } from "express";
// import { Producto } from "../interface/producto";
import {
  _createProducto,
  _deleteProducto,
  _getColoresProducto,
  _getDetalleProducto,
  _getProducto,
  _getProductos,
  _getProductosTienda,
  _getTallaProducto,
  _loseProductos,
  _updateProducto,
} from "../service/producto";
import { handleHttp } from "../util/error.handler";

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, stockTotal, precioBase, descuento } = req.body;

  try {
    const response = await _createProducto({
      nombre,
      stockTotal,
      precioBase,
      descuento,
    });
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createProducto", 500);
  }
};

// export const createProductoDetalle = async (req: Request, res: Response) => {
//   const producto_data  = req.body;
//   const tienda_id = req.query.tienda_id

//   try {
//    for(const producto of producto_data){
//     const response = await _createProductoDetalle(Number(tienda_id),producto);
//    }
//     res.status(200).json(response);
//   } catch (error) {
//     handleHttp(res, "error_createProductoDetalle", 500);
//   }
// };

export const getProductos = async (req: Request, res: Response) => {
  try {
    const response = await _getProductos();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getProductos", 500);
  }
};

export const getProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _getProducto(Number(producto_id));
    res.status(response.status).json(response.item);
  } catch (error) {
    handleHttp(res, "error_getProducto", 500);
  }
};

export const getProductosTienda = async (req: Request, res: Response) => {
  const { tienda_id } = req.params;

  try {
    const response = await _getProductosTienda(Number(tienda_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getProducto", 500);
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  const { nombre, stockTotal, precioBase, descuento } = req.body;

  try {
    const response = await _updateProducto({
      producto_id,
      nombre,
      stockTotal,
      precioBase,
      descuento,
    });
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateProducto", 500);
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  const id_tienda = req.query.id_tienda

  try {
    const response = await _deleteProducto(Number(producto_id),Number(id_tienda));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_deleteProducto", 500);
  }
};

export const loseProducto = async (req: Request, res: Response) => {
  const { tienda_id } = req.params;

  try {
    const response = await _loseProductos(tienda_id);
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_updateProducto", 500);
  }
};

export const getColoresProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _getColoresProducto(Number(producto_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error ", 500);
  }
};

export const getDetalleProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  const id_tienda = req.query.id_tienda
  
  try {
    const response = await _getDetalleProducto(Number(producto_id),Number(id_tienda));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error ", 500);
  }
};

export const getTallaProducto = async (req: Request, res: Response) => {
  const { detalle_id } = req.params;

  try {
    const response = await _getTallaProducto(Number(detalle_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error ", 500);
  }
};
