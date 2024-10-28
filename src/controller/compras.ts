import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createCompra,
  _eliminarCompra,
  _getCompras,
  _getComprasDetalle,
  _getEmpresas,
  _getProductos,
  _UpdateCompra,
} from "../service/compras";

export const createCompra = async (req: Request, res: Response) => {
  const {
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle,
  } = req.body;

  const compra: any = {
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle,
  };

  try {
    const response = await _createCompra(compra);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCompra", 500);
  }
};

export const updateCompra = async (req: Request, res: Response) => {
  const { compra_id } = req.params;

  const {
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle,
  } = req.body;

  const updatecompra: any = {
    compra_id: Number(compra_id),
    empresa_proveedor,
    fecha_compra,
    cantidad,
    total,
    tienda_id,
    detalle,
  };

  try {
    const response = await _UpdateCompra(updatecompra);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCompra", 500);
  }
};

export const eliminarCompra = async (req: Request, res: Response) => {
  const { compra_id } = req.params;
  try {
    const response = await _eliminarCompra(Number(compra_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_eliminarCompra", 500);
  }
};


export const getCompras = async (req: Request, res: Response) => {
  const tienda_id = req.query.tienda_id;

  try {
    const response = await _getCompras(Number(tienda_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getCompras", 500);
  }
};

export const getEmpresas = async (req: Request, res: Response) => {
  try {
    const response = await _getEmpresas();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getEmpresas", 500);
  }
};

export const getProductos = async (req: Request, res: Response) => {
  try {
    const response = await _getProductos();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getProductos", 500);
  }
};

export const getComprasDetalle = async (req: Request, res: Response) => {
  const {compra_id} = req.params;

  try {
    const response = await _getComprasDetalle(Number(compra_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getComprasDetalle", 500);
  }
};
