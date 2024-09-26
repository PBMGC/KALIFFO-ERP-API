import { Incidencia as IncidenciaInterface } from "../interface/incidencia";
import { Incidencia } from "../models/incidencia";
import { Usuario } from "../models/usuario";

export const _createIncidencia = async (incidencia: IncidenciaInterface) => {
  try {
    incidencia.fecha_creacion = new Date();
    const newIncidencia = await Incidencia.create(incidencia);

    return {
      message: newIncidencia,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      msg: "error _createIncidencia",
      succes: false,
      status: 500,
    };
  }
};

export const _getIncidencia = async () => {
  try {
    const items = await Incidencia.findAll();
    return {
      items,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      msg: "error _getIncidencia",
      succes: false,
      status: 500,
    };
  }
};
