import { Router } from "express";
import { createRol, login, logout, validation } from "../controller/rol";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.post("/login", login);
router.post("/create", createRol);
router.get("/logout", logout);
router.get("/validation", validateToken, validation);

export { router };
