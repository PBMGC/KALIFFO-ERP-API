import { Router } from "express";
import { createProducto } from "../controller/producto";
import { ValidateCreateProducto } from "../validation/producto";

const router = Router();

router.post("/create", ValidateCreateProducto, createProducto);

export { router };
