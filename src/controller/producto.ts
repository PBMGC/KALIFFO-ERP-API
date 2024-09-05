import { Request, Response } from "express";
import { Producto } from "../interface/producto";
import { _createProducto } from "../service/producto";

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
