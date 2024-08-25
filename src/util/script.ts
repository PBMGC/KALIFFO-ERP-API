import { createUsuario } from "../controller/usuario";
import { Rol as RolInterface } from "../interface/rol";
import { Tienda as TiendaInterface } from "../interface/tienda";
import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Rol } from "../models/rol";
import { Tienda } from "../models/tienda";
import { Usuario } from "../models/usuario";
import { _createRol } from "../service/rol";
import { _createTienda } from "../service/tienda";
import { _createUsuario } from "../service/usuario";

const roles: RolInterface[] = [
  { rol: "admin" },
  { rol: "vendedora" },
  { rol: "costurero" },
];

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
    fecha_nacimiento: "01-01-2000",
    dni: "73214567",
    telefono: "987654321",
    contraseña: "juan1234",
    rol_id: 1,
  },
  {
    nombre: "María",
    ap_paterno: "López",
    ap_materno: "Hernández",
    fecha_nacimiento: "22-07-1992",
    dni: "65478932",
    telefono: "912345678",
    contraseña: "maria2021",
    rol_id: 2,
    tienda_id: 2,
  },
  {
    nombre: "Carlos",
    ap_paterno: "Fernández",
    ap_materno: "Ramírez",
    fecha_nacimiento: "08-11-1978",
    dni: "87654321",
    telefono: "976543210",
    contraseña: "carlos78",
    rol_id: 2,
    tienda_id: 1,
  },
  {
    nombre: "Lucía",
    ap_paterno: "García",
    ap_materno: "Mendoza",
    fecha_nacimiento: "30-05-1995",
    dni: "78945612",
    telefono: "934567890",
    contraseña: "lucia95",
    rol_id: 2,
    tienda_id: 2,
  },
];

export const scriptInicio = async () => {
  for (const rol of roles) {
    const rolExistente = await Rol.findOne({ where: { rol: rol.rol } });
    if (!rolExistente) {
      await _createRol(rol);
    }
  }

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
};
