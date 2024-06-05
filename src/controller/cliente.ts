import { Request, Response } from "express";
import {
  _createCliente,
  _deleteCliente,
  _getCliente,
  _getClientes,
  _updateCliente,
} from "../service/cliente";
import { Cliente } from "../interface/cliente";

export const getClientes = async (req: Request, res: Response) => {
  try {
    const response = await _getClientes();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCliente = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  try {
    const response = await _getCliente(cliente_id);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const { nombre, apellido, edad, telefono, email, estado, categoria_id } =
    req.body;

  const newCliente: Cliente = {
    nombre,
    apellido,
    edad,
    telefono,
    email,
    estado,
    categoria_id,
  };

  try {
    const response = await _createCliente(newCliente);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;

  try {
    const response = await _deleteCliente(cliente_id);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const {
    cliente_id,
    nombre,
    apellido,
    edad,
    telefono,
    email,
    estado,
    categoria_id,
  } = req.body;

  const cliente: Cliente = {
    cliente_id,
    nombre,
    apellido,
    edad,
    telefono,
    email,
    estado,
    categoria_id,
  };

  try {
    const response = await _updateCliente(cliente);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
