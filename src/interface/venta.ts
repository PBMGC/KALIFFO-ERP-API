export interface Venta {
  venta_id?: number;
  codigo: string;
  estado: number;
  tipoVenta: number;
  tipoComprobante: number;
  fecha: string;
  totalBruto: number;
  totalIgv: number;
  totalNeto: number;
  tipoPago: number;
  dni?: string | null;
  ruc?: string | null;
  direccion: string;
  telefono: string;
  nombre: string;
  tienda_id: number;
}
