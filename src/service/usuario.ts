import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { query } from "../util/query";
import { Usuario } from "../interface/usuario";

dotenv.config();

// Function to create a new user
export const _createUsuario = async (usuario: Usuario) => {
  try {
    // Hash the password before storing it in the database
    const hashPassword = await bcrypt.hash(usuario.password, 8);
    usuario.password = hashPassword;

    // Insert the new user into the database
    const result = await query(
      "INSERT INTO usuario (username, password, rol, id_tipo) values (?, ?, ?, ?)",
      [usuario.username, usuario.password, usuario.rol, usuario.id_tipo]
    );

    if (result.error) {
      // If there's an error during insertion, return a failure response
      return {
        error: result.error,
        success: false,
        status: 400,
      };
    }

    // Return success response if user was created
    return {
      message: "usuario creado exitosamente",
      success: true,
      status: 201,
    };
  } catch (error) {
    console.log(error);

    // Return error response in case of unexpected failure
    return {
      message: "Error _createUsuario",
      success: false,
      status: 500,
    };
  }
};

// Function to log in a user
export const _login = async (username: string, password: string) => {
  try {
    // Query the database to get the user by username
    const resultUsuario = (await query(
      "select * from usuario where username = ?",
      [username]
    )) as any;

    const usuario = resultUsuario.data[0];

    // Check if user exists and compare the input password with the stored hash
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return {
        message: "username o password incorrectos",
        success: false,
        status: 400,
      };
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        rol_id: usuario.rol_id,
        id_tipo: usuario.id_tipo,
        username: usuario.username,
        rol: usuario.rol,
      },
      process.env.SECRET_KEY || "password" // Secret key for JWT
    );

    // Return success response along with the token
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

    // Return error response if an exception occurs during login
    return {
      message: "error _login",
      success: false,
      status: 500,
    };
  }
};
