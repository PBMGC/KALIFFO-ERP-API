import { DataTypes, Model } from "sequelize";
import { ProductoDetalle as ProductoDetalleInterface } from "../interface/productoDetalle";
import sequelize from "../db/connection";
import { Producto } from "./producto";
import { Color } from "./color";

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
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

ProductoDetalle.belongsTo(Producto, {
  foreignKey: "producto_id",
});

ProductoDetalle.belongsTo(Color, {
  foreignKey: "color_id",
});
