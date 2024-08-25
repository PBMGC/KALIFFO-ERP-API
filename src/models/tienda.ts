import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Tienda as TiendaInterface } from "../interface/tienda";

export interface TiendaModel extends Model<TiendaInterface>, TiendaInterface {}

export const Tienda = sequelize.define<TiendaModel>(
  "tienda",
  {
    tienda_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tienda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "activo",
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
