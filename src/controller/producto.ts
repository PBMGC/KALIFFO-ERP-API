import { Request, Response } from "express";
import { Producto } from "../interface/producto";
import {
  _createProducto,
  _getProducto,
  _getProductos,
  _updateProducto,
} from "../service/producto";

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, precio, descuento, detalles } = req.body;
  const newProducto: Producto = {
    nombre,
    precio,
    descuento,
    stockGeneral: 0,
  };

  try {
    const response = await _createProducto(newProducto, detalles);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProductos = async (req: Request, res: Response) => {
  const nombre = req.query.nombre as string;
  const talla = req.query.talla as string;
  const color = req.query.color as string;

  console.log(nombre);
  console.log(color);
  console.log(talla);

  try {
    const response = await _getProductos(nombre, talla, color);
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProducto = async (req: Request, res: Response) => {
  const { producto_id } = req.params;

  try {
    const response = await _getProducto(Number(producto_id));
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
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
    res.status(400).json(error);
  }
};
