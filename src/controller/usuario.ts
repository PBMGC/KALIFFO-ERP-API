import { Request, Response } from "express";
import { Usuario } from "../interface/usuario";
import {
  _createUsuario,
  _deleteUsuario,
  _getUsuario,
  _getUsuarios,
  _horaEntrada,
  _horaSalida,
  _login,
  _updateUsuario,
} from "../service/usuario";

export const createUsuario = async (req: Request, res: Response) => {
  const {
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    contraseña,
    tienda_id,
    puesto_id,
  } = req.body;

  const newUsuario: Usuario = {
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    contraseña,
    tienda_id,
    puesto_id,
  };

  try {
    const response = await _createUsuario(newUsuario);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const response = await _getUsuarios();
    res.status(response.status).json(response.items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { dni } = req.params;

  try {
    const response = await _getUsuario(dni);
    res.status(response.status).json(response.item);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { dni } = req.params;

  try {
    const response = await _deleteUsuario(dni);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const {
    usuario_id,
    nombre,
    ap_paterno,
    ap_materno,
    dni,
    contraseña,
    tienda_id,
    puesto_id,
  } = req.body;

  const updateUsuario: Partial<Usuario> = {
    usuario_id,
    nombre,
    ap_paterno,
    ap_materno,
    dni,
    contraseña,
    tienda_id,
    puesto_id,
  };

  try {
    const response = await _updateUsuario(updateUsuario);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { usuario_id, contraseña } = req.body;

  try {
    const response = await _login(usuario_id, contraseña);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(400);
  }
};

export const horaEntrada = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _horaEntrada(Number(usuario_id));
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const horaSalida = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _horaSalida(Number(usuario_id));
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
