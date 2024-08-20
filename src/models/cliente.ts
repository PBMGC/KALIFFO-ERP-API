import { DataTypes, Model } from "sequelize";
import { Cliente as ClienteInterface } from "../interface/cliente";
import sequelize from "../db/connection";
import { Categoria } from "./categoria";

export interface ClienteModel
  extends Model<ClienteInterface>,
    ClienteInterface {}

export const Cliente = sequelize.define<ClienteModel>(
  "cliente",
  {
    codigo_cliente: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
