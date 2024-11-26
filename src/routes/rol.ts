import { Router } from "express";
import { createRol, login, logout } from "../controller/rol";

const router = Router();

router.post("/login", login);
router.post("/create", createRol);
router.get("/logout", logout);

export { router };
