import { body, check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../util/validation";

export const ValidateCreateProducto: any = [
  check("nombre")
    .exists()
    .withMessage("El campo 'nombre' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'nombre' no debe ser vacío"),

  check("precio")
    .exists()
    .withMessage("El campo 'precio' es obligatorio")
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
    .withMessage("El campo 'descuento' es obligatorio.")
    .custom((value) => {
      if (!/^\d+%?$/.test(value)) {
        throw new Error("El campo 'descuento' debe ser un porcentaje válido.");
      }
      return true;
    }),

  check("detalles")
    .exists()
    .withMessage("El campo 'detalles' es obligatorio")
    .isArray()
    .withMessage("El campo 'detalles' debe ser un array"),

  body("detalles.*.codigo")
    .exists()
    .withMessage("El campo 'detalles[codigo]' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'detalles[codigo]' no debe ser vacío"),

  body("detalles.*.talla")
    .exists()
    .withMessage("El campo 'detalles[talla]' es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El campo 'detalles[talla]' no debe ser vacío"),

  body("detalles.*.color_id")
    .exists()
    .withMessage("El campo 'detalles[color_id]' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage(
      "El campo 'detalles[color_id]' debe ser un número entero positivo"
    ),

  body("detalles.*.tiendas")
    .exists()
    .withMessage("El campo 'detalles[tiendas]' es obligatorio")
    .isArray()
    .withMessage("El campo 'detalles[tiendas]' debe ser un array"),

  // body("detalles.*.tiendas.*.tienda_id")
  //   .exists()
  //   .withMessage("El campo 'detalles[tiendas][tienda_id]' es obligatorio")
  //   .isInt()
  //   .withMessage(
  //     "El campo 'detalles[tiendas][tienda_id]' debe ser un número entero."
  //   )
  //   .custom(async (value) => {
  //     const tienda = await Tienda.findOne({ where: { tienda_id: value } });
  //     if (!tienda) {
  //       throw new Error(`La tienda_id ${value} no existe.`);
  //     }
  //     return true;
  //   }),

  body("detalles.*.tiendas.*.stock")
    .exists()
    .withMessage("El campo 'detalles[tiendas][stock]' es obligatorio")
    .isInt({ gt: 0 })
    .withMessage(
      "El campo 'detalles[tiendas][stock]' debe ser un número entero positivo"
    ),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
