export interface Usuario {
  usuario_id?: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  telefono: string;
  dni: string;
  contraseña: string;

  rol: number;
  tienda_id?: number;
}
