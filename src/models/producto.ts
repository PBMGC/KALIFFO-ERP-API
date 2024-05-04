import { DataTypes, Model } from "sequelize";
import { Producto as ProductoInterface } from "../interface/producto";
import sequelize from "../db/connection";
import { Categoria } from "./categoria";

export interface ProductoModel
  extends Model<ProductoInterface>,
    ProductoInterface {}

export const Producto = sequelize.define<ProductoModel>(
  "producto",
  {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Producto.belongsTo(Categoria, {
  foreignKey: "categoria_id",
});
