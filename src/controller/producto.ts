import { Request, Response } from "express";
import {
  _createProducto,
  _deleteProducto,
  _getProducto,
  _getProductos,
  _updateProducto,
} from "../service/producto";
import { Producto } from "../interface/producto";

export const getProductos = async (req: Request, res: Response) => {
  try {
    const response = await _getProductos();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;
  try {
    const response = await _getProducto(producto_id);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, precio, descuento, stockGeneral } = req.body;

  const producto: Producto = {
    nombre,
    precio,
    descuento,
    stockGeneral,
  };

  try {
    const response = await _createProducto(producto);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _deleteProducto(producto_id);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { producto_id, nombre, precio, descuento, stockGeneral } = req.body;

  const producto: Producto = {
    producto_id,
    nombre,
    precio,
    descuento,
    stockGeneral,
  };

  try {
    const response = await _updateProducto(producto);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
