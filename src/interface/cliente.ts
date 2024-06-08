export interface Cliente {
  codigo_cliente?: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  edad: string;
  telefono: string;
  email: string;
  estado: string;

  categoria_id: number;
}
