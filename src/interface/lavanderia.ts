export interface Lavanderia {
  lavanderia_id?: number;
  lote_id: number;
  cantidad_enviada: number;
  cantidad_recibida?: number | null;
  color: string;
  talla: string;
  estado: number;
  precio_unidad: number;
  lavanderia_asignada: string;
  fecha_envio?: string;
  fecha_recepcion?: string;
}
