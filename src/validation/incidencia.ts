import { check } from "express-validator";
import { query } from "../util/query";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../util/validation";

export const ValidateCreateIncidencia: any = [
  check("trabajador_id")
    .exists()
    .withMessage("EL campo 'trabajador_id' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("EL campo 'trabajador_id' no debe ser vacío.")
    .isInt()
    .withMessage("El campo 'trabajador_id' debe ser un número entero.")
    .custom(async (trabajador_id) => {
      if (trabajador_id) {
        const result = await query(
          `SELECT * FROM usuario WHERE usuario_id = ?`,
          [trabajador_id]
        );

        if (result.data.length === 0) {
          throw new Error("Este usuario no existe.");
        }
      }
      return true;
    }),

  check("tipo")
    .exists()
    .withMessage("El campo 'tipo' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'tipo' no debe ser vacío.")
    .isInt()
    .withMessage("El campo 'tipo' debe ser un número entero."),

  check("descripcion")
    .exists()
    .withMessage("El campo 'descripcion' es obligatorio.")
    .not()
    .isEmpty()
    .withMessage("El campo 'descripcion' no debe ser vacío.")
    .isString()
    .withMessage("El campo 'descripcion' debe ser una cadena de texto.")
    .isLength({ min: 1 })
    .withMessage("El campo 'descripcion' no debe ser vacío."),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
