import { Request, Response } from "express";
import { Producto } from "../interface/producto";
import {
  _createProducto,
  _getProducto,
  _getProductoDetalle,
  _getProductos,
  _updateProducto,
} from "../service/producto";
import { handleHttp } from "../util/error.handler";

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, precio, descuento, detalles } = req.body;
  const producto: Producto = {
    nombre,
    precio,
    descuento,
    stockGeneral: 0,
  };

  try {
    const response = await _createProducto(producto, detalles);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createProducto", 500);
  }
};

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

export const updateProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  const { nombre, precio, descuento, detalles } = req.body;

  const updatedProducto: Producto = {
    nombre,
    precio,
    descuento,
    stockGeneral: 0,
  };

  try {
    const response = await _updateProducto(
      Number(producto_id),
      updatedProducto,
      detalles
    );
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateProducto", 500);
  }
};

export const getProductoDetalle = async (req: Request, res: Response) => {
  const tienda_id = req.query.tienda_id as string;

  try {
    const response = await _getProductoDetalle(tienda_id);
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getProductoDetalle", 500);
  }
};
