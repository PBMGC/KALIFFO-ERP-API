export interface Horario {
  horario_id?: number;
  hora_entrada: string;
  hora_salida?: string | null;
  fecha: string;
  trabajador_id: number;
}
