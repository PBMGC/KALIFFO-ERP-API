import { Producto as ProductoInterface } from "../interface/producto";
import { Producto } from "../models/producto";
import { ProductoDetalle } from "../models/productoDetalle";
import { ProductoTienda } from "../models/productoTienda";
import { Color } from "../models/color";
import sequelize from "../db/connection";
import { Op, literal } from "sequelize";
import { Tienda } from "../models/tienda";

export const _createProducto = async (
  producto: ProductoInterface,
  detalles: any
) => {
  try {
    const newProducto = await Producto.create(producto);

    for (const detalle of detalles) {
      const newDetalle = await ProductoDetalle.create({
        codigo: detalle.codigo,
        talla: detalle.talla,
        color_id: detalle.color_id,
        producto_id: newProducto.producto_id || 0,
      });

      for (const tienda of detalle.tiendas) {
        await ProductoTienda.create({
          stock: tienda.stock,
          productoDetalle_id: newDetalle.productoDetalle_id || 0,
          tienda_id: tienda.tienda_id,
        });
        newProducto.stockGeneral += Number(tienda.stock);
      }
    }
    await newProducto.save();

    return {
      message: newProducto,
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "error _createProducto",
      success: false,
      status: 500,
    };
  }
};

export const _getProductos = async (
  offset?: number,
  limit?: number,
  nombre?: string,
  color?: string,
  talla?: string,
  tienda_id?: number,
  antiTienda_id?: number
) => {
  try {
    const filtrosProducto: any = {};
    const filtrosProductoDetalle: any = {};
    const filtrosColores: any = {};

    if (nombre) {
      filtrosProducto.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (color) {
      filtrosColores.nombre = color;
    }

    if (talla) {
      filtrosProductoDetalle.talla = talla;
    }

    const filtros: any = {
      attributes: [
        "productoDetalle.producto.producto_id",
        "productoDetalle.producto.nombre",
        "productoDetalle.producto.precio",
        "productoDetalle.producto.descuento",
        [sequelize.fn("SUM", sequelize.col("stock")), "stock"],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("productoDetalle.talla"))
          ),
          "tallas",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn(
              "DISTINCT",
              sequelize.col("productoDetalle.color.nombre")
            )
          ),
          "colores",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("productoDetalle.codigo"))
          ),
          "codigos",
        ],
        [
          sequelize.fn(
            "GROUP_CONCAT",
            sequelize.fn("DISTINCT", sequelize.col("tienda.tienda"))
          ),
          "tiendas",
        ],
      ],
      include: [
        {
          model: ProductoDetalle,
          attributes: [],
          where: filtrosProductoDetalle,
          include: [
            {
              model: Producto,
              where: filtrosProducto,
              required: true,
              attributes: [],
            },
            { model: Color, where: filtrosColores, attributes: [] },
          ],
          required: true,
        },
        { model: Tienda, attributes: [] },
      ],
      where: {},
      group: "productoDetalle.producto_id",
      offset: offset || 0,
      limit: limit ? limit - (offset || 0) : undefined,
      raw: true,
    };

    if (tienda_id) {
      filtros.where.tienda_id = tienda_id;
    }

    if (antiTienda_id) {
      filtros.where.tienda_id = { [Op.ne]: antiTienda_id };
    }

    const items = await ProductoTienda.findAll(filtros);

    return {
      items: items.map((item: any) => ({
        ...item,
        tallas: item.tallas ? item.tallas.split(",") : [],
        colores: item.colores ? item.colores.split(",") : [],
        codigos: item.codigos ? item.codigos.split(",") : [],
        tiendas: item.tiendas ? item.tiendas.split(",") : [],
      })),
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "_getProductos",
      success: true,
      status: 200,
    };
  }
};

export const _getProducto = async (
  producto_id: number,
  tienda_id?: string,
  color?: string
) => {
  try {
    const filtroColor: any = {};

    if (color) {
      filtroColor.nombre = color;
    }

    const filtros: any = {
      attributes: [
        "productoTienda_id",
        "tienda_id",
        "tienda.tienda",
        "stock",
        "productoDetalle.codigo",
        "productoDetalle.productoDetalle_id",
        "productoDetalle.talla",
        "productoDetalle.color.nombre",
        "productoDetalle.color.codigo",
      ],
      where: {},
      include: [
        {
          model: ProductoDetalle,
          attributes: [],
          where: { producto_id: producto_id },
          include: [
            {
              model: Color,
              where: filtroColor,
              attributes: [],
            },
          ],
        },
        {
          model: Tienda,
          attributes: [],
        },
      ],

      group: ["productoTienda.productoDetalle_id"],

      raw: true,
    };

    if (tienda_id) {
      filtros.where.tienda_id = tienda_id;
    }

    const item = await Producto.findOne({
      where: { producto_id: producto_id },
    });

    if (!item) {
      return {
        message: `No se encotro producto con id => ${producto_id}`,
        success: false,
        status: 404,
      };
    }

    const detalles = await ProductoTienda.findAll(filtros);

    return {
      item: { ...item?.dataValues, detalles },
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "_getProducto",
      success: true,
      status: 200,
    };
  }
};

export const _updateProducto = async (
  producto_id: number,
  updatedProducto: ProductoInterface,
  detalles: any
) => {
  try {
    const producto = await Producto.findByPk(producto_id);

    if (!producto) {
      return {
        message: `No se encotro producto con id => ${producto_id}`,
        success: false,
        status: 404,
      };
    }

    updatedProducto.stockGeneral = 0;

    for (let detalle of detalles) {
      let newDetalle;

      if (!detalle.productoDetalle_id) {
        newDetalle = await ProductoDetalle.create({
          codigo: detalle.codigo,
          talla: detalle.talla,
          color_id: detalle.color_id,
          producto_id: producto_id,
        });
      } else {
        newDetalle = await ProductoDetalle.findByPk(detalle.productoDetalle_id);

        if (newDetalle) {
          await newDetalle.update({
            codigo: detalle.codigo,
            talla: detalle.talla,
            color_id: detalle.color_id,
          });
        }
      }

      for (const tienda of detalle.tiendas) {
        let productoTienda = await ProductoTienda.findOne({
          where: {
            productoDetalle_id: newDetalle?.productoDetalle_id,
            tienda_id: tienda.tienda_id,
          },
        });

        if (productoTienda) {
          await productoTienda.update({
            stock: tienda.stock,
          });
        } else {
          await ProductoTienda.create({
            stock: tienda.stock,
            productoDetalle_id: newDetalle?.productoDetalle_id || 0,
            tienda_id: tienda.tienda_id,
          });
        }

        updatedProducto.stockGeneral += Number(tienda.stock);
      }
    }

    await producto.update(updatedProducto);

    return {
      message: producto,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      message: "error _updateProducto",
      success: false,
      status: 500,
    };
  }
};

export const _loseProductos = async (tienda_id: string) => {
  try {
    const consulta = await sequelize.query(`
      
SELECT DISTINCT p.producto_id, p.nombre
FROM productoTienda pt
INNER JOIN productoDetalle pd ON pd.productoDetalle_id = pt.productoDetalle_id
INNER JOIN producto p ON p.producto_id = pd.producto_id
LEFT JOIN (
    SELECT p2.producto_id
    FROM productoTienda pt2
    INNER JOIN productoDetalle pd2 ON pd2.productoDetalle_id = pt2.productoDetalle_id
    INNER JOIN producto p2 ON p2.producto_id = pd2.producto_id
    WHERE pt2.tienda_id = ${tienda_id}
) AS excluidos ON excluidos.producto_id = p.producto_id
WHERE pt.tienda_id != ${tienda_id} AND excluidos.producto_id IS NULL
group by p.producto_id;
`);

    return {
      items: consulta[0],
      status: 202,
    };
  } catch (error) {
    console.error(error); // Para ayudar a depurar errores
    return {
      message: "_loseProductos",
      status: 404,
    };
  }
};


//SQL PURO
export const _getColoresProducto = async (tienda_id: number) => {
  try {
    const data = await ProductoDetalle.findAll({
      include: [{
        model: Color,
      }],
    });

    return {
      data,
      success: true,
      status: 200,
    };
  } catch (error) {
      console.log(error)
    return {
      message: error,
      success: false,
      status: 500,
    };
  }
};