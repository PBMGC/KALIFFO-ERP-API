import express from "express";
import cors from "cors";
import { router } from "../routes"; // Importa las rutas principales
import cookieParser from "cookie-parser"; // Middleware para manejar cookies
import { initCronJobs } from "../job/correo"; // Inicializa tareas programadas (cron jobs)
import { initBD } from "../util/initBD"; // Inicializa la base de datos
import morgan from "morgan"; // Middleware para registrar las solicitudes HTTP
import { initSeeders } from "../seeders/initSeeders"; // Inicializa datos de prueba (seeders)
import { initTriggers } from "../db/triggers/initTrigger"; // Configura triggers en la base de datos
import { initSp } from "../db/sp/initSp"; // Configura procedimientos almacenados en la base de datos

class Serve {
  app: express.Application; // Instancia de la aplicación Express
  PORT: string; // Puerto donde se ejecutará el servidor

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3000"; // Asigna el puerto del entorno o 3000 por defecto

    this.midddlewares(); // Configura los middlewares
    this.route(); // Configura las rutas
    this.db().then(() => {
      // Inicializa la base de datos y otros procesos
      this.initCron(); // Inicia las tareas programadas
      this.listen(); // Inicia el servidor
    });
  }

  // Método para escuchar el puerto configurado
  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Ejecutándose en el puerto ${this.PORT}`);
    });
  }

  // Configuración de middlewares
  midddlewares() {
    this.app.use(express.json()); // Middleware para parsear JSON
    this.app.use(
      cors({
        origin: "http://localhost:5173", // Permite solicitudes desde este origen
        credentials: true, // Habilita el uso de credenciales (cookies, etc.)
      })
    );

    this.app.use(cookieParser()); // Middleware para manejar cookies
    this.app.use(morgan("dev")); // Middleware para registrar solicitudes HTTP
  }

  // Configuración de las rutas
  route() {
    this.app.use(router); // Usa las rutas definidas en `../routes`
  }

  // Inicialización de tareas programadas
  initCron() {
    initCronJobs(); // Llama a la función para inicializar las tareas programadas
  }

  // Configuración de la base de datos
  async db() {
    try {
      await initBD(); // Inicializa la conexión a la base de datos
      await initTriggers(); // Configura los triggers de la base de datos
      await initSeeders(); // Inicializa datos de prueba (seeders)
      await initSp(); // Configura procedimientos almacenados
    } catch (error) {
      console.log(error); // Muestra errores en la consola
    }
  }
}

export default Serve;
