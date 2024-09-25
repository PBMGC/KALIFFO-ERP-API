export interface DetalleFactura {
  detalleFactura_id: number;
  cantidad: number;
  precioUnitario: number;
  importe: number;

  factura_id: number;
  producto_id: number;
}
