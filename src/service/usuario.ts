import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { query } from "../util/query";
import { Usuario } from "../interface/usuario";

dotenv.config();

export const _createUsuario = async (usuario: Usuario) => {
  try {
    const hashPassword = await bcrypt.hash(usuario.password, 8);
    usuario.password = hashPassword;

    const result = await query(
      "INSERT INTO usuario (username, password, rol, id_tipo) values (?, ?, ?, ?)",
      [usuario.username, usuario.password, usuario.rol, usuario.id_tipo]
    );

    if (result.error) {
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    return {
      message: "usuario creado exitosamente",
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
    const resultUsuario = (await query(
      "select * from usuario where username = ?",
      [username]
    )) as any;

    const usuario = resultUsuario.data[0];

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return {
        message: "username o password incorrectos",
        success: false,
        status: 400,
      };
    }

    const token = jwt.sign(
      {
        rol_id: usuario.rol_id,
        id_tipo: usuario.id_tipo,
        username: usuario.username,
        rol: usuario.rol,
      },
      process.env.SECRET_KEY || "password"
    );

    return {
      message: `Bienvenido ${usuario.username}`,
      rol: usuario.rol,
      id_tipo: usuario.id_tipo,
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
