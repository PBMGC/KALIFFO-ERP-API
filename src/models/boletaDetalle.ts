import { DataTypes, Model } from "sequelize";
import { DetalleBoleta as DetalleBoletaInterface } from "../interface/detalleBoleta";
import sequelize from "../db/connection";
import { Cliente } from "./cliente";
import { Boleta } from "./boleto";
import { Producto } from "./producto";

export interface DetalleBoletaModel
  extends Model<DetalleBoletaInterface>,
    DetalleBoletaInterface {}

export const DetalleBoleta = sequelize.define<DetalleBoletaModel>(
  "boleta",
  {
    detalleBoleta_id: {
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
    boleta_id: {
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
  }
);

DetalleBoleta.belongsTo(Boleta, {
  foreignKey: "boleta_id",
});

DetalleBoleta.belongsTo(Producto, {
  foreignKey: "producto_id",
});
