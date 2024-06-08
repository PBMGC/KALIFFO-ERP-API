import { Request, Response } from "express";
import { Venta } from "../interface/venta";
import {
  _createVenta,
  _deleteVente,
  _getVenta,
  _getVentas,
  _updateVenta,
} from "../service/venta";

export const getVentas = async (req: Request, res: Response) => {
  try {
    const response = await _getVentas();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getVenta = async (req: Request, res: Response) => {
  const { codigo } = req.params;
  try {
    const response = await _getVenta(codigo);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createVenta = async (req: Request, res: Response) => {
  const {
    codigo_venta,
    metodoVenta,
    metodoPago,
    tipoVenta,
    ctdTotal,
    precioBruto,
    igv,
    precioTotal,
    fecha,
    codigo_cliente,
  } = req.body;

  const venta: Venta = {
    codigo_venta,
    metodoVenta,
    metodoPago,
    tipoVenta,
    ctdTotal,
    precioBruto,
    igv,
    precioTotal,
    fecha,
    codigo_cliente,
  };

  try {
    const response = await _createVenta(venta);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteVenta = async (req: Request, res: Response) => {
  const { codigo } = req.params;

  try {
    const response = await _deleteVente(codigo);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateVenta = async (req: Request, res: Response) => {
  const {
    codigo_venta,
    metodoVenta,
    metodoPago,
    tipoVenta,
    ctdTotal,
    precioBruto,
    igv,
    precioTotal,
    fecha,
    codigo_cliente,
  } = req.body;

  const venta: Venta = {
    codigo_venta,
    metodoVenta,
    metodoPago,
    tipoVenta,
    ctdTotal,
    precioBruto,
    igv,
    precioTotal,
    fecha,
    codigo_cliente,
  };

  try {
    const response = await _updateVenta(venta);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
