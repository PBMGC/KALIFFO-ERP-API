import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Middleware para validar los resultados de las reglas de validación definidas
const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    res.status(422).json({ errors: error.array() });
  }
};

// Exporta la función de validación para usarla en rutas o controladores
export { validateResult };
