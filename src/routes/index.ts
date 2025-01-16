// Importamos el Router de Express y el módulo 'fs' para trabajar con el sistema de archivos
import { Router } from "express";
import { readdirSync } from "fs";

// Creamos una instancia del router de Express
const router = Router();

// Definimos el directorio actual en el que estamos trabajando, en este caso el directorio donde se encuentra este archivo
const PATH_ROUTER = `${__dirname}`;

// Función auxiliar para limpiar el nombre de los archivos (eliminando la extensión del archivo)
const cleanFileName = (fileName: string) => {
  // Partimos el nombre del archivo por el punto (.) y tomamos la primera parte (antes de la extensión)
  const file = fileName.split(".").shift();
  return file; // Retornamos el nombre limpio del archivo
};

// Leemos todos los archivos del directorio especificado
readdirSync(PATH_ROUTER).filter((fileName) => {
  // Limpiamos el nombre del archivo (eliminando la extensión)
  const cleanName = cleanFileName(fileName);
  // Si el archivo no es el archivo 'index' (que es el archivo actual que contiene este código),
  // entonces lo importamos dinámicamente
  if (cleanName !== "index") {
    // Usamos la función 'import' para importar el archivo de forma dinámica y luego agregar las rutas
    import(`./${cleanName}`).then((m) => {
      // Usamos el router del archivo importado y lo asignamos a la ruta correspondiente
      router.use(`/${cleanName}`, m.router);
    });
  }
});

// Exportamos el router principal que ahora tiene todas las rutas importadas
export { router };
