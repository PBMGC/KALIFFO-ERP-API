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
      unique:true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes:[
      {
        name:"I_nombre",
        fields:["nombre"]
      },
      {
        name:"I_codigo",
        fields:["codigo"]
      }
    ]
  }
);
