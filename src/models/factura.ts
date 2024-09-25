import { DataTypes, Model } from "sequelize";
import { Factura as FacturaInterface } from "../interface/factura";
import sequelize from "../db/connection";

export interface FacturaModel
  extends Model<FacturaInterface>,
    FacturaInterface {}

export const Factura = sequelize.define<FacturaModel>(
  "factura",
  {
    factura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nroFactura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaEmision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 11],
        isNumeric: true,
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [9, 9],
        isNumeric: true,
      },
    },
    subTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    igv: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
