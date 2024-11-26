import { _createRol } from "../service/rol";
import { query } from "../util/query";

const roles: any = [
  {
    username: "administrador",
    password: "administrador",
    rol: "administrador",
    id_tipo:null
  },
  { username: "tienda 1", password: "venta", rol: "venta",id_tipo:"1"},
  { username: "produccion", password: "produccion", rol: "produccion",id_tipo:null},
];

export const createRoles = async () => {
  for (const rol of roles) {
    try {
      const result = await query(`select * from rol where rol = ?`, [
        rol.username,
      ]);

      if (result.data.length === 0) {
        await _createRol(rol);
      }
    } catch (error) {
      console.log("error al crear roles");
    }
  }
};
