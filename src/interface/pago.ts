export interface Pago {
  pago_id?: number;
  montoPagado: number;
  montoFaltante: number;
  fecha: string;
  estado: number;
  usuario_id: number;
}
