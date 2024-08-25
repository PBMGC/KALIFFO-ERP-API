import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../util/validation";

export const ValidateCreateUsuario: any = [
  check("nombre").exists().not().isEmpty(),
  check("ap_paterno").exists().not().isEmpty(),
  check("ap_materno").exists().not().isEmpty(),
  check("fecha_nacimiento")
    .exists()
    .not()
    .isEmpty()
    .isDate({ format: "DD-MM-YYYY", strictMode: true }),
  check("dni")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 8 })
    .withMessage("DNI debe tener 8 digitos"),
  check("telefono").exists().not().isEmpty().isLength({ min: 9, max: 9 }),
  check("contraseña").exists().not().isEmpty(),
  check("rol_id").exists(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const ValidateLogin: any = [
  check("dni").exists().not().isEmpty(),
  check("contraseña").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
