import { Request, Response } from "express";
import { _createVenta, _getVenta, _getVentas } from "../service/venta";
import { handleHttp } from "../util/error.handler";

export const createVenta = async (req: Request, res: Response) => {
  const {
    codigo,
    tipoVenta,
    tipoComprobante,
    fecha,
    totalBruto,
    totalIgv,
    totalNeto,
    tipoPago,
    dni,
    ruc,
    direccion,
    telefono,
    nombre,
    tienda_id,
    detalles,
  } = req.body;

  const venta: any = {
    codigo,
    tipoVenta,
    tipoComprobante,
    fecha,
    totalBruto,
    totalIgv,
    totalNeto,
    tipoPago,
    dni,
    ruc,
    direccion,
    telefono,
    nombre,
    tienda_id,
    detalles,
  };

  try {
    const response = await _createVenta(venta);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createVenta");
  }
};

export const getVentas = async (req: Request, res: Response) => {
  try {
    const response = await _getVentas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getVentas");
  }
};

export const getVenta = async (req: Request, res: Response) => {
  const { venta_id } = req.params;

  try {
    const response = await _getVenta(Number(venta_id));
    res.status(response.status).json(response.item ? response.item : response);
    // res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_getVenta");
  }
};
