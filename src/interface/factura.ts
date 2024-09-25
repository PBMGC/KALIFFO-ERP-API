export interface Factura {
  factura_id: number;
  nroFactura: number;
  fechaEmision: Date;
  cliente: string;
  ruc: string;
  direccion: string;
  telefono: string;
  subTotal: number;
  igv: number;
  total: number;
  metodoPago: number;
}
