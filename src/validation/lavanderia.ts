import { body, check } from "express-validator";
import { validateResult } from "../util/validation";
import { NextFunction, Request, Response } from "express";
import { query } from "../util/query";

export const ValidateCreateLavanderiaArray = [
  // Validar que 'detalles' sea un array
  body("detalles")
    .exists()
    .withMessage("El campo 'detalles' es obligatorio.")
    .isArray({ min: 1 })
    .withMessage(
      "El campo 'detalles' debe ser un array con al menos un elemento."
    ),

  body("detalles.*.corte_id")
    .exists()
    .withMessage("El campo 'corte_id' es obligatorio en cada detalle.")
    .isInt({ min: 1 })
    .withMessage("El campo 'corte_id' debe ser un número entero positivo."),

  body("detalles.*.talla")
    .exists()
    .withMessage("El campo 'talla' es obligatorio en cada detalle.")
    .isString()
    .withMessage("El campo 'talla' debe ser una cadena de texto."),

  body("detalles.*.color_id")
    .exists()
    .withMessage("El campo 'color_id' es obligatorio en cada detalle.")
    .isInt({ min: 1 })
    .withMessage("El campo 'color_id' debe ser un número entero positivo."),

  body("detalles.*.precio_unidad")
    .exists()
    .withMessage("El campo 'precio_unidad' es obligatorio en cada detalle.")
    .isFloat({ min: 0 })
    .withMessage(
      "El campo 'precio_unidad' debe ser un número flotante positivo."
    ),

  body("detalles.*.lavanderia_asignada")
    .exists()
    .withMessage(
      "El campo 'lavanderia_asignada' es obligatorio en cada detalle."
    )
    .isString()
    .withMessage(
      "El campo 'lavanderia_asignada' debe ser una cadena de texto."
    ),

  body("detalles.*.cantidad_enviada")
    .exists()
    .withMessage("El campo 'cantidad_enviada' es obligatorio en cada detalle.")
    .isInt({ min: 1 })
    .withMessage(
      "El campo 'cantidad_enviada' debe ser un número entero positivo."
    ),

  body("detalles").custom(async (detalles, { req }) => {
    const request = req as Request;
    const lote_id = request.params.lote_id;

    if (!lote_id) {
      throw new Error("El parámetro 'lote_id' es obligatorio en la URL.");
    }

    const cortesResult = await query(`SELECT * FROM corte WHERE lote_id = ?`, [
      lote_id,
    ]);
    const cortes = cortesResult.data;
    const cantidadesPorCorte: any = {};
    detalles.forEach((detalle: any) => {
      const corte_id = detalle.corte_id;
      const cantidad_enviada = detalle.cantidad_enviada;
      if (!cantidadesPorCorte[corte_id]) {
        cantidadesPorCorte[corte_id] = 0;
      }
      cantidadesPorCorte[corte_id] += cantidad_enviada;
    });

    cortes.forEach((corte: any) => {
      if (corte.estado !== 3) {
        throw new Error(
          `El corte_id = ${corte.corte_id} no esta en estado 3 esta en estado => ${corte.estado}`
        );
      }

      if (
        cantidadesPorCorte[corte.corte_id] !== corte.cantidad_recibida &&
        cantidadesPorCorte[corte.corte_id] != undefined
      ) {
        throw new Error(
          `La suma no es la indicada el el corte_id => ${corte.corte_id}`
        );
      }
    });

    return true;
  }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

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
