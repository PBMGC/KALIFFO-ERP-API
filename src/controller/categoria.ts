import { Request, Response } from "express";
import {
  _createCategoria,
  _deleteCategoria,
  _getCategoria,
  _getCategorias,
  _updateCategoria,
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

export const deleteCategoria = async (req: Request, res: Response) => {
  const { categoria_id } = req.params;

  try {
    const response = await _deleteCategoria(categoria_id);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { categoria_id, tipo, categoria } = req.params;

  const catego: Categoria = {
    categoria_id: Number(categoria_id),
    tipo,
    categoria,
  };
  try {
    const response = await _updateCategoria(catego);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
