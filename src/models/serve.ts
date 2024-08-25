import express from "express";
import cors from "cors";
import { router } from "../routes";

import { Tienda } from "./tienda";
import { Usuario } from "./usuario";
import { Horario } from "./horario";
import cookieParser from "cookie-parser";
import { Rol } from "./rol";
import { Incidencia } from "./incidencia";
import { scriptInicio } from "../util/script";

class Serve {
  app: express.Application;
  PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "";

    this.listen();
    this.midddlewares();
    this.route();
    this.db();
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
      await Rol.sync();
      await Tienda.sync();
      await Usuario.sync();
      await Horario.sync();
      await Incidencia.sync();
      scriptInicio();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Serve;
