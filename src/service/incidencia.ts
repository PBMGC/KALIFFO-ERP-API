import { Incidencia as IncidenciaInterface } from "../interface/incidencia";

import { Incidencia } from "../models/incidencia";

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

export const _getIncidencias = async (usuario_id?: number) => {
  try {
    const filtros: any = {};

    if (usuario_id) {
      filtros.where = { usuario_id };
    }

    const items = await Incidencia.findAll(filtros);
    return {
      items,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      msg: "error _getIncidencias",
      succes: false,
      status: 500,
    };
  }
};

export const _getIncidencia = async (incidencia_id: number) => {
  try {
    const item = await Incidencia.findAll({
      where: { incidencia_id },
    });

    return {
      item,
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

export const _deleteIncidencia = async (incidencia_id: number) => {
  try {
    const result = await Incidencia.destroy({
      where: { incidencia_id },
    });

    if (result === 0) {
      return {
        msg: "no se encontro incidencia",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "incidencia eliminada",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteIncidencia",
      success: false,
      status: 500,
    };
  }
};

export const _updateIncidencia = async (
  incidencia_id: number,
  updatedIncidencia: Partial<IncidenciaInterface>
) => {
  try {
    const [updatedRows] = await Incidencia.update(updatedIncidencia, {
      where: { incidencia_id },
    });

    if (updatedRows === 0) {
      return {
        msg: "Incidencia no encontrada o no actualizada",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "Incidencia actualizada correctamente",
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateIncidencia",
      success: false,
      status: 500,
    };
  }
};
