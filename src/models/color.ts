import { DataTypes, Model } from "sequelize";
import { Color as ColorInterface } from "../interface/color";
import sequelize from "../db/connection";

export interface ColorModel extends Model<ColorInterface>, ColorInterface {}

export const Color = sequelize.define<ColorModel>(
  "color",
  {
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
