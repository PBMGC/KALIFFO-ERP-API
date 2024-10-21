import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createTela,
  _desactivarTela,
  _getTela,
  _getTelas,
  _getTiposTelas,
  _UpdateTela,
} from "../service/telas";
import { _getTiendas } from "../service/tienda";

export const createTela = async (req: Request, res: Response) => {
  const { tipo, metraje, articulo, empresa_compra, fecha_compra } = req.body;

  const tela: any = {
    tipo,
    metraje,
    articulo,
    empresa_compra,
    fecha_compra,
  };

  try {
    const response = await _createTela(tela);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createTela", 500);
  }
};

export const updateTela = async (req: Request, res: Response) => {
  const { tela_id } = req.params;

  const { tipo, metraje, articulo, estado, empresa_compra, fecha_compra } =
    req.body;

  const updateTela: any = {
    tela_id: Number(tela_id),
    tipo,
    metraje,
    articulo,
    estado,
    empresa_compra,
    fecha_compra,
  };

  try {
    const response = await _UpdateTela(updateTela);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCompra", 500);
  }
};

export const desactivarTela = async (req: Request, res: Response) => {
  const { tela_id } = req.params;
  try {
    const response = await _desactivarTela(Number(tela_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarTela", 500);
  }
};

export const getTipos = async (req: Request, res: Response) => {
  try {
    const response = await _getTiposTelas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getTipos", 500);
  }
};

export const getTelas = async (req: Request, res: Response) => {
  const tipo = req.query.tipo as string;

  try {
    const response = await _getTelas(tipo);
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getTelas", 500);
  }
};

export const getTela = async (req: Request, res: Response) => {
  const { tela_id } = req.params;

  try {
    const response = await _getTela(Number(tela_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getTelas", 500);
  }
};
