import express from "express";
import cors from "cors";
import { router } from "../routes";
import cookieParser from "cookie-parser";
import { initCronJobs } from "../job/correo";
import { initBD } from "../util/initBD";
import { scriptInicio } from "../util/script";
import { initProcedure } from "../util/initProcedure";

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
      await scriptInicio();
      initProcedure()
    } catch (error) {
      console.log(error);
    }
  }
}

export default Serve;