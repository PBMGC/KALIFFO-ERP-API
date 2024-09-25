import { DataTypes, Model } from "sequelize";
import { DetalleFactura as DetalleFacturaInterface } from "../interface/detalleFactura";
import sequelize from "../db/connection";
import { Factura } from "./factura";
import { Producto } from "./producto";

export interface DetalleFacturaModel
  extends Model<DetalleFacturaInterface>,
    DetalleFacturaInterface {}

export const DetalleFactura = sequelize.define<DetalleFacturaModel>(
  "detalleFactura",
  {
    detalleFactura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    importe: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

DetalleFactura.belongsTo(Factura, {
  foreignKey: "factura_id",
});

DetalleFactura.belongsTo(Producto, {
  foreignKey: "producto_id",
});
