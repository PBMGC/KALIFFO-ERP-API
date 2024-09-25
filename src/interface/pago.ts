export interface Pago {
  pago_id: number;
  montoPagado: number;
  montoFaltante: number;
  fecha: Date;
  estado: number;

  usuario_id: number;
}
