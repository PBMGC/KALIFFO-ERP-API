import { DataTypes, Model } from "sequelize";
import { Categoria as CategoriaInterface } from "../interface/categoria";
import sequelize from "../db/connection";

export interface CategoriaModel
  extends Model<CategoriaInterface>,
    CategoriaInterface {}

export const Categoria = sequelize.define<CategoriaModel>(
  "categoria",
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
