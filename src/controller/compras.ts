import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createCompra, _getCompras } from "../service/compras";

export const createCompra = async (req: Request, res: Response) => {
    const { 
        empresa_proveedor, 
        fecha_compra,
        cantidad,
        total,
        tienda_id,
        detalle
    } = req.body;

    const compra: any = { 
        empresa_proveedor, 
        fecha_compra,
        cantidad,
        total,
        tienda_id,
        detalle
    } ;
  
    try {
      const response = await _createCompra(compra);
      res.status(response.status).json(response);
    } catch (error) {
      handleHttp(res, "error_createCompra", 500);
    }
  };

  export const getCompras = async (req: Request, res: Response) => {
    
    const tienda_id = req.query.tienda_id;

    try {
        const response = await _getCompras(Number(tienda_id))
        res.status(response.status).json(response.items);
    } catch (error) {
        handleHttp(res, "error_getCompras", 500);
    }

  }