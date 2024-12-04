import { _createTrabajador } from "../service/trabajadores";
import { _createUsuario } from "../service/usuario";
import { query } from "../util/query";

const usuarios: any = [
  {
    username: "administrador",
    password: "administrador",
    rol: "administrador",
    id_tipo: null,
  },
  { username: "tienda 1", password: "venta", rol: "venta", id_tipo: "1" },
  {
    username: "produccion",
    password: "produccion",
    rol: "produccion",
    id_tipo: null,
  },
];

export const createUsuarios = async () => {
  for (const usuario of usuarios) {
    try {
      const result = await query(`select * from usuario where username = ?`, [
        usuario.username,
      ]);

      if (result.data.length === 0) {
        await _createUsuario(usuario);
      }
    } catch (error) {
      console.log("error al crear usuarios");
    }
  }
};
