import { Router } from "express";
import { createRol, getRoles } from "../controller/rol";

const router = Router();

router.post("/create", createRol);
router.get("/", getRoles);

export { router };
