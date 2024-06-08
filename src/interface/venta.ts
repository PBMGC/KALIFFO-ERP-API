export interface Venta {
  codigo_venta: string;
  metodoVenta: string;
  metodoPago: string;
  tipoVenta: string;
  ctdTotal: string;
  precioBruto: number;
  igv: number;
  precioTotal: number;
  fecha: Date;

  codigo_cliente: number;
}
