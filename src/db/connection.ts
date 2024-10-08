import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      port: Number(process.env.DB_PORT) || 3306,
    });

    return connection;
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
};

export default connection;
