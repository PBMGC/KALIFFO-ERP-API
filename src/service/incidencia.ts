import { Incidencia as IncidenciaInterface } from "../interface/incidencia";
import { Incidencia } from "../models/incidencia";

export const _createIncidencia = async (incidencia: IncidenciaInterface) => {
  try {
    incidencia.fecha_creacion = new Date();
    const newIncidencia = await Incidencia.create(incidencia);

    return {
      msg: newIncidencia,
      succes: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "_createIncidencia",
      succes: false,
      status: 400,
    };
  }
};
