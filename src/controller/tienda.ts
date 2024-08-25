import { Request, Response } from "express";
import { _createTienda, _getTiendas } from "../service/tienda";
import { Tienda } from "../interface/tienda";

export const createTienda = async (req: Request, res: Response) => {
  const { tienda, direccion, telefono } = req.body;

  const newTienda: Tienda = {
    tienda,
    direccion,
    telefono,
  };

  try {
    const response = await _createTienda(newTienda);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getTiendas = async (req: Request, res: Response) => {
  try {
    const response = await _getTiendas();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
