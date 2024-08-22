import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Puesto as PuestoInterface } from "../interface/puesto";

export interface PuestoModel extends Model<PuestoInterface>, PuestoInterface {}

export const Puesto = sequelize.define<PuestoModel>(
  "puesto",
  {
    puesto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
