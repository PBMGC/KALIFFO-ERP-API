export interface Almacen {
  almacen_id?: number;
  nombre: string;
  direccion: string;
  estado: number;
  stock: number;
}

// {
//   "lote_id": 1,
//   "cantidad_recibida": 30, //back
//   "color_id": 1,
//   "talla": "38",
//   "estado": 1, //back
//   "precio_unidad": 10.2,
//   "lavanderia_asignada": "lavanderia 1",
//   "fecha_envio": "2024-10-01", //back
//   "fecha_recepcion": "2024-10-15" //back
// }
