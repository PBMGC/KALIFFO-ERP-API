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
  const { codigo } = req.params;
  try {
    const response = await _getCliente(codigo);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    email,
    fecha_nacimiento,
  } = req.body;

  const newCliente: Cliente = {
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    telefono,
    email,
  };

  try {
    const response = await _createCliente(newCliente);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { codigo } = req.params;

  try {
    const response = await _deleteCliente(codigo);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const {
    codigo_cliente,
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    email,
    fecha_nacimiento,
  } = req.body;

  const cliente: Partial<Cliente> = {
    codigo_cliente,
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    email,
    fecha_nacimiento,
  };

  try {
    const response = await _updateCliente(cliente);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
