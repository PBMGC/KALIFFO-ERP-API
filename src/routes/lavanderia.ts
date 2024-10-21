import { Router } from "express";
import { createLavanderia } from "../controller/lavanderia";

const router = Router();

router.post("/create",createLavanderia)


export { router };