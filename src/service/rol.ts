import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { query } from "../util/query";

dotenv.config();

export const _createRol = async (rol: any) => {
  try {
    const hashPassword = await bcrypt.hash(rol.password, 8);
    rol.password = hashPassword;

    const result = await query(
      "INSERT INTO rol (username, password, rol, id_tipo) values (?, ?, ?, ?)",
      [rol.username, rol.password, rol.rol,rol.id_tipo]
    );

    if (result.error) {
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    return {
      message: "rol creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error _createUsuario",
      success: false,
      status: 500,
    };
  }
};

export const _login = async (username: string, password: string) => {
  try {
    const resultRol = (await query("select * from rol where username = ?", [
      username,
    ])) as any;

    const rol = resultRol.data[0];

    if (!rol || !(await bcrypt.compare(password, rol.password))) {
      return {
        message: "username o password incorrectos",
        success: false,
        status: 400,
      };
    }

    const token = jwt.sign(
      {
        rol_id: rol.rol_id,
        id_tipo:rol.id_tipo,
        username: rol.username,
        rol: rol.rol,
      },
      process.env.SECRET_KEY || "contraseña_default"
    );

    return {
      message: `Bienvenido ${rol.username}`,
      rol: rol.rol,
      id_tipo:rol.id_tipo,
      token,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "error _login",
      success: false,
      status: 500,
    };
  }
};
