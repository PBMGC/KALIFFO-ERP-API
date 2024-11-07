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
import { exec } from "child_process";

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
      this.showDancingAnimals();
      this.runCurlCommand(); // Llama a la función para ejecutar el comando curl
    });
  }

  runCurlCommand() {
    exec("curl http://parrot.live", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar curl: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Salida de curl:\n${stdout}`);
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

  showDancingAnimals() {
    const catFrames = [
      `  /\\     /\\   \n /  \\___/  \\  \n(  o   o   ) \n \\    ^    /  \n  \\_______/   `,
      `  /\\     /\\   \n /  \\___/  \\  \n(  o   o   ) \n   \\  ~  /    \n    \\_____/    `,
      `  /\\     /\\   \n /  \\___/  \\  \n(  o   o   ) \n    \\_____/    \n    /      \\    `,
      `  /\\     /\\   \n /  \\___/  \\  \n(  o   o   ) \n  /   ^   \\    \n /_________\\   `,
    ];

    const dogFrames = [
      `   / \\___/ \\  \n  (  o   o  ) \n  /    ~    \\ \n /   /\\_/\\   \\ \n/___/     \\___\\`,
      `   / \\___/ \\  \n  (  o   o  ) \n  /    ~    \\ \n /   /\\_/\\   \\ \n/___/     \\___\\`,
      `   / \\___/ \\  \n  (  o   o  ) \n  /    ~    \\ \n /   /\\_/\\   \\ \n/___/     \\___\\`,
      `   / \\___/ \\  \n  (  o   o  ) \n  /    ~    \\ \n /   /\\_/\\   \\ \n/___/     \\___\\`,
    ];

    let i = 0;
    let isCat = true;

    // setInterval(() => {
    //   console.clear();
    //   if (isCat) {
    //     console.log("🐱 Gato bailando en el servidor 🕺:");
    //     console.log(catFrames[i]);
    //   } else {
    //     console.log("🐶 Perro bailando en el servidor 🕺:");
    //     console.log(dogFrames[i]);
    //   }
    //   i = (i + 1) % Math.max(catFrames.length, dogFrames.length);
    //   isCat = !isCat;
    // }, 500);
  }
}

export default Serve;

//mejorar la conclucion
//invocacion de los anexos
//validaciones en las post
//terminar de cambiar la bd
//correo
//interface
