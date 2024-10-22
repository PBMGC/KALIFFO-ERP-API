import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createCorte,
  _UpdateCorte,
  _getCortes,
  _getCorte,
  _getCortesPorLote,
} from "../service/cortes";

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
    taller_id: taller_id || null,
    producto_id: producto_id || null,
    cantidad: cantidad || null,
    talla: talla || null,
    metraje_asignado: metraje_asignado || null,
    tipo_tela: tipo_tela || null,
  };

  try {
    const response = await _UpdateCorte(updateCorte);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateCorte", 500);
  }
};

export const getCortesPorLote = async (req: Request, res: Response) => {
  
  const {lote_id} = req.params;
  
  try {
    const response = await _getCortesPorLote(Number(lote_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_getCortes", 500);
  }
};

export const getCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;

  try {
    const response = await _getCorte(Number(corte_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_getCorte", 500);
  }
};
