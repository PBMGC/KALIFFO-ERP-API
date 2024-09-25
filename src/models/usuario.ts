import { DataTypes, Model } from "sequelize";
import { Usuario as UsuarioInteface } from "../interface/usuario";
import sequelize from "../db/connection";
import { Tienda } from "./tienda";

export interface UsuarioModel extends Model<UsuarioInteface>, UsuarioInteface {}

export const Usuario = sequelize.define<UsuarioModel>(
  "usuario",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ap_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [9, 9],
        isNumeric: true,
      },
      unique: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 8],
        isNumeric: true,
      },
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tienda_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        name: "I_dni",
        fields: ["dni"],
      },
      {
        name: "I_tiendaid",
        fields: ["tienda_id"],
      },
      {
        name: "I_rol",
        fields: ["rol"],
      },
    ],
  }
);

Usuario.belongsTo(Tienda, {
  foreignKey: "tienda_id",
});
