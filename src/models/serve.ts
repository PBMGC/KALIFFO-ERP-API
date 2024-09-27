import express from "express";
import cors from "cors";
import { router } from "../routes";
import cookieParser from "cookie-parser";
import { scriptInicio } from "../util/script";
import { initProcedure } from "../util/initProcedure";
import { initBD } from "../util/initBD";

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
      await initBD();
      await scriptInicio();
      await initProcedure();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Serve;
