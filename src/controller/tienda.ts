import { Request, Response } from "express";
import { _createTienda, _getTiendas } from "../service/tienda";

export const createTienda = async (req: Request, res: Response) => {
  const { tienda } = req.body;

  try {
    const response = await _createTienda({ tienda });
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
