import { Model } from "sequelize";
import { Factura as FacturaInterface } from "../interface/factura";
import sequelize from "../db/connection";

export interface FacturaModel
  extends Model<FacturaInterface>,
    FacturaInterface {}

export const Factura = sequelize.define;
