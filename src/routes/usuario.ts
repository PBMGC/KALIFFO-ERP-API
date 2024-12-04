import { Router } from "express";
import { createRol, login, logout, validation } from "../controller/usuario";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// const Validate = validateToken(["administrador"]);
// router.use(Validate);

router.post("/login", login);
router.post("/create", createRol);
router.get("/logout", logout);
router.get("/validation", validateToken, validation);

export { router };
