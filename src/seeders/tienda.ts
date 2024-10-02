import { _createTienda } from "../service/tienda";
import { query } from "../util/query";

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

export const createTienda = async () => {
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
