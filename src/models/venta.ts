import { DataTypes, Model } from "sequelize";
import { Venta as VentaInterface } from "../interface/venta";
import sequelize from "../db/connection";
import { Cliente } from "./cliente";

export interface VentaModel extends Model<VentaInterface>, VentaInterface {}

export const Venta = sequelize.define<VentaModel>(
  "venta",
  {
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    metodoVenta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoVenta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctdTotal: {
      type: DataTypes.INTEGER,
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
    fecha: {
      type: DataTypes.DATE,
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

Venta.belongsTo(Cliente, {
  foreignKey: "cliente_id",
});
