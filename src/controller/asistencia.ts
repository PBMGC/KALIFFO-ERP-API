import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _getAsistencias, _horasTrabajadas } from "../service/asistencia";

export const getAsistencias = async (req: Request, res: Response) => {
  const usuario_id = req.query.usuario_id as string;

  try {
    const response = await _getAsistencias(Number(usuario_id));
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getAsistencias", 500);
  }
};

export const horasTrabajadas = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;
  const { fechaInicio, fechaFinal } = req.body;

  try {
    const response = await _horasTrabajadas(
      fechaInicio,
      fechaFinal,
      Number(usuario_id)
    );
    res.status(response.status).json(response.item);
  } catch (error) {
    handleHttp(res, "error_horasTrabajadas", 500);
  }
};
