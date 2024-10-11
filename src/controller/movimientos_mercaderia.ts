import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createmovimientos_mercaderia, _getmovimientos_mercaderia } from "../service/movimientos_mercaderia";

export const getmovimientos_mercaderia = async (
  req: Request,
  res: Response
) => {
  const tienda_id = req.query.tienda_id;
  try {
    const response = await _getmovimientos_mercaderia(Number(tienda_id));
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getUsuario", 500);
  }
};

export const createmovimientos_mercaderia = async (
  req: Request,
  res: Response
) => {
  const {
    tienda_idO,
    tienda_idD,
    producto_id,
    producto_Did,
    talla,
    cantidad,
    fecha
  }=req.body
    
    const movimiento:any = {
        tienda_idD,
        tienda_idO,
        producto_id,
        producto_Did,
        talla,
        cantidad,
        fecha        
    }

  try {
    const response = await _createmovimientos_mercaderia(movimiento);
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getUsuario", 500);
  }
};
