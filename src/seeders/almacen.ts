import { _createAlmacen_Productos } from "../service/almacen_productos";
import { query } from "../util/query";

const almacenes: any = [
  {
    almacen_id: 1,
    nombre_almacen: "almacen",
    direccion: "al costado del vecino",
    stockTotal: 0,
    estado: 1,
  },
];

export const createAlmacenes = async () => {
  for (const almacen of almacenes) {
    try {
      const result = await query(
        `select * from almacen_productos where almacen_id = ?`,
        [almacen.almacen_id]
      );

      if (result.data.length === 0) {
        await _createAlmacen_Productos({
          nombre_almacen: almacen.nombre_almacen,
          direccion: almacen.direccion,
        });
      }
    } catch (error) {
      console.log("error al crear almacenes");
    }
  }
};
