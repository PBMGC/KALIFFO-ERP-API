export interface Envios {
  envio_id?: number;
  pedido_id: number;
  fecha_envio: string;
  cantidad: number;
  estado: number;
  costo_envio?: number | null;
}
