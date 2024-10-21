import { Request, Response } from "express";
import {
  _createUsuario,
  _deleteUsuario,
  _generarReporte,
  _getUsuario,
  _getUsuarios,
  _updateUsuario,
} from "../service/usuario";
import { handleHttp } from "../util/error.handler";

export const createUsuario = async (req: Request, res: Response) => {
  const {
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    telefono,
    contraseña,
    sueldo,
    tienda_id,
    rol,
  } = req.body;

  const newUsuario: any = {
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    telefono,
    contraseña,
    sueldo,
    tienda_id,
    rol,
  };

  try {
    const response = await _createUsuario(newUsuario);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createUsuario");
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  const rol = req.query.rol;
  const tienda_id = req.query.tienda_id;
  const antiTienda_id = req.query.antiTienda_id as string;

  try {
    const response = await _getUsuarios(
      Number(rol),
      Number(tienda_id),
      Number(antiTienda_id)
    );
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getUsuarios", 500);
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _getUsuario(usuario_id);
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "Error getUsuario", 500);
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _deleteUsuario(usuario_id);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_deleteUsuario", 500);
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;
  const {
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    sueldo,
    telefono,
    tienda_id,
    rol,
  } = req.body;

  const updateUsuario: any = {
    usuario_id: Number(usuario_id),
    nombre,
    ap_paterno,
    ap_materno,
    fecha_nacimiento,
    dni,
    sueldo,
    telefono,
    tienda_id,
    rol,
  };

  try {
    const response = await _updateUsuario(updateUsuario);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateUsuario", 500);
  }
};

// export const loginUsuario = async (req: Request, res: Response) => {
//   const { dni, contraseña } = req.body;

//   try {
//     const response = await _login(dni, contraseña);
//     res.cookie("token", response.token, {
//       maxAge: 1000 * 60 * 60,
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     delete response.token;
//     res.status(response.status).json(response);
//   } catch (error) {
//     handleHttp(res, "error_loginUsusrio", 500);
//   }
// };

export const generateReporte = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const response = await _generarReporte(res, Number(usuario_id));
  } catch (error) {
    handleHttp(res, "error_generarReporte", 500);
  }
};
