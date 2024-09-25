import { DataTypes, Model } from "sequelize";
import { ProductoTienda as ProductoTiendaInterface } from "../interface/productoTienda";
import sequelize from "../db/connection";
import { ProductoDetalle } from "./productoDetalle";
import { Tienda } from "./tienda";

export interface ProductoTiendaModel
  extends Model<ProductoTiendaInterface>,
    ProductoTiendaInterface {}

export const ProductoTienda = sequelize.define<ProductoTiendaModel>(
  "productoTienda",
  {
    productoTienda_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productoDetalle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tienda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes:[
      {
        name:"I_stock",
        fields:["stock"]
      },
      {
        name:"I_productoDetalleid",
        fields:["productoDetalle_id"]
      },
      {
        name:"I_tiendaid",
        fields:["tienda_id"]
      }
    ]
  }
);

ProductoTienda.belongsTo(ProductoDetalle, {
  foreignKey: "productoDetalle_id",
});

ProductoTienda.belongsTo(Tienda, {
  foreignKey: "tienda_id",
});
