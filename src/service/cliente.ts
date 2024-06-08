import { Op } from "sequelize";
import { Cliente as ClienteInterface } from "../interface/cliente";
import { Cliente } from "../models/cliente";

export const _getClientes = async () => {
  const items = await Cliente.findAll();

  try {
    return {
      items,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getClientes",
      error,
      status: 400,
    };
  }
};

export const _getCliente = async (codigo_cliente: string) => {
  const item = await Cliente.findOne({
    where: { codigo_cliente: codigo_cliente },
  });

  try {
    return {
      item,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getClientes",
      error,
      status: 400,
    };
  }
};

export const _createCliente = async (cliente: ClienteInterface) => {
  try {
    if (
      await Cliente.findOne({
        where: {
          nombre: cliente.nombre,
          apellido_paterno: cliente.apellido_paterno,
          apellido_materno: cliente.apellido_materno,
        },
      })
    ) {
      return {
        msg: "Este cliente ya existe",
        status: 400,
      };
    }

    let codigo =
      cliente.nombre.substring(0, 2) +
      cliente.apellido_paterno.substring(0, 1) +
      cliente.apellido_materno.substring(0, 1);

    const codigos = await Cliente.findAll({
      where: {
        codigo_cliente: { [Op.like]: `%${codigo}%` },
      },
    });

    if (codigos.length === 0) {
      codigo = codigo + "01";
    } else {
      codigo =
        codigo +
        (codigos.length + 1 < 10
          ? "0" + (codigos.length + 1)
          : codigos.length + 1);
    }

    cliente.codigo_cliente = codigo.toLocaleLowerCase();
    await Cliente.create(cliente);

    return {
      msg: `Cliente con codigo ${cliente.codigo_cliente} a sido creado`,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      msg: "error _createCliente",
      error,
      status: 400,
    };
  }
};

export const _deleteCliente = async (codigo_cliente: string) => {
  try {
    if (
      !(await Cliente.findOne({ where: { codigo_cliente: codigo_cliente } }))
    ) {
      return {
        msg: `El cliente con id ${codigo_cliente} no existe`,
        status: 400,
      };
    }
    await Cliente.destroy({ where: { codigo_cliente: codigo_cliente } });

    return {
      msg: `El cliente con id ${codigo_cliente} a sido eliminado`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteCliente",
      error,
      status: 400,
    };
  }
};

export const _updateCliente = async (cliente: ClienteInterface) => {
  try {
    if (
      !(await Cliente.findOne({
        where: { codigo_cliente: cliente.codigo_cliente },
      }))
    ) {
      return {
        msg: `El cliente con id => ${cliente.categoria_id} no existe`,
        status: 400,
      };
    }

    await Cliente.update(cliente, {
      where: { codigo_cliente: cliente.codigo_cliente },
    });

    return {
      msg: `El cliente con id ${cliente.codigo_cliente} a sido actualizado`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateCliente",
      error,
      status: 400,
    };
  }
};
