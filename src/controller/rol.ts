import { Request, Response } from "express";
import { _createRol, _getRoles } from "../service/rol";

export const createRol = async (req: Request, res: Response) => {
  const { rol } = req.body;

  try {
    const response = await _createRol({ rol });
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await _getRoles();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};
