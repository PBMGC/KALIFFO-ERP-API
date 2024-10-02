import { Router } from "express";
// import {
//   createUsuario,
//   deleteUsuario,
//   generateReporte,
//   getUsuario,
//   getUsuarios,
//   loginUsuario,
//   updateUsuario,
// } from "../controller/usuario";
import { ValidateCreateUsuario, ValidateLogin } from "../validation/usuario";
import { createUsuario, deleteUsuario, generateReporte, getUsuario, getUsuarios, updateUsuario } from "../controller/usuario";

const router = Router();

router.get("/", getUsuarios);
router.get("/:usuario_id", getUsuario);

router.post("/create", ValidateCreateUsuario, createUsuario);

// router.post("/login", ValidateLogin, loginUsuario);

router.put("/update/:usuario_id", updateUsuario);

router.delete("/delete/:usuario_id", deleteUsuario);

router.get("/reporte/:usuario_id",generateReporte)

export { router };
