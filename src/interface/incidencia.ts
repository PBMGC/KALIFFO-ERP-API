export interface Incidencia {
  incidencia_id?: number;
  tipo: number;
  descripcion: string;
  fecha_creacion?: Date;
  usuario_id?: number;
}

// 1 => familiar
// 2 => salud
// 3 => personal
