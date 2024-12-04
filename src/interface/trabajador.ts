export interface Trabajador {
  trabajador_id?: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  telefono: string;
  dni: string;
  contraseña: string;
  sueldo: number;
  tienda_id?: number | null;
  rol: number;
}
