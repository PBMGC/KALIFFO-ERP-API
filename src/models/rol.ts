import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Rol as RolInterface } from "../interface/rol";

export interface RolModel extends Model<RolInterface>, RolInterface {}

export const Rol = sequelize.define<RolModel>(
  "rol",
  {
    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
