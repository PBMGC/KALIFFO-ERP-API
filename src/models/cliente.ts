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
    cliente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.STRING,
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
    estado: {
      type: DataTypes.STRING,
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

Cliente.belongsTo(Categoria, {
  foreignKey: "categoria_id",
});
