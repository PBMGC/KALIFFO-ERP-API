export interface Usuario {
  usuario_id?: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  dni: string;
  contraseña: string;

  puesto_id?: number;
  tienda_id?: number;
}
