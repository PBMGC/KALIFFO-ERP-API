import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../util/validation";

export const ValidateCreateTienda: any = [
  check("tienda")
    .exists()
    .withMessage("EL campo 'tienda' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'tienda' no debe ser vacio."),
  check("direccion")
    .exists()
    .withMessage("EL campo 'direccion' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'direccion' no debe ser vacio."),
  check("telefono")
    .exists()
    .withMessage("EL campo 'telefono' es obligatorio.")
    .not()
    .withMessage("El campo 'telefono' no debe ser vacio.")
    .isEmpty()
    .isLength({ min: 9, max: 9 })
    .withMessage("El campo 'telefono' debe tener 9 digitos."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
