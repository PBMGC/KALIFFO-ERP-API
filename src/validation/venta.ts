import { check } from "express-validator";
import { validateResult } from "../util/validation";
import { NextFunction, Request, Response } from "express";

export const ValidateCreateColor: any = [
  check("codigo")
    .exists()
    .withMessage("EL campo 'codigo' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'codigo' no debe ser vacio."),
  check("tipoVenta")
    .exists()
    .withMessage("EL campo 'tipoVenta' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'tipoVenta' no debe ser vacio."),
  check("tipoVenta")
    .exists()
    .withMessage("EL campo 'tipoVenta' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'tipoVenta' no debe ser vacio."),
  check("tipoVenta")
    .exists()
    .withMessage("EL campo 'tipoVenta' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'tipoVenta' no debe ser vacio."),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
