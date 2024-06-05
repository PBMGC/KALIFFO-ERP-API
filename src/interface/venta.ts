export interface Venta {
  codigo: string;
  metodoVenta: string;
  metodoPago: string;
  tipoVenta: string;
  ctdTotal: string;
  precioBruto: number;
  igv: number;
  precioTotal: number;
  fecha: Date;

  cliente_id: number;
}
