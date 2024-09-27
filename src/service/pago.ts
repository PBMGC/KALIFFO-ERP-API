import sequelize from "../db/connection";
import { Pago as PagoInterface } from "../interface/pago";
import { Pago } from "../models/pago";

export const _createPago = async (pago: PagoInterface) => {
  try {
    const newPago = await Pago.create(pago);
    return {
      message: newPago,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "error _createPago",
      success: false,
      status: 500,
    };
  }
};

export const _getPagos = async (usuario_id: number) => {
  try {
    const items = await Pago.findAll({
      where: { usuario_id },
    });

    return {
      items,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _getPagos",
      success: false,
      status: 500,
    };
  }
};

export const _deletePagos = async (pago_id: number) => {
  try {
    await sequelize.query(`
      CALL SP_DeletePago(${pago_id})`);

    return {
      message: "Eliminacion exitosa",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    return {
      message: "Error al eliminar el pago",
      success: false,
      status: 500,
    };
  }
};
