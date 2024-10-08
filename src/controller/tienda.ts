import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createTienda, _getTienda, _getTiendas } from "../service/tienda";

export const createTienda = async (req: Request, res: Response) => {
  const { tienda, direccion, telefono } = req.body;

  const newTienda: any = {
    tienda,
    direccion,
    telefono,
  };

  try {
    const response = await _createTienda(newTienda);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createTienda", 500);
  }
};

export const getTiendas = async (req: Request, res: Response) => {
  try {
    const response = await _getTiendas();
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getTiendas", 500);
  }
};

export const getTienda = async (req: Request, res: Response) => {
  const { tienda_id } = req.params;

  try {
    const response = await _getTienda(Number(tienda_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getTienda", 500);
  }
};

// export const getProductosTienda = async (req: Request, res: Response) => {};
