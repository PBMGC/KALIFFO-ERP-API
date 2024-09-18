import express from "express";
import cors from "cors";
import { router } from "../routes";

import { Tienda } from "./tienda";
import { Usuario } from "./usuario";
import { Horario } from "./horario";
import cookieParser from "cookie-parser";
import { Incidencia } from "./incidencia";
import { scriptInicio } from "../util/script";
import { Producto } from "./producto";
import { ProductoDetalle } from "./productoDetalle";
import { ProductoTienda } from "./productoTienda";
import { Color } from "./color";

class Serve {
  app: express.Application;
  PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3000";

    this.midddlewares();
    this.route();
    this.db().then(() => this.listen());
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  midddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  route() {
    this.app.use(router);
  }

  async db() {
    try {
      await Tienda.sync();
      await Usuario.sync();
      await Horario.sync();
      await Incidencia.sync();
      await Producto.sync();
      await Color.sync();

      await ProductoDetalle.sync();
      await ProductoTienda.sync();
      scriptInicio();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Serve;
