import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createCorte } from "../service/cortes";

export const createCorte = async (req: Request, res: Response) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tela_id,
  } = req.body;

  const corte: any = {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tela_id,
  };

  try {
    const response = await _createCorte(corte);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createTela", 500);
  }
};
