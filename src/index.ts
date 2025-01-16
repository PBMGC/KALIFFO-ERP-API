// Importa las dependencias necesarias
import Serve from "./models/serve"; // Clase principal para iniciar el servidor
import dotenv from "dotenv"; // Manejo de variables de entorno

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// Crea una instancia del servidor
const serve = new Serve();
