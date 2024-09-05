import { body, check } from "express-validator";
import { Tienda } from "../models/tienda";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../util/validation";

export const ValidateCreateProducto: any = [
  check("nombre")
    .exists()
    .withMessage("El campo 'nombre' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'nombre' no debe ser vacio"),

  check("precio")
    .exists()
    .withMessage("El campo 'precio' es obligatorio.")
    .isFloat({ min: 0 })
    .withMessage("El campo 'precio' debe ser un número positivo.")
    .custom((value) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        throw new Error(
          "El campo 'precio' debe tener como máximo 2 decimales."
        );
      }
      return true;
    }),

  check("descuento")
    .exists()
    .withMessage("El campo 'descuento' no debe ser vacio")
    .isInt({ gt: 0 })
    .withMessage("Eñ campo 'descuento' debe ser un numero entero positivo"),

  check("detalles")
    .exists()
    .withMessage("El campo 'detalles' es obligatorio")
    .isArray()
    .withMessage("El campo 'detalles' es un array"),

  body("detalles.*.talla")
    .exists()
    .withMessage("El campo 'detalles[talla]' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'detalles[talla]' no debe ser vacio"),
  body("detalles.*.color")
    .exists()
    .withMessage("El campo 'detalles[color]' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'detalles[color]' no debe ser vacio"),

  body("detalles.*.stock")
    .exists()
    .withMessage("El campo 'detalles[stock]' no debe ser vacio")
    .isInt({ gt: 0 })
    .withMessage(
      "Eñ campo 'detalles[stock]' debe ser un numero entero positivo"
    ),

  body("detalles.*.tienda_id")
    .exists()
    .withMessage("El campo 'detalles[tienda_id]' es obligatorio.")
    .isInt()
    .withMessage("El campo 'detalles[tienda_id]' debe ser un número entero.")
    .custom(async (value) => {
      const tienda = await Tienda.findOne({ where: { tienda_id: value } });
      if (!tienda) {
        throw new Error(`La tienda_id ${value} no existe.`);
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
