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
  console.log("asdas");

  const { dni, contraseña } = req.body;

  try {
    const response = await _login(dni, contraseña);
    res.cookie("token", response.token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });

    delete response.token;
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(400);
  }
};

export const horaEntrada = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken.usuario_id;

  try {
    const response = await _horaEntrada(usuario_id);
    res.status(response.status).json(response);
    // res.status(200).json("das");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const horaSalida = async (req: Request, res: Response) => {
  const usuario_id = req.decodeToken.usuario_id;
  try {
    const response = await _horaSalida(usuario_id);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
