import { DataTypes, Model } from "sequelize";
import { Pago as PagoInterface } from "../interface/pago";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";

export interface PagoModel extends Model<PagoInterface>, PagoInterface {}

export const Pago = sequelize.define<PagoModel>(
  "pago",
  {
    pago_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    montoPagado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    montoFaltante: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        name: "I_fecha",
        fields: ["fecha"],
      },
      {
        name: "I_estado",
        fields: ["estado"],
      },
      {
        name: "I_usuarioid",
        fields: ["usuario_id"],
      },
    ],
  }
);

Pago.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});
