export interface MovimientoMercaderia {
  movimiento_ID?: number;
  tienda_origen_id: number;
  tienda_destino_id: number;
  productoDetalle_id: number;
  talla: string;
  cantidad: number;
  fecha: string;
}
