import { borrarBD, initBD } from "./initBD";

const resetDB = async () => {
  try {
    await borrarBD();
    await initBD();
    console.log("La base de datos se ha reiniciado con éxito.");
  } catch (error) {
    console.error("Error al reiniciar la base de datos:", error);
  }
};

resetDB();
