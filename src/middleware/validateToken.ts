import { NextFunction, Request, Response } from "express"; // Importa tipos de Express
import jwt from "jsonwebtoken"; // Biblioteca para trabajar con JWT
import dotenv from "dotenv"; // Manejo de variables de entorno
import { DecodedToken } from "../interface/decodeToken"; // Interfaz para tipar el token decodificado

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Middleware para validar tokens y roles
export const validateToken = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Obtiene el token de las cookies
    const tokenCookie = req.cookies.token;

    // Si no existe el token, responde con un error
    if (!tokenCookie) {
      return res.status(400).json({
        msg: "No se encontró token", // Mensaje de error
        success: false, // Indica que la operación no fue exitosa
        status: 401, // Código de estado HTTP
      });
    }

    try {
      // Verifica y decodifica el token usando la clave secreta
      const decodedToken = jwt.verify(
        tokenCookie, // Token de las cookies
        process.env.SECRET_KEY || "password" // Clave secreta para verificar el token
      ) as DecodedToken;

      // Almacena el token decodificado en la solicitud
      req.decodeToken = decodedToken;

      // Verifica si el rol del usuario está permitido para la ruta
      if (roles && !roles.includes(decodedToken.rol)) {
        return res.status(403).json({
          msg: "No tienes permisos para acceder a este recurso", // Mensaje de error
          success: false, // Indica que la operación no fue exitosa
          status: 403, // Código de estado HTTP
        });
      }

      // Si el token es válido y el rol es permitido, continúa con la ejecución
      next();
    } catch (error) {
      // Si hay un error al verificar el token, responde con un error
      res.status(401).json({
        msg: "Token no válido", // Mensaje de error
        success: false, // Indica que la operación no fue exitosa
        error, // Detalles del error
      });
    }
  };
};
