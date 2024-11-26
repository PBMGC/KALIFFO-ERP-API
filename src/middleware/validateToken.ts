import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { DecodedToken } from "../interface/decodeToken";

dotenv.config();

export const validateToken = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const tokenCookie = req.cookies.token;

    if (!tokenCookie) {
      return res.status(401).json({
        msg: "No se encontró token",
        success: false,
        status: 401,
      });
    }

    try {
      const decodedToken = jwt.verify(
        tokenCookie,
        process.env.SECRET_KEY || "contraseña"
      ) as DecodedToken;

      req.decodeToken = decodedToken;

      if (roles && !roles.includes(decodedToken.rol)) {
        return res.status(403).json({
          msg: "No tienes permisos para acceder a este recurso",
          success: false,
          status: 403,
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token no válido",
        success: false,
        error,
      });
    }
  };
};
