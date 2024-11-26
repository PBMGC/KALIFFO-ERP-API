import { _createRol } from "../service/rol";
import { query } from "../util/query";

const roles: any = [
  {
    username: "administrador",
    password: "administrador",
    rol: "administrador",
  },
  { username: "venta", password: "venta", rol: "venta" },
  { username: "produccion", password: "produccion", rol: "produccion" },
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
