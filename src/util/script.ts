import sequelize from "../db/connection";
import { Tienda as TiendaInterface } from "../interface/tienda";
import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Horario } from "../models/horario";
import { Tienda } from "../models/tienda";
import { Usuario } from "../models/usuario";
import { _createTienda } from "../service/tienda";
import { _createUsuario } from "../service/usuario";

const tiendas: TiendaInterface[] = [
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

const usuarios: UsuarioInterface[] = [
  {
    nombre: "Juan",
    ap_paterno: "Pérez",
    ap_materno: "Gómez",
    fecha_nacimiento: "2000-01-01",
    dni: "73214567",
    telefono: "987654321",
    contraseña: "juan1234",
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
    rol: 2,
    tienda_id: 2,
  },
  {
    nombre: "Carlos",
    ap_paterno: "Fernández",
    ap_materno: "Ramírez",
    fecha_nacimiento: "1978-11-08",
    dni: "87654321",
    telefono: "976543210",
    contraseña: "carlos78",
    rol: 2,
    tienda_id: 1,
  },
  {
    nombre: "Lucía",
    ap_paterno: "García",
    ap_materno: "Mendoza",
    fecha_nacimiento: "1995-05-15",

    dni: "78945612",
    telefono: "934567890",
    contraseña: "lucia95",
    rol: 2,
    tienda_id: 2,
  },
];

export const scriptInicio = async () => {
  for (const tienda of tiendas) {
    const tiendaExistente = await Tienda.findOne({
      where: { tienda: tienda.tienda },
    });
    if (!tiendaExistente) {
      await _createTienda(tienda);
    }
  }

  for (const usuario of usuarios) {
    const usuarioExistente = await Usuario.findOne({
      where: { dni: usuario.dni },
    });
    if (!usuarioExistente) {
      await _createUsuario(usuario);
    }
  }

  if (!(await Horario.findOne({ where: { usuario_id: 1 } }))) {
    sequelize.query(`
      insert into horario(hora_entrada,hora_salida,fecha,usuario_id) values 
      ("9:00:00", "16:00:00","2024-08-20",1),
      ("9:00:00", "17:00:00","2024-08-19",1),
      ("9:00:00", "14:00:00","2024-08-18",1),
      ("9:00:00", "12:00:00","2024-08-14",1);`);
  }
};
