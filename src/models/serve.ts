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
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  midddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
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

//lavanderia
//crud basico
//trigger lote cantidad
//10 - 4 = 6
