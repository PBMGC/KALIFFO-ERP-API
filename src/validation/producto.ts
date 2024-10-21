import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../util/validation";

export const ValidateCreateProductoCompleto: any = [
  body("*.producto_id")
    .exists()
    .withMessage("El campo 'producto_id' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El campo 'producto_id' debe ser un número entero positivo"),

  body("*.detalle")
    .exists()
    .withMessage("El campo 'detalle' es obligatorio")
    .isArray({ min: 1 })
    .withMessage(
      "El campo 'detalle' debe ser un array con al menos un elemento"
    ),

  body("*.detalle.*.color_id")
    .exists()
    .withMessage("El campo 'detalle[color_id]' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage(
      "El campo 'detalle[color_id]' debe ser un número entero positivo"
    ),

  body("*.detalle.*.talla")
    .exists()
    .withMessage("El campo 'detalle[talla]' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage(
      "El campo 'detalle[talla]' debe ser un número entero positivo"
    ),

  body("*.detalle.*.stock")
    .exists()
    .withMessage("El campo 'detalle[stock]' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage(
      "El campo 'detalle[stock]' debe ser un número entero positivo"
    ),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
