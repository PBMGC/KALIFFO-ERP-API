import { DataTypes, Model } from "sequelize";
import { Producto as ProductoInterface } from "../interface/producto";
import sequelize from "../db/connection";

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
      unique: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stockGeneral: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        name: "I_nombre",
        fields: ["nombre"],
      },
    ],
  }
);
