import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createTela, _desactivarTela, _UpdateTela } from "../service/telas";

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

  const {
    tipo,
    metraje,
    articulo,
    estado,
    empresa_compra,
    fecha_compra,
  } = req.body;

  const updateTela: any = {
    tela_id:Number(tela_id),
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
