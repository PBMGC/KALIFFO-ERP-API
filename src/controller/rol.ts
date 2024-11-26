import { Request, Response } from "express";
import { _createRol, _login } from "../service/rol";
import { handleHttp } from "../util/error.handler";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await _login(username, password);
    res.cookie("token", response.token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });
    delete response.token;
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_login", 500);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleHttp(res, "error_logout", 500);
  }
};

export const createRol = async (req: Request, res: Response) => {
  const { username, password, rol } = req.body;

  try {
    const response = await _createRol({ username, password, rol });
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_createRol", 500);
  }
};
