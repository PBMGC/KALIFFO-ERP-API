import { Request, Response } from "express";
import {
  _createCategoria,
  _getCategoria,
  _getCategorias,
} from "../service/categoria";
import { Categoria } from "../interface/categoria";

export const createCategoria = async (req: Request, res: Response) => {
  const { tipo, categoria } = req.body;

  const newCategoria: Categoria = {
    tipo,
    categoria,
  };

  try {
    const response = await _createCategoria(newCategoria);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategoriasProducto = async (req: Request, res: Response) => {
  try {
    const response = await _getCategorias("producto");
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategoriasCliente = async (req: Request, res: Response) => {
  try {
    const response = await _getCategorias("cliente");
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  const { categoria_id } = req.params;

  try {
    const response = await _getCategoria(categoria_id);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};
