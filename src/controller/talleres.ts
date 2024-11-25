import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createAcabado,
  _getAcabados,
  _getAcabado,
  _activarAcabado,
  _desactivarAcabado,
  _getAcabadoLote,
  _sgteEstadoAcabadosPorLote,
} from "../service/talleres";

export const createAcabado = async (req: Request, res: Response) => {
  const {
    lote_id,
    color_id,
    talla,
    fecha_inicio,
    fecha_final,
    cantidad_recibida,
  } = req.body;

  const acabado: any = {
    lote_id,
    color_id,
    talla,
    cantidad_recibida,
    fecha_inicio,
    fecha_final,
  };

  try {
    const response = await _createAcabado(acabado);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createAcabado", 500);
  }
};

export const getAcabadoLote = async (req: Request, res: Response) => {
  const { lote_id } = req.params;

  try {
    const response = await _getAcabadoLote(lote_id);
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_createAcabado", 500);
  }
};

// export const updateAcabado = async (req: Request, res: Response) => {
//   const { acabado_id } = req.params;
//   const { lote_id, color_id, talla, cantidad_enviada, cantidad_recibida } =
//     req.body;

//   const updateAcabado: any = {
//     acabado_id: Number(acabado_id),
//     lote_id: lote_id || null,
//     color_id: color_id || null,
//     talla: talla || null,
//     cantidad_enviada: cantidad_enviada || null,
//     cantidad_recibida: cantidad_recibida || null,
//   };

//   try {
//     const response = await _updateAcabado(updateAcabado);
//     res.status(response.status).json(response);
//   } catch (error) {
//     handleHttp(res, "error_updateAcabado", 500);
//   }
// };

export const getAcabados = async (req: Request, res: Response) => {
  try {
    const response = await _getAcabados();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getAcabadosPorLote", 500);
  }
};

export const getAcabado = async (req: Request, res: Response) => {
  const { acabado_id } = req.params;

  try {
    const response = await _getAcabado(Number(acabado_id));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getAcabado", 500);
  }
};

export const sgteEstadoAcabado = async (req: Request, res: Response) => {
  const { lote_id } = req.params;
  const { detalles } = req.body;

  try {
    const response = await _sgteEstadoAcabadosPorLote(lote_id, detalles);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_sgteEstadoAcabado", 500);
  }
};

export const activarAcabado = async (req: Request, res: Response) => {
  const { acabado_id } = req.params;
  try {
    const response = await _activarAcabado(Number(acabado_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_activarAcabado", 500);
  }
};

export const desactivarAcabado = async (req: Request, res: Response) => {
  const { acabado_id } = req.params;
  try {
    const response = await _desactivarAcabado(Number(acabado_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarAcabado", 500);
  }
};
