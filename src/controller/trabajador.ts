import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  _createTrabajador,
  _deleteTrabajador,
  _generarReporte,
  _getTrabajador,
  _getTrabajadores,
  _updateTrabajador,
} from "../service/trabajadores";

export const createTrabajador = async (req: Request, res: Response) => {
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

  const newTrabajador: any = {
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
    const response = await _createTrabajador(newTrabajador);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createTrabajador");
  }
};

export const getTrabajadores = async (req: Request, res: Response) => {
  const rol = req.query.rol;
  const tienda_id = req.query.tienda_id;
  const antiTienda_id = req.query.antiTienda_id as string;

  try {
    const response = await _getTrabajadores(
      Number(rol),
      Number(tienda_id),
      Number(antiTienda_id)
    );
    res.status(response.status).json(response.items);
  } catch (error) {
    handleHttp(res, "error_getTrabajadores", 500);
  }
};

export const getTrabajador = async (req: Request, res: Response) => {
  const { trabajador_id } = req.params;

  try {
    const response = await _getTrabajador(trabajador_id);
    res
      .status(response.status)
      .json(response.items ? response.items : response);
  } catch (error) {
    handleHttp(res, "Error getTrabajador", 500);
  }
};

export const deleteTrabajador = async (req: Request, res: Response) => {
  const { trabajador_id } = req.params;

  try {
    const response = await _deleteTrabajador(trabajador_id);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_deleteTrabajador", 500);
  }
};

export const updateTrabajador = async (req: Request, res: Response) => {
  const { trabajador_id } = req.params;
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

  const updateTrabajador: any = {
    trabajador_id: Number(trabajador_id),
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
    const response = await _updateTrabajador(updateTrabajador);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_updateTrabajador", 500);
  }
};

export const generateReporte = async (req: Request, res: Response) => {
  const { trabajador_id } = req.params;

  try {
    const response = await _generarReporte(res, Number(trabajador_id));
  } catch (error) {
    handleHttp(res, "error_generarReporte", 500);
  }
};
