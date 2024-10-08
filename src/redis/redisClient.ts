// redisClient.ts
import { createClient } from "redis";

// Crear el cliente Redis
const redisClient = createClient();

// Manejar errores
redisClient.on("error", (err) => {
  console.error("Error de conexión con Redis", err);
});

// Conectar a Redis
(async () => {
  try {
    await redisClient.connect();
    console.log("Conectado a Redis");
  } catch (err) {
    console.error("Error de conexión:", err);
  }
})();

export default redisClient;
