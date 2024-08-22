import { Categoria as CategoriaInterface } from "../interface/categoria";
import { Categoria } from "../models/categoria";

export const _getCategorias = async (tipo: string) => {
  try {
    const items = await Categoria.findAll();
    return {
      items,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getCategorias",
      error,
      succes: false,
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
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _getCategoria",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _createCategoria = async (categoria: CategoriaInterface) => {
  try {
    if (
      await Categoria.findOne({
        where: { categoria: categoria.categoria },
      })
    ) {
      return {
        msg: "Esta Categoria ya existe",
        succes: false,
        status: 400,
      };
    }

    await Categoria.create(categoria);

    return {
      msg: `Categoria creada => ${categoria.categoria}`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _createCategoria",
      error,
      succes: false,
      status: 400,
    };
  }
};

export const _deleteCategoria = async (categoria_id: string) => {
  try {
    if (!(await Categoria.findOne({ where: { categoria_id: categoria_id } }))) {
      return {
        msg: `no exite la categoria con id ${categoria_id}`,
        succes: false,
        status: 400,
      };
    }

    await Categoria.destroy({ where: { categoria_id: categoria_id } });

    return {
      msg: `La categoría con ID ${categoria_id} ha sido eliminada correctamente`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _deleteCategoria",
      error,
      succes: false,
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
        succes: false,
        status: 400,
      };
    }
    await Categoria.update(categoria, {
      where: { categoria_id: categoria.categoria_id },
    });

    return {
      msg: `Categoria con id ${categoria.categoria_id} a sido actualizada`,
      succes: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "error _updateCategoria",
      error,
      succes: false,
      status: 400,
    };
  }
};
