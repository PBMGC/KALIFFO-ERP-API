import { _createPago } from "../service/pago";
import { _createUsuario } from "../service/usuario";
import { query } from "../util/query";

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

const pagos: any = [
  {
    montoPagado: 100.0,
    montoFaltante: 80.0,
    fecha: "2024-01-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 120.0,
    montoFaltante: 60.0,
    fecha: "2024-02-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 110.0,
    montoFaltante: 70.0,
    fecha: "2024-03-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 150.0,
    montoFaltante: 50.0,
    fecha: "2024-04-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 130.0,
    montoFaltante: 30.0,
    fecha: "2024-05-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 140.0,
    montoFaltante: 20.0,
    fecha: "2024-06-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 160.0,
    montoFaltante: 10.0,
    fecha: "2024-07-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 170.0,
    montoFaltante: 0.0,
    fecha: "2024-08-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 150.0,
    montoFaltante: 5.0,
    fecha: "2024-09-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 180.0,
    montoFaltante: 15.0,
    fecha: "2024-10-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 190.0,
    montoFaltante: 25.0,
    fecha: "2024-11-15",
    estado: 1,
    usuario_id: 1,
  },
  {
    montoPagado: 200.0,
    montoFaltante: 30.0,
    fecha: "2024-12-15",
    estado: 1,
    usuario_id: 1,
  },
];

export const createUsuario = async () => {
  try {
    for (const usuario of usuarios) {
      const result = await query("SELECT * FROM usuario WHERE dni = ?", [
        usuario.dni,
      ]);

      if (result.data.length === 0) {
        await _createUsuario(usuario);
      }
    }

    await createPago();
  } catch (error) {
    console.log("Error en createUsuario:", error);
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
      console.log("Error al crear pagos:", error);
    }
  }
};
