import { _createColor } from "../service/color";
import { query } from "../util/query";

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
  { nombre: "Verde Menta", codigo: "98FF98" },
];

export const createColores = async () => {
  for (const color of colores) {
    try {
      const result = await query(`select * from color where nombre = ?`, [
        color.nombre,
      ]);

      if (result.data.length === 0) {
        await _createColor(color);
      }
    } catch (error) {
      console.log("error al crear colores");
    }
  }
};
