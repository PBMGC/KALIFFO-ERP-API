export interface Corte {
  corte_id?: number;
  lote_id: number;
  taller_id: number;
  producto_id: number;
  estado?: number;
  cantidad_enviada: number;
  cantidad_recibida?: number | null;
  talla: string;
  metraje_asignado: number;
  tipo_tela: string;
}
