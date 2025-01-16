// Importa las dependencias necesarias
import { Router } from "express"; // Router para definir rutas
import { createColor, getColores } from "../controller/color"; // Controladores para la entidad "color"
import { ValidateCreateColor } from "../validation/color"; // Validaciones específicas para "color"
import { validateToken } from "../middleware/validateToken"; // Middleware para validar token

// Crea una instancia del enrutador
const router = Router();

// Middleware para validar token y restringir acceso a administradores
const Validate = validateToken(["administrador"]);
router.use(Validate);

// Rutas revisadas
// Ruta para crear un color, con validación previa
router.post("/create", ValidateCreateColor, createColor);

// Ruta para obtener la lista de colores
router.get("/", getColores);

// Rutas sin revisar (comentadas para revisión futura)

// Exporta el enrutador
export { router };
