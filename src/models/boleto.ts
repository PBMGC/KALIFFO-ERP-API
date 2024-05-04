import { DataTypes, Model } from "sequelize";
import { Boleta as BoletaInterface } from "../interface/boleta";
import sequelize from "../db/connection";
import { Cliente } from "./cliente";

export interface BoletaModel extends Model<BoletaInterface>, BoletaInterface {}

export const Boleta = sequelize.define<BoletaModel>(
  "boleta",
  {
    boleta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    precioBruto: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    igv: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    precioTotal: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Boleta.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});
