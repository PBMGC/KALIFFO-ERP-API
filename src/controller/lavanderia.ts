import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createLavanderia } from "../service/lavanderia";

export const createLavanderia = async (req: Request, res: Response) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = req.body;

  const lavanderia: any = {
    lote_id,
    color_id,
    talla,
    cantidad,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  };

  try {
    const response = await _createLavanderia(lavanderia);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error__createLavanderia", 500);
  }
};
