// import sequelize from "../db/connection";
// import { Color as ColorInterface } from "../interface/color";
// import { Incidencia as IncidenciaInterface } from "../interface/incidencia";
// import { Pago as PagoInterface } from "../interface/pago";
// import { Producto as ProductoInterface } from "../interface/producto";
// import { Tienda as TiendaInterface } from "../interface/tienda";
// import { Color } from "../models/color";
// import { Horario } from "../models/horario";
// import { Incidencia } from "../models/incidencia";
// import { Pago } from "../models/pago";
// import { Producto } from "../models/producto";
// import { Tienda } from "../models/tienda";
// import { Usuario } from "../models/usuario";
// import { _createColor } from "../service/color";
// import { _createIncidencia } from "../service/incidencia";
// import { _createPago } from "../service/pago";
// import { _createProducto } from "../service/producto";
// import { _createTienda } from "../service/tienda";
// import { _createUsuario } from "../service/usuario";

import { log } from "console";
import { _createTienda } from "../service/tienda";
import { _createUsuario } from "../service/usuario";
import { query } from "./query";

const tiendas: any = [
  {
    tienda: "Almacen",
    direccion: "Av. Siempre Viva 12, Lima",
    telefono: "987654322",
  },
  {
    tienda: "Tienda 1",
    direccion: "Av. Siempre Viva 123, Lima",
    telefono: "987654321",
  },
  {
    tienda: "Tienda 2",
    direccion: "Calle Los Cedros 456, Arequipa",
    telefono: "912345678",
  },
];

const usuarios: any = [
  {
    nombre: "Juan",
    ap_paterno: "Pérez",
    ap_materno: "Gómez",
    fecha_nacimiento: "2000-01-01",
    dni: "73214567",
    telefono: "987654321",
    contraseña: "juan1234",
    sueldo: 300,
    tienda_id: 1,
    rol: 1,
  },
  {
    nombre: "María",
    ap_paterno: "López",
    ap_materno: "Hernández",
    fecha_nacimiento: "19*92-07-02",
    dni: "65478932",
    telefono: "912345678",
    contraseña: "maria2021",
    sueldo: 200,
    rol: 2,
  },
  {
    nombre: "Carlos",
    ap_paterno: "Fernández",
    ap_materno: "Ramírez",
    fecha_nacimiento: "1978-11-08",
    dni: "87654321",
    telefono: "976543210",
    contraseña: "carlos78",
    sueldo: 150,
    rol: 2,
  },
  {
    nombre: "Lucía",
    ap_paterno: "García",
    ap_materno: "Mendoza",
    fecha_nacimiento: "1995-05-15",
    dni: "78945612",
    telefono: "934567890",
    contraseña: "lucia95",
    sueldo: 80,
    rol: 2,
  },
];

const colores: any = [
  { nombre: "Rojo", codigo: "FF0000" },
  { nombre: "Verde", codigo: "00FF00" },
  { nombre: "Azul", codigo: "0000FF" },
  { nombre: "Amarillo", codigo: "FFFF00" },
  { nombre: "Naranja", codigo: "FFA500" },
  { nombre: "Violeta", codigo: "EE82EE" },
  { nombre: "Negro", codigo: "000000" },
  { nombre: "Blanco", codigo: "FFFFFF" },
  { nombre: "Gris", codigo: "808080" },
  { nombre: "Marrón", codigo: "A52A2A" },
  { nombre: "Rosa", codigo: "FFC0CB" },
  { nombre: "Celeste", codigo: "87CEEB" },
  { nombre: "Cian", codigo: "00FFFF" },
  { nombre: "Magenta", codigo: "FF00FF" },
  { nombre: "Dorado", codigo: "FFD700" },
  { nombre: "Plateado", codigo: "C0C0C0" },
  { nombre: "Púrpura", codigo: "800080" },
  { nombre: "Azul Marino", codigo: "000080" },
  { nombre: "Verde Oliva", codigo: "808000" },
  { nombre: "Lavanda", codigo: "E6E6FA" },
  { nombre: "Turquesa", codigo: "40E0D0" },
  { nombre: "Salmón", codigo: "FA8072" },
  { nombre: "Aguamarina", codigo: "7FFFD4" },
  { nombre: "Coral", codigo: "FF7F50" },
  { nombre: "Caqui", codigo: "F0E68C" },
  { nombre: "Azul Cobalto", codigo: "0047AB" },
  { nombre: "Verde Lima", codigo: "32CD32" },
  { nombre: "Marfil", codigo: "FFFFF0" },
  { nombre: "Fucsia", codigo: "FF00FF" },
  { nombre: "Verde Menta", codigo: "98FF98" },
];

// const pagos: PagoInterface[] = [
//   {
//     montoPagado: 100.0,
//     montoFaltante: 80.0,
//     fecha: new Date("2024-01-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 120.0,
//     montoFaltante: 60.0,
//     fecha: new Date("2024-02-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 110.0,
//     montoFaltante: 70.0,
//     fecha: new Date("2024-03-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 150.0,
//     montoFaltante: 50.0,
//     fecha: new Date("2024-04-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 130.0,
//     montoFaltante: 30.0,
//     fecha: new Date("2024-05-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 140.0,
//     montoFaltante: 20.0,
//     fecha: new Date("2024-06-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 160.0,
//     montoFaltante: 10.0,
//     fecha: new Date("2024-07-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 170.0,
//     montoFaltante: 0.0,
//     fecha: new Date("2024-08-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 150.0,
//     montoFaltante: 5.0,
//     fecha: new Date("2024-09-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 180.0,
//     montoFaltante: 15.0,
//     fecha: new Date("2024-10-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 190.0,
//     montoFaltante: 25.0,
//     fecha: new Date("2024-11-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
//   {
//     montoPagado: 200.0,
//     montoFaltante: 30.0,
//     fecha: new Date("2024-12-15"),
//     estado: 1,
//     usuario_id: 1,
//   },
// ];

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

const createTienda = async () => {
  try {
    for (const tienda of tiendas) {
      const result = await query("SELECT * FROM tienda WHERE tienda = ?", [
        tienda.tienda,
      ]);

      if (result.data.length === 0) {
        await _createTienda(tienda);
      }
    }
  } catch (error) {
    console.log("Error en createTienda:", error);
  }
};

const createUsuario = async () => {
  try {
    for (const usuario of usuarios) {
      const result = await query("SELECT * FROM usuario WHERE dni = ?", [
        usuario.dni,
      ]);

      if (result.data.length === 0) {
        _createUsuario(usuario);
      }
    }

    // createHorario();
    // createPago();
    // createIncidencias();
  } catch (error) {
    console.log("Error en createUsuario:", error);
  }
};

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
// const createColores = async () => {
//   for (const color of colores) {
//     const colorExistente = await Color.findOne({
//       where: { nombre: color.nombre },
//     });

//     const newColor = {
//       nombre: color.nombre,
//       codigo: color.codigo,
//     };
//     if (!colorExistente) {
//       await _createColor(newColor);
//     }
//   }
// };

// const createProducto = async () => {
//   for (const producto of productos) {
//     const productoExistente = await Producto.findOne({
//       where: { nombre: producto.nombre },
//     });
//     if (!productoExistente) {
//       const newProducto: ProductoInterface = {
//         nombre: producto.nombre,
//         precio: producto.precio,
//         descuento: producto.descuento,
//         stockGeneral: 0,
//       };

//       await _createProducto(newProducto, producto.detalles);
//     }
//   }
// };

// const createPago = async () => {
//   for (const pago of pagos) {
//     const pagoExistente = await Pago.findOne({
//       where: { fecha: pago.fecha },
//     });

//     if (!pagoExistente) {
//       await _createPago(pago);
//     }
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

export const scriptInicio = async () => {
  createTienda();
  createUsuario();
  // createColores();
  // createProducto();
};
