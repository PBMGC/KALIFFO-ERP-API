import { Request, Response } from "express";
import { _createColor, _getColores } from "../service/color";
import { handleHttp } from "../util/error.handler";
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
    handleHttp(res, "error_createColor", 500);
  }
};

export const getColores = async (req: Request, res: Response) => {
  try {
    const response = await _getColores();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getColores", 500);
  }
};
