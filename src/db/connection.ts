import mysql from "mysql2/promise"; // Importa el paquete mysql2 con soporte para promesas.
import dotenv from "dotenv"; // Importa dotenv para cargar las variables de entorno desde un archivo .env.

dotenv.config(); // Configura dotenv para que lea las variables de entorno.

const connection = async () => {
  try {
    // Intenta establecer una conexión con la base de datos.
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "", // Dirección del host de la base de datos, por defecto vacío si no se define.
      user: process.env.DB_USER || "", // Usuario para la conexión, por defecto vacío.
      password: process.env.DB_PASSWORD || "", // Contraseña para el usuario, por defecto vacío.
      database: process.env.DB_DATABASE || "", // Nombre de la base de datos, por defecto vacío.
      port: Number(process.env.DB_PORT) || 3306, // Puerto de la base de datos, 3306 es el valor predeterminado para MySQL.
    });

    return connection; // Retorna la conexión establecida.
  } catch (error) {
    // Captura y muestra un error si la conexión falla.
    console.error("Error al conectarse a la base de datos:", error);
  }
};

export default connection; // Exporta la función para usarla en otros módulos.
