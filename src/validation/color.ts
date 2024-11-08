import { check } from "express-validator";
import { validateResult } from "../util/validation";
import { NextFunction, Request, Response } from "express";

export const ValidateCreateColor: any = [
  check("nombre")
    .exists()
    .withMessage("EL campo 'nombre' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'nombre' no debe ser vacio."),
  check("codigo")
    .exists()
    .withMessage("EL campo 'codigo' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'codigo' no debe ser vacio."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
