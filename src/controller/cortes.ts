import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createCorte, _UpdateCorte } from "../service/cortes";

export const createCorte = async (req: Request, res: Response) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  } = req.body;

  const corte: any = {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  };

  try {
    const response = await _createCorte(corte);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCorte", 500);
  }
};

export const updateCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;

  const {
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  } = req.body;

  const updateCorte: any = {
    corte_id: Number(corte_id),
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  };

  try {
    const response = await _UpdateCorte(updateCorte);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCompra", 500);
  }
};
