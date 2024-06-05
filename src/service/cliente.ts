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

export const _getCliente = async (cliente_id: string) => {
  const item = await Cliente.findOne({ where: { cliente_id: cliente_id } });

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
        where: { nombre: cliente.nombre, apellido: cliente.apellido },
      })
    ) {
      return {
        msg: "Este cliente ya existe",
        status: 400,
      };
    }

    await Cliente.create(cliente);

    return {
      msg: `Cliente ${cliente.nombre} ${cliente.apellido} a sido creado`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createCliente",
      error,
      status: 400,
    };
  }
};

export const _deleteCliente = async (cliente_id: string) => {
  try {
    if (!(await Cliente.findOne({ where: { cliente_id: cliente_id } }))) {
      return {
        msg: `El cliente con id ${cliente_id} no existe`,
        status: 400,
      };
    }
    await Cliente.destroy({ where: { cliente_id: cliente_id } });

    return {
      msg: `El cliente con id ${cliente_id} a sido eliminado`,
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
      !(await Cliente.findOne({ where: { cliente_id: cliente.cliente_id } }))
    ) {
      return {
        msg: `El cliente con id => ${cliente.categoria_id} no existe`,
        status: 400,
      };
    }

    await Cliente.update(cliente, {
      where: { cliente_id: cliente.cliente_id },
    });

    return {
      msg: `El cliente con id ${cliente.cliente_id} a sido actualizado`,
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
