export interface ProductoDetalle {
  productoDetalle_id?: number;
  codigo?: string;
  talla: string;
  color: string;
  stock: number;

  producto_id: number;
  tienda_id: number;
}
