import { borrarBD, initBD } from "./initBD";

// Función para reiniciar la base de datos llamando a las funciones de borrar e inicializar
const resetDB = async () => {
  try {
    await borrarBD();
    await initBD();
    console.log("La base de datos se ha reiniciado con éxito.");
  } catch (error) {
    console.error("Error al reiniciar la base de datos:", error);
  }
};

// Llamada a la función para reiniciar la base de datos al ejecutar este script
resetDB();
