import { Categoria as CategoriaInterface } from "../interface/categoria";
import { Categoria } from "../models/categoria";

export const _getCategorias = async (tipo: string) => {
  try {
    const items = await Categoria.findAll({ where: { tipo: tipo } });
    return {
      items,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getCategorias",
      error,
      status: 400,
    };
  }
};

export const _getCategoria = async (categoria_id: string) => {
  try {
    const item = await Categoria.findOne({
      where: { categoria_id: categoria_id },
    });
    return {
      item,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getCategoria",
      error,
      status: 400,
    };
  }
};

export const _createCategoria = async (categoria: CategoriaInterface) => {
  try {
    if (
      await Categoria.findOne({
        where: { tipo: categoria.tipo, categoria: categoria.categoria },
      })
    ) {
      return {
        msg: "Esta Categoria ya existe",
        status: 400,
      };
    }

    await Categoria.create(categoria);

    return {
      msg: `Categoria de ${categoria.tipo} creada => ${categoria.categoria}`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createCategoria",
      error,
      status: 400,
    };
  }
};

export const _deleteCategoria = async (categoria_id: string) => {
  try {
    if (!(await Categoria.findOne({ where: { categoria_id: categoria_id } }))) {
      return {
        msg: `no exite la categoria con id ${categoria_id}`,
        status: 400,
      };
    }

    await Categoria.destroy({ where: { categoria_id: categoria_id } });

    return {
      msg: `La categoría con ID ${categoria_id} ha sido eliminada correctamente`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteCategoria",
      error,
      status: 400,
    };
  }
};

export const _updateCategoria = async (categoria: CategoriaInterface) => {
  try {
    if (
      !(await Categoria.findOne({
        where: { categoria_id: categoria.categoria_id },
      }))
    ) {
      return {
        msg: `La categoria con id => ${categoria.categoria_id} no existe`,
        status: 400,
      };
    }
    await Categoria.update(categoria, {
      where: { categoria_id: categoria.categoria_id },
    });

    return {
      msg: `Categoria tipo ${categoria.tipo} con id ${categoria.categoria_id} a sido actualizada`,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateCategoria",
      error,
      status: 400,
    };
  }
};
