import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createLote,
  _getLote,
  _getLoteProductos,
  _getLotes,
} from "../service/lotes";
import { Lote } from "../interface/lote";

export const createLote = async (req: Request, res: Response) => {
  const { tipo_tela, metraje, productos } = req.body;
  const lote: Partial<Lote> = {
    tipo_tela,
    metraje,
    productos,
  };

  try {
    const response = await _createLote(lote);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createLote", 500);
  }
};

export const getLotes = async (req: Request, res: Response) => {
  try {
    const response = await _getLotes();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getLotes", 500);
  }
};

export const getLote = async (req: Request, res: Response) => {
  const { lote_id } = req.params;
  try {
    const response = await _getLote(Number(lote_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getLotes", 500);
  }
};

export const getLoteProductos = async (req: Request, res: Response) => {
  const { lote_id } = req.params;

  try {
    const response = await _getLoteProductos(Number(lote_id));
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getLotes", 500);
  }
};
