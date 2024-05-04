export interface Boleta {
  boleta_id: number;
  fecha: Date;
  precioBruto: number;
  igv: number;
  precioTotal: number;

  cliente_id: number;
}
