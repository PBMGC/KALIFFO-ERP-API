import { Router } from "express";
import { createRol, login, logout, validation } from "../controller/usuario";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Descomentar las siguientes líneas si quieres aplicar la validación para administradores o roles específicos
// const Validate = validateToken(["administrador"]);
// router.use(Validate);

// Rutas de autenticación y validación de usuarios

// Ruta para realizar el login de un usuario. El controlador 'login' maneja la autenticación.
router.post("/login", login);

// Ruta para crear un nuevo rol de usuario en el sistema.
router.post("/create", createRol);

// Ruta para realizar logout, que termina la sesión del usuario actual.
router.get("/logout", logout);

// Ruta para validar el token de un usuario. Este token es necesario para acceder a rutas protegidas.
router.get("/validation", validateToken, validation);

export { router };
