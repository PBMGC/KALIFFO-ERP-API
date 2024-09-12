import sequelize from "../db/connection";
import { Producto as ProductoInterface } from "../interface/producto";
import { Tienda as TiendaInterface } from "../interface/tienda";
import { Usuario as UsuarioInterface } from "../interface/usuario";
import { Horario } from "../models/horario";
import { Producto } from "../models/producto";
import { Tienda } from "../models/tienda";
import { Usuario } from "../models/usuario";
import { _createProducto } from "../service/producto";
import { _createTienda } from "../service/tienda";
import { _createUsuario } from "../service/usuario";

const tiendas: TiendaInterface[] = [
  {
    tienda: "Almacen",
    direccion: "Av. Siempre Viva 123, Lima",
    telefono: "987654321",
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

const productos: any = [
  {
    nombre: "jean clásico",
    precio: 10.0,
    descuento: 15,
    detalles: [
      {
        codigo: "JEAN-001",
        talla: "M",
        color: "Rojo",
        stock: 6,
        tienda_id: 1,
      },
      {
        codigo: "JEAN-001",
        talla: "M",
        color: "Rojo",
        stock: 30,
        tienda_id: 2,
      },
      {
        codigo: "JEAN-002",
        talla: "L",
        color: "Rojo",
        stock: 4,
        tienda_id: 1,
      },
    ],
  },
  {
    nombre: "jean slim fit",
    precio: 12.0,
    descuento: 10,
    detalles: [
      {
        codigo: "JEAN-003",
        talla: "S",
        color: "Azul",
        stock: 20,
        tienda_id: 1,
      },
      {
        codigo: "JEAN-004",
        talla: "M",
        color: "Azul",
        stock: 15,
        tienda_id: 2,
      },
    ],
  },
  {
    nombre: "jean desgastado",
    precio: 14.0,
    descuento: 5,
    detalles: [
      {
        codigo: "JEAN-005",
        talla: "L",
        color: "Negro",
        stock: 10,
        tienda_id: 1,
      },
      {
        codigo: "JEAN-006",
        talla: "XL",
        color: "Negro",
        stock: 8,
        tienda_id: 2,
      },
    ],
  },
  {
    nombre: "jean recto",
    precio: 18.0,
    descuento: 12,
    detalles: [
      {
        codigo: "JEAN-007",
        talla: "M",
        color: "Gris",
        stock: 25,
        tienda_id: 1,
      },
      {
        codigo: "JEAN-008",
        talla: "L",
        color: "Gris",
        stock: 22,
        tienda_id: 2,
      },
    ],
  },
  {
    nombre: "jean de tiro alto",
    precio: 16.0,
    descuento: 8,
    detalles: [
      {
        codigo: "JEAN-009",
        talla: "M",
        color: "Azul claro",
        stock: 18,
        tienda_id: 1,
      },
      {
        codigo: "JEAN-010",
        talla: "S",
        color: "Azul claro",
        stock: 12,
        tienda_id: 2,
      },
    ],
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

  for (const producto of productos) {
    const productoExistente = await Producto.findOne({
      where: { nombre: producto.nombre },
    });
    if (!productoExistente) {
      const newProducto: ProductoInterface = {
        nombre: producto.nombre,
        precio: producto.precio,
        descuento: producto.descuento,
        stockGeneral: 0,
      };

      await _createProducto(newProducto, producto.detalles);
    }
  }
};
