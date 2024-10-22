import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createLavanderia,
  _deleteLavanderia,
  _getLavanderia,
  _getLavanderias,
  _updateLavanderia,
} from "../service/lavanderia";

export const createLavanderia = async (req: Request, res: Response) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = req.body;

  const lavanderia: any = {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  };

  try {
    const response = await _createLavanderia(lavanderia);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error__createLavanderia", 500);
  }
};

export const getLavanderia = async (req: Request, res: Response) => {
  const { lavanderia_id } = req.params;

  try {
    const response = await _getLavanderia(Number(lavanderia_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error__getLavanderia", 500);
  }
};

export const getLavanderias = async (req: Request, res: Response) => {
  try {
    const response = await _getLavanderias();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error__getLavanderia", 500);
  }
};

export const updateLavanderia = async (req: Request, res: Response) => {
  const { lavanderia_id } = req.params;
  const {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = req.body;

  const lavanderia: any = {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  };

  try {
    const response = await _updateLavanderia(Number(lavanderia_id), lavanderia);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error__updateLavanderia", 500);
  }
};

export const deleteLavanderia = async (req: Request, res: Response) => {
  const { lavanderia_id } = req.params;

  try {
    const response = await _deleteLavanderia(Number(lavanderia_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error__deleteLavanderia", 500);
  }
};
