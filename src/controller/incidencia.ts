import { Request, Response } from "express";
import { Incidencia } from "../interface/incidencia";
import {
  _createIncidencia,
  _deleteIncidencia,
  _getIncidencia,
  _getIncidencias,
  _updateIncidencia,
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
  const usuario_id = req.query.usuario_id as string;

  try {
    const response = await _getIncidencias(Number(usuario_id));
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
    const response = await _getIncidencia(Number(usuario_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getIncidencia", 500);
  }
};

export const deleteIncidencia = async (req: Request, res: Response) => {
  const { incidencia_id } = req.params;
  try {
    const response = await _deleteIncidencia(Number(incidencia_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_deleteIncidencia", 500);
  }
};

export const updateIncidencia = async (req: Request, res: Response) => {
  const { incidencia_id } = req.params;
  const { tipo, descripcion, usuario_id } = req.body;

  const updateIncidencia: Partial<Incidencia> = {
    tipo,
    descripcion,
    usuario_id,
  };

  try {
    const response = await _updateIncidencia(
      Number(incidencia_id),
      updateIncidencia
    );
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateIncidencia", 500);
  }
};
