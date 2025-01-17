import { _createAsistencia } from "../service/asistencia";
import { _createIncidencia } from "../service/incidencia";
import { _createPago } from "../service/pago";
import { _createTrabajador } from "../service/trabajador";

import { query } from "../util/query";

const trabajadores: any = [
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
    fecha_nacimiento: "1992-07-02",
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

const pagos: any = [
  {
    montoPagado: 100.0,
    montoFaltante: 80.0,
    fecha: "2024-01-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 120.0,
    montoFaltante: 60.0,
    fecha: "2024-02-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 110.0,
    montoFaltante: 70.0,
    fecha: "2024-03-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 150.0,
    montoFaltante: 50.0,
    fecha: "2024-04-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 130.0,
    montoFaltante: 30.0,
    fecha: "2024-05-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 140.0,
    montoFaltante: 20.0,
    fecha: "2024-06-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 160.0,
    montoFaltante: 10.0,
    fecha: "2024-07-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 170.0,
    montoFaltante: 0.0,
    fecha: "2024-08-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 150.0,
    montoFaltante: 5.0,
    fecha: "2024-09-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 180.0,
    montoFaltante: 15.0,
    fecha: "2024-10-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 190.0,
    montoFaltante: 25.0,
    fecha: "2024-11-15",
    estado: 1,
    trabajador_id: 1,
  },
  {
    montoPagado: 200.0,
    montoFaltante: 30.0,
    fecha: "2024-12-15",
    estado: 1,
    trabajador_id: 1,
  },
];

const incidencias: any = [
  {
    tipo: 1,
    descripcion: "Permiso familiar para cuidar a un hijo enfermo",
    fecha: new Date("2024-09-25"),
    trabajador_id: 1,
  },
  {
    tipo: 2,
    descripcion: "Visita médica de urgencia",
    fecha: new Date("2024-09-24"),
    trabajador_id: 1,
  },
  {
    tipo: 3,
    descripcion: "Día personal para resolver asuntos bancarios",
    fecha: new Date("2024-09-23"),
    trabajador_id: 1,
  },
  {
    tipo: 1,
    descripcion: "Ausencia por ceremonia familiar",
    fecha: new Date("2024-09-22"),
    trabajador_id: 1,
  },
  {
    tipo: 2,
    descripcion: "Chequeo médico anual",
    fecha: new Date("2024-09-21"),
    trabajador_id: 1,
  },
  {
    tipo: 3,
    descripcion: "Día personal por trámites legales",
    fecha: new Date("2024-09-20"),
    trabajador_id: 1,
  },
  {
    tipo: 1,
    descripcion: "Permiso para atender asuntos familiares urgentes",
    fecha: new Date("2024-09-19"),
    trabajador_id: 2,
  },
  {
    tipo: 2,
    descripcion: "Ausencia por hospitalización",
    fecha: new Date("2024-09-18"),
    trabajador_id: 2,
  },
  {
    tipo: 3,
    descripcion: "Permiso para asuntos personales fuera de la ciudad",
    fecha: new Date("2024-09-17"),
    trabajador_id: 2,
  },
  {
    tipo: 1,
    descripcion: "Ausencia por evento familiar importante",
    fecha: new Date("2024-09-16"),
    trabajador_id: 3,
  },
];

const horarios = [
  // Usuario 1 (Semana 1)
  {
    hora_entrada: "09:00:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-12",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:15:00",
    hora_salida: "17:20:00",
    fecha: "2024-08-13",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:10:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-14",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:20:00",
    hora_salida: "16:40:00",
    fecha: "2024-08-15",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:05:00",
    hora_salida: "15:45:00",
    fecha: "2024-08-16",
    trabajador_id: 1,
  },
  {
    hora_entrada: "08:55:00",
    hora_salida: "16:25:00",
    fecha: "2024-08-17",
    trabajador_id: 1,
  },

  // Usuario 1 (Semana 2)
  {
    hora_entrada: "09:00:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-19",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:15:00",
    hora_salida: "17:20:00",
    fecha: "2024-08-20",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:10:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-21",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:20:00",
    hora_salida: "16:40:00",
    fecha: "2024-08-22",
    trabajador_id: 1,
  },
  {
    hora_entrada: "09:05:00",
    hora_salida: "15:45:00",
    fecha: "2024-08-23",
    trabajador_id: 1,
  },
  {
    hora_entrada: "08:55:00",
    hora_salida: "16:25:00",
    fecha: "2024-08-24",
    trabajador_id: 1,
  },

  // Usuario 2 (Semana 1)
  {
    hora_entrada: "08:30:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-12",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:45:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-13",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:40:00",
    hora_salida: "16:15:00",
    fecha: "2024-08-14",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:50:00",
    hora_salida: "16:35:00",
    fecha: "2024-08-15",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:35:00",
    hora_salida: "16:20:00",
    fecha: "2024-08-16",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:25:00",
    hora_salida: "16:05:00",
    fecha: "2024-08-17",
    trabajador_id: 2,
  },

  // Usuario 2 (Semana 2)
  {
    hora_entrada: "08:30:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-19",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:45:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-20",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:40:00",
    hora_salida: "16:15:00",
    fecha: "2024-08-21",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:50:00",
    hora_salida: "16:35:00",
    fecha: "2024-08-22",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:35:00",
    hora_salida: "16:20:00",
    fecha: "2024-08-23",
    trabajador_id: 2,
  },
  {
    hora_entrada: "08:25:00",
    hora_salida: "16:05:00",
    fecha: "2024-08-24",
    trabajador_id: 2,
  },

  // Usuario 3 (Semana 1)
  {
    hora_entrada: "09:00:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-12",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:10:00",
    hora_salida: "17:20:00",
    fecha: "2024-08-13",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:05:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-14",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:15:00",
    hora_salida: "16:40:00",
    fecha: "2024-08-15",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:00:00",
    hora_salida: "15:30:00",
    fecha: "2024-08-16",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:20:00",
    hora_salida: "16:00:00",
    fecha: "2024-08-17",
    trabajador_id: 3,
  },

  // Usuario 3 (Semana 2)
  {
    hora_entrada: "09:00:00",
    hora_salida: "17:00:00",
    fecha: "2024-08-19",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:10:00",
    hora_salida: "17:20:00",
    fecha: "2024-08-20",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:05:00",
    hora_salida: "16:30:00",
    fecha: "2024-08-21",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:15:00",
    hora_salida: "16:40:00",
    fecha: "2024-08-22",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:00:00",
    hora_salida: "15:30:00",
    fecha: "2024-08-23",
    trabajador_id: 3,
  },
  {
    hora_entrada: "09:20:00",
    hora_salida: "16:00:00",
    fecha: "2024-08-24",
    trabajador_id: 3,
  },
];

const createHorarios = async () => {
  for (const horario of horarios) {
    const result = await query(
      `select * from horario where fecha = ? and trabajador_id = ?`,
      [horario.fecha, horario.trabajador_id]
    );

    if (result.data.length === 0) {
      await _createAsistencia(horario);
    }
  }
};

export const createTrabajadores = async () => {
  try {
    for (const trabajador of trabajadores) {
      const result = await query("SELECT * FROM trabajador WHERE dni = ?", [
        trabajador.dni,
      ]);

      if (result.data.length === 0) {
        await _createTrabajador(trabajador);
      }
    }

    await createIncidencias();
    await createPago();
    await createHorarios();
  } catch (error) {
    console.log("Error en createUsuario:", error);
  }
};
const createIncidencias = async () => {
  for (const incidencia of incidencias) {
    const result = await query(
      `select * from incidencia where descripcion = ?`,
      [incidencia.descripcion]
    );

    if (result.data.length === 0) {
      await _createIncidencia(incidencia);
    }
  }
};

export const createPago = async () => {
  for (const pago of pagos) {
    try {
      const formattedDate = new Date(pago.fecha).toISOString().split("T")[0];

      const result = await query("SELECT * FROM pago WHERE fecha = ?", [
        formattedDate,
      ]);

      if (result.data.length === 0) {
        await _createPago(pago);
      }
    } catch (error) {
      console.log("Error al crear incidencias:", error);
    }
  }
};
