import { DataTypes, Model } from "sequelize";
import { ProductoDetalle as ProductoDetalleInterface } from "../interface/productoDetalle";
import sequelize from "../db/connection";
import { Producto } from "./producto";
import { Tienda } from "./tienda";

export interface ProductoDetalleModel
  extends Model<ProductoDetalleInterface>,
    ProductoDetalleInterface {}

export const ProductoDetalle = sequelize.define<ProductoDetalleModel>(
  "productoDetalle",
  {
    productoDetalle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tienda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

ProductoDetalle.belongsTo(Producto, {
  foreignKey: "producto_id",
});

ProductoDetalle.belongsTo(Tienda, {
  foreignKey: "tienda_id",
});
