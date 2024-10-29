import { Request, response, Response } from "express";
// import { Producto } from "../interface/producto";
import {
  _activarProducto,
  _createProducto,
  _createProductoCompleto,
  _desactivarProducto,
  _getColoresProducto,
  _getDetalleProducto,
  _getProducto,
  _getProductos,
  _getProductosTienda,
  _getTallaProducto,
  _imprimirCodigo,
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

export const createProductoCompleto = async (req: Request, res: Response) => {
  const tienda_id = req.query.tienda_id as string;
  const { producto_id, detalles } = req.body;

  try {
    const response = await _createProductoCompleto(
      Number(tienda_id),
      producto_id,
      detalles
    );
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createProductoCompleto", 500);
  }
};

export const getProductos = async (req: Request, res: Response) => {
  const tienda_id = req.query.tienda_id;
  const loose_id = req.query.loose_id;
  try {
    console.log(tienda_id)
    let response;

    if (tienda_id) {
      response = await _getProductosTienda(Number(tienda_id));
      console.log(tienda_id);
    } else if (loose_id) {
      response = await _loseProductos(Number(loose_id));
      console.log(loose_id);
    } else {
      response = await _getProductos();
      console.log("NO HAY PARAM");
    }

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

export const updateProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  const { nombre, precioBase, descuento } = req.body;

  try {
    const response = await _updateProducto({
      producto_id,
      nombre,
      precioBase,
      descuento,
    });
    res.status(response.status).json(response);
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
  const tienda_id = req.query.tienda_id;
  const tipo = req.query.tipo as string;

  try {
    const response = await _getDetalleProducto(
      Number(producto_id),
      Number(tienda_id),
      tipo
    );
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

export const desactivarProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _desactivarProducto(Number(producto_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarProducto", 500);
  }
};

export const activarProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _activarProducto(Number(producto_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarProducto", 500);
  }
};

export const Imprimir = async (req: Request, res: Response) => {
  try {
    const response = await _imprimirCodigo();
    res.status(200).json("hola")
  } catch (error) {
    console.log(error)
    handleHttp(res, "error_desactivarProducto", 500);
  }
};
