import { query } from "./query";
import { _createTienda } from "../service/tienda";
import { _createUsuario } from "../service/usuario";
import { _createPago } from "../service/pago";
import { _createColor } from "../service/color";
import { _createProducto } from "../service/producto";

// const incidencias: IncidenciaInterface[] = [
//   {
//     tipo: 1,
//     descripcion: "Permiso familiar para cuidar a un hijo enfermo",
//     fecha_creacion: new Date("2024-09-25"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 2,
//     descripcion: "Visita médica de urgencia",
//     fecha_creacion: new Date("2024-09-24"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 3,
//     descripcion: "Día personal para resolver asuntos bancarios",
//     fecha_creacion: new Date("2024-09-23"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 1,
//     descripcion: "Ausencia por ceremonia familiar",
//     fecha_creacion: new Date("2024-09-22"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 2,
//     descripcion: "Chequeo médico anual",
//     fecha_creacion: new Date("2024-09-21"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 3,
//     descripcion: "Día personal por trámites legales",
//     fecha_creacion: new Date("2024-09-20"),
//     usuario_id: 1,
//   },
//   {
//     tipo: 1,
//     descripcion: "Permiso para atender asuntos familiares urgentes",
//     fecha_creacion: new Date("2024-09-19"),
//     usuario_id: 2,
//   },
//   {
//     tipo: 2,
//     descripcion: "Ausencia por hospitalización",
//     fecha_creacion: new Date("2024-09-18"),
//     usuario_id: 2,
//   },
//   {
//     tipo: 3,
//     descripcion: "Permiso para asuntos personales fuera de la ciudad",
//     fecha_creacion: new Date("2024-09-17"),
//     usuario_id: 2,
//   },
//   {
//     tipo: 1,
//     descripcion: "Ausencia por evento familiar importante",
//     fecha_creacion: new Date("2024-09-16"),
//     usuario_id: 3,
//   },
// ];

// const createHorario = async () => {
//   if (!(await Horario.findOne({ where: { usuario_id: 1 } }))) {
//     await sequelize.query(`
//       INSERT INTO horario (hora_entrada, hora_salida, fecha, usuario_id) VALUES
//       ('09:00:00', '16:00:00', '2024-08-24', 1),
//       ('09:00:00', '17:00:00', '2024-08-19', 1),
//       ('09:00:00', '14:00:00', '2024-08-18', 1),
//       ('09:00:00', '12:00:00', '2024-08-14', 1);
//     `);
//   }
// };

// const createIncidencias = async () => {
//   for (const incidencia of incidencias) {
//     const incidenciaExistente = await Incidencia.findOne({
//       where: { descripcion: incidencia.descripcion },
//     });

//     if (!incidenciaExistente) {
//       await _createIncidencia(incidencia);
//     }
//   }
// };
