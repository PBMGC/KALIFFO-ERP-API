import { DataTypes, Model } from "sequelize";
import { Usuario as UsuarioInteface } from "../interface/usuario";
import sequelize from "../db/connection";
import { Tienda } from "./tienda";
import { Puesto } from "./puesto";

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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tienda_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puesto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Usuario.belongsTo(Tienda, {
  foreignKey: "tienda_id",
});

Usuario.belongsTo(Puesto, {
  foreignKey: "puesto_id",
});
