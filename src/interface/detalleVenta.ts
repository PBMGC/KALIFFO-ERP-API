export interface DetalleVenta {
  venta_id: number;
  productoDetalle_id: number;
  codigo: string;
  cantidad: number;
  precioUnitario: number;
  precioNeto: number;
  igv: number;
}
