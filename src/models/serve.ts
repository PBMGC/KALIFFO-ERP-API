import express from "express";
import cors from "cors";
import { router } from "../routes";

class Serve {
  app: express.Application;
  PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "";

    this.listen();
    this.midddlewares();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutandose en el puerto ${this.PORT}`);
    });
  }

  midddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  route() {
    this.app.use(router);
  }
}

export default Serve;
