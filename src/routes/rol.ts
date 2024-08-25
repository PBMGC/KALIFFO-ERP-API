import { Router } from "express";
import { createRol, getRoles } from "../controller/rol";
import { ValidateCreateRol } from "../validation/rol";

const router = Router();

router.post("/create", ValidateCreateRol, createRol);
router.get("/", getRoles);

export { router };
