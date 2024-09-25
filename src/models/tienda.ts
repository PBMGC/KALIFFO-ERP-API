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
      unique: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [9, 9],
        isNumeric: true,
      },
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
    indexes: [
      {
        name: "I_tienda",
        fields: ["tienda"],
      },
      {
        name: "I_telefono",
        fields: ["telefono"],
      },
      {
        name: "I_estado",
        fields: ["estado"],
      },
    ],
  }
);
