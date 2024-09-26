import { Request, Response } from "express";
import { Incidencia } from "../interface/incidencia";
import {
  _createIncidencia,
  _getIncidencia,
  _getIncidencias,
} from "../service/incidencia";
import { handleHttp } from "../util/error.handler";

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
    handleHttp(res, "error_createIncidencia", 500);
  }
};

export const getIncidencias = async (req: Request, res: Response) => {
  try {
    const response = await _getIncidencias();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getIncidencias", 500);
  }
};

export const getIncidencia = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _getIncidencia(usuario_id);
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getIncidencia", 500);
  }
};
