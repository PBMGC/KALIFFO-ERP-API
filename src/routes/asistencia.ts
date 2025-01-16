// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import { getAsistencias, horasTrabajadas } from "../controller/asistencia"; // Controladores para asistencia
import { validateToken } from "../middleware/validateToken"; // Middleware para validar token

// Crea una instancia del enrutador
const router = Router();

// Middleware para validar token y restringir acceso a administradores
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas
// Ruta para obtener asistencias
router.get("", getAsistencias);

// Ruta para calcular horas trabajadas por usuario
router.post("/horasTrabajadas/:usuario_id", horasTrabajadas);

// Rutas sin revisar (comentadas para revisión futura)
// router.get("/inicio", validateToken, inicioAsistencia);
// router.get("/final", validateToken, finalAsitencia);
// router.delete("/delete/:horario_id", deleteAsistencia);

// Exporta el enrutador
export { router };
