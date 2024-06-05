import { DataTypes, Model } from "sequelize";
import { DetalleVenta as DetalleVentaInterface } from "../interface/detalleVenta";
import sequelize from "../db/connection";
import { Producto } from "./producto";
import { Venta } from "./venta";

export interface DetalleVentaModel
  extends Model<DetalleVentaInterface>,
    DetalleVentaInterface {}

export const DetalleVenta = sequelize.define<DetalleVentaModel>(
  "boleta",
  {
    detalleVenta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioTotal: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

DetalleVenta.belongsTo(Venta, {
  foreignKey: "codigo",
});

DetalleVenta.belongsTo(Producto, {
  foreignKey: "producto_id",
});
