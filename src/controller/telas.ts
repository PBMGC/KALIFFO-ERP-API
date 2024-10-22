import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createTela,
  _desactivarTela,
  _getEmpresas,
  _getTelaPorTipo,
  _getTelas,
  _getTiposTelas,
  _UpdateTela,
} from "../service/telas";
import { _getTiendas } from "../service/tienda";

export const createTela = async (req: Request, res: Response) => {
  const telasCreadas: any[] = [];

  for (const tela of req.body) {
    const nuevaTela: any = {
      tipo: tela.tipo,
      metraje: tela.metraje,
      articulo: tela.articulo,
      empresa_compra: tela.empresa_compra,
      fecha_compra: tela.fecha_compra,
    };

    try {
      const response = await _createTela(nuevaTela);
      telasCreadas.push(response);
    } catch (error) {
      return handleHttp(res, "error_createTela", 500);
    }
  }

  res.status(200).json(telasCreadas);
};


export const updateTela = async (req: Request, res: Response) => {
  const { tela_id } = req.params;

  const { tipo, metraje, articulo, estado, empresa_compra, fecha_compra } =
    req.body;

  const updateTela: any = {
    tela_id: Number(tela_id),
    tipo,
    metraje,
    articulo,
    estado,
    empresa_compra,
    fecha_compra,
  };

  try {
    const response = await _UpdateTela(updateTela);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createCompra", 500);
  }
};

export const desactivarTela = async (req: Request, res: Response) => {
  const { tela_id } = req.params;
  try {
    const response = await _desactivarTela(Number(tela_id));
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_desactivarTela", 500);
  }
};

export const getTipos = async (req: Request, res: Response) => {
  try {
    const response = await _getTiposTelas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getTipos", 500);
  }
};

export const getTelas = async (req: Request, res: Response) => {
  try {
    const response = await _getTelas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getTelas", 500);
  }
};

export const getTelaPorTipo = async (req: Request, res: Response) => {
  const { tipo_tela } = req.params;
  const estado = req.query.estado

  console.log(tipo_tela,estado)

  try {
    const response = await _getTelaPorTipo(tipo_tela,Number(estado));
    res.status(response.status).json(response.item ? response.item : response);
  } catch (error) {
    handleHttp(res, "error_getTelas", 500);
  }
};

export const getEmpresas= async (req: Request, res: Response) => {
  try {
    const response = await _getEmpresas();
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "error_getEmpresas", 500);
  }
};
