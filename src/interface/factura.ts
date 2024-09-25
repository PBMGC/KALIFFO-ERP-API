export interface Factura {
  factura_id: number;
  nroFactura: number;
  fechaEmision: Date;
  cliente: string;
  ruc: string;
  direccion: string;
  telefono: string;
  subtotal: number;
  igv: number;
  total: number;
  metodoPago: number;
}
