import { Request, Response } from "express";
import { _createColor, _getColores } from "../service/color";
import { Color } from "../interface/color";

export const createColor = async (req: Request, res: Response) => {
  const { nombre, codigo } = req.body;

  const color: Color = {
    nombre,
    codigo,
  };

  try {
    const response = await _createColor(color);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getColores = async (req: Request, res: Response) => {
  try {
    const response = await _getColores();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
