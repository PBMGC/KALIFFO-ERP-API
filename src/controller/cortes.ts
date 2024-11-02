import e, { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createCorte,
  _UpdateCorte,
  _getCortes,
  _getCorte,
  _getCortesPorLote,
  _getTallas,
  _sgtEstadoCorte,
  _activarCorte,
  _desactivarCorte,
} from "../service/cortes";
import { Corte } from "../interface/corte";

export const createCorte = async (req: Request, res: Response) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad_enviada,
    talla,
    metraje_asignado,
    tipo_tela,
  } = req.body;

  const corte: Corte = {
    lote_id,
    taller_id,
    producto_id,
    cantidad_enviada,
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
  const { lote_id } = req.params;

  try {
    const response = await _getCortesPorLote(Number(lote_id));
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getCortesPorLote", 500);
  }
};

export const getCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;

  try {
    const response = await _getCorte(Number(corte_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getCorte", 500);
  }
};

export const sgteEstdoCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;
  const { cantidad_recibida } = req.body;

  try {
    const response = await _sgtEstadoCorte(Number(corte_id), cantidad_recibida);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_sgteEstadoCorte", 500);
  }
};

export const activarCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;
  try {
    const response = await _activarCorte(Number(corte_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_activarCorte", 500);
  }
};

export const desactivarCorte = async (req: Request, res: Response) => {
  const { corte_id } = req.params;
  try {
    const response = await _desactivarCorte(Number(corte_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarCorte", 500);
  }
};

export const getTallas = async (req: Request, res: Response) => {
  try {
    const response = await _getTallas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getTallas", 500);
  }
};
