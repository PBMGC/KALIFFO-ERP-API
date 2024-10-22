import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createLote, _getLotes, _UpdateLote } from "../service/lotes";

export const createLote = async (req: Request, res: Response) => {
  try {
    const response = await _createLote();
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createLote", 500);
  }
};

export const updateLote = async (req: Request, res: Response) => {
  const { lote_id } = req.params;
  const estado = req.query.estado;
  const etapa = req.query.etapa;
  try {
    const response = await _UpdateLote(
      Number(lote_id),
      Number(estado),
      String(etapa)
    );
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
