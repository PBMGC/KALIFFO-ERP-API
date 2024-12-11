import express from "express";
import cors from "cors";
import { router } from "../routes";
import cookieParser from "cookie-parser";
import { initCronJobs } from "../job/correo";
import { initBD } from "../util/initBD";
import morgan from "morgan";
import { initSeeders } from "../seeders/initSeeders";
import { initTriggers } from "../db/triggers/initTrigger";
import { initSp } from "../db/sp/initSp";
import { ts } from "../util/tr";

class Serve {
  app: express.Application;
  PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3000";

    this.midddlewares();
    this.route();
    this.db().then(() => {
      this.initCron();
      this.listen();
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutándose en el puerto ${this.PORT}`);
    });
  }

  midddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
  }

  route() {
    this.app.use(router);
  }

  initCron() {
    initCronJobs();
  }

  async db() {
    try {
      ts();
      await initBD();
      await initTriggers();
      await initSeeders();
      await initSp();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Serve;

//sedders de almacen_producto
//sedders productos arreglar
//ventas validaciones

//movimiento_almacen_tienda movimiento_tienda_tienda => pablo
//001-N121212 => pablo

//createProductoCompleto
//movimiento

//codigo

//movimiento

//ventas
