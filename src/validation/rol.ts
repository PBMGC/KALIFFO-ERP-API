import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../util/validation";

export const ValidateCreateRol: any = [
  check("rol").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
