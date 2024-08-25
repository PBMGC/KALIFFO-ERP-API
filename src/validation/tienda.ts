import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../util/validation";

export const ValidateCreateTienda: any = [
  check("tienda").exists().not().isEmpty(),
  check("direccion").exists().not().isEmpty(),
  check("telefono")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 9, max: 9 })
    .withMessage("El telefono debe tener 9 numeros"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
