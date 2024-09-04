import { Request, Response } from "express";
import { Incidencia } from "../interface/incidencia";
import { _createIncidencia } from "../service/incidencia";

export const createIncidencia = async (req: Request, res: Response) => {
  const { usuario_id, tipo, descripcion } = req.body;

  const newIncidencia: Incidencia = {
    tipo,
    descripcion,
    usuario_id,
  };

  try {
    const response = await _createIncidencia(newIncidencia);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
