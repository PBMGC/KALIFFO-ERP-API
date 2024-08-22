import { Request, Response } from "express";
import { _createPuesto, _getPuestos } from "../service/puesto";

export const createPuesto = async (req: Request, res: Response) => {
  const { puesto } = req.body;

  try {
    const response = await _createPuesto({ puesto });
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPuestos = async (req: Request, res: Response) => {
  try {
    const response = await _getPuestos();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
