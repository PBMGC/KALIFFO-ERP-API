import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../util/validation";
import { query } from "../util/query";

export const ValidateCreateUsuario: any = [
  check("nombre")
    .exists()
    .withMessage("EL campo 'nombre' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("Este campo 'nombre' no debe ser vacio."),

  check("ap_paterno")
    .exists()
    .withMessage("EL campo 'ap_paterno' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'ap_paterno' no debe ser vacio."),

  check("ap_materno")
    .exists()
    .withMessage("EL campo 'ap_materno' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'ap_materno' no debe ser vacio."),

  check("fecha_nacimiento")
    .exists()
    .withMessage("EL campo 'fecha_nacimiento' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'fecha_nacimiento' no debe ser vacio.")
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("Formato de fecha 'YYYY-MM-DD'"),

  check("dni")
    .exists()
    .withMessage("EL campo 'dni' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'dni' no debe ser vacio.")
    .isLength({ min: 8, max: 8 })
    .withMessage("El campo 'dni' debe tener 8 digitos"),

  check("telefono")
    .exists()
    .withMessage("EL campo 'telefono' es obligatorio.")
    .not()
    .withMessage("El campo 'telefono' no debe ser vacio.")
    .isEmpty()
    .isLength({ min: 9, max: 9 })
    .withMessage("El campo 'telefono' debe tener 9 digitos."),

  check("rol").exists().withMessage("EL campo 'rol' es obligatorio."),

  check("tienda_id")
    .optional()
    .custom(async (value) => {
      if (value) {
        const result = (await query(
          `SELECT * FROM tienda WHERE tienda_id = ?`,
          [value]
        )) as any;

        if (result.data.length === 0) {
          throw new Error("Esta tienda no existe.");
        }
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const ValidateLogin: any = [
  check("dni")
    .exists()
    .withMessage("EL campo 'dni' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'dni' no debe ser vacio."),
  check("contraseña")
    .exists()
    .withMessage("EL campo 'contraseña' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'contraseña' no debe ser vacio."),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
