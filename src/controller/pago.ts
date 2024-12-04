import { Request, Response } from "express";
import {
  _createPago,
  _deletePagos,
  _getPagos,
  _updatePago,
} from "../service/pago";
import { handleHttp } from "../util/error.handler";

export const getPagos = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _getPagos(Number(usuario_id));
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getPagos", 500);
  }
};

export const deletePagos = async (req: Request, res: Response) => {
  const { pago_id } = req.params;
  try {
    const response = await _deletePagos(Number(pago_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_deletePagos", 500);
  }
};

export const createPago = async (req: Request, res: Response) => {
  const { usuario_id, montoPagado, montoFaltante, fecha } = req.body;

  try {
    const response = await _createPago({
      usuario_id,
      montoPagado,
      montoFaltante,
      fecha,
    });
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createPago", 500);
  }
};

export const updatePago = async (req: Request, res: Response) => {
  const { pago_id } = req.params;
  const { montoPagado, montoFaltante, fecha, trabajador_id } = req.body;

  try {
    const response = await _updatePago(Number(pago_id), {
      montoPagado,
      montoFaltante,
      fecha,
      trabajador_id,
    });
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updatePago", 500);
  }
};
