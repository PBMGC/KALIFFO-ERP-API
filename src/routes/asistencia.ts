import { Router } from "express";
import { validateToken } from "../middleware/validateToken";
import { getAsistencias, horasTrabajadas } from "../controller/asistencia";
// import {
//   deleteAsistencia,
//   finalAsitencia,
//   horasTrabajadas,
//   inicioAsistencia,
// } from "../controller/usuario";

const router = Router();

//Rutas revisadas
//Rutas sin revisar
router.get("", getAsistencias);

// router.get("/inicio", validateToken, inicioAsistencia);
// router.get("/final", validateToken, finalAsitencia);

// router.delete("/delete/:horario_id",deleteAsistencia)

router.post("/horasTrabajadas/:usuario_id", horasTrabajadas);

export { router };
