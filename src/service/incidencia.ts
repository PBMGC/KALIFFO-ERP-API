import sequelize from "../db/connection";
import { Incidencia as IncidenciaInterface } from "../interface/incidencia";
import { Horario } from "../models/horario";
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

export const _getIncidencias = async () => {
  try {
    const items = await Incidencia.findAll();
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

export const _getIncidencia = async (usuario_id: string) => {
  try {
    const items = await Incidencia.findAll({
      where: { usuario_id: usuario_id },
    });

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

//SQL PURO
export const _updateIncidencia = async (
  incidencia_id: number,
  updateIncidencia: IncidenciaInterface
) => {
  try {
    const { tipo, descripcion, fecha_creacion } = updateIncidencia;

    await sequelize.query(`
      CALL SP_UpdateIncidencia(
        ${incidencia_id},
        ${tipo !== undefined ? `${tipo}` : null},
        ${descripcion !== undefined ? `"${descripcion}"` : null},
        ${fecha_creacion !== undefined ? `"${fecha_creacion}"` : null}
      )
    `);

    return {
      message: "Actualización exitosa",
      success: true,
      status: 200
    };
  } catch (error) {
    console.error("Error al actualizar la incidencia:", error);
    return {
      message: "Error al actualizar la incidencia",
      success: false,
      status: 500
    };
  }
};

//Sql puro

export const _deleteIncidencia = async (
  incidencia_id: number,
) => {
  try {

    await sequelize.query(`
      CALL SP_DeleteIncidencia(${incidencia_id})`);

    return {
      message: "Eliminacion exitosa",
      success: true,
      status: 200
    };
  } catch (error) {
    console.error("Error al eliminar la incidencia:", error);
    return {
      message: "Error al eliminar la incidencia",
      success: false,
      status: 500
    };
  }
};