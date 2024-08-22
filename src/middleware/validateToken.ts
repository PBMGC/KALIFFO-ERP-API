import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { DecodedToken } from "../interface/decodeToken";

dotenv.config();

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenCookie = req.cookies.token;

  if (!tokenCookie) {
    return res.status(401).json({
      msg: "no se encontro token",
      succes: false,
      status: 400,
    });
  }

  try {
    const decodeToken = jwt.verify(
      tokenCookie,
      process.env.SECRET_KEY || "contraseña"
    ) as DecodedToken;

    req.decodeToken = decodeToken;

    next();
  } catch (error) {
    res.status(401).json({ msg: "token no valido", error });
  }
};
